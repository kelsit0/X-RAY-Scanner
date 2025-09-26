import { Component,  ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyzeService } from '../../../services/sendImage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private analyzeService: AnalyzeService) {}

  @ViewChild('messageInput') messageInput!: ElementRef;

  previewImage: string | null = null;
  selectedFile: File | null = null;
  responseMessage: string | null = null;
  showTitle: boolean = true;
  movedDown: boolean = false;
  offset: number = 200;

  messages: { type: 'sent' | 'received'; content: string; isImage?: boolean }[] = [];

  // Abrir/cerrar chat si lo necesitas en futuro
  isMinimized = false;

  toggleChat() {
    this.isMinimized = !this.isMinimized;
  }

  // Solo para limpiar input cuando presionas enviar
  keepHistory: boolean = true; // cambia a false si quieres limpiar cuando suba otra imagen

  sendMessage() {
    if (this.selectedFile) {
      // Limpia si no quieres historial
      if (!this.keepHistory) {
        this.messages = [];
      }

      // Agrega el mensaje de la imagen
      this.messages.push({
        type: 'sent',
        content: this.previewImage ?? '',
        isImage: true,
      });

      // Llamar backend
      this.analyzeService.analyze(this.selectedFile).subscribe({
        next: (res) => {
          this.messages.push({
            type: 'received',
            content: res.message,
          });
        },
        error: (err) => {
          this.messages.push({
            type: 'received',
            content: 'Error analizando la imagen',
          });
          console.error('Error enviando imagen:', err);
        }
      });

      // Reset UI
      this.previewImage = null;
      this.selectedFile = null;
      this.movedDown = true;
      this.showTitle = false;
    }

    this.messageInput.nativeElement.value = '';
  }
  // Manejo de archivos
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result as string;
          this.movedDown = false;
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage = null;
        this.selectedFile = null;
      }
    }
  }
}