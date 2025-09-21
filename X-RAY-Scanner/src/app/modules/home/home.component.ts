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

  // Abrir/cerrar chat si lo necesitas en futuro
  isMinimized = false;

  toggleChat() {
    this.isMinimized = !this.isMinimized;
  }

  // Solo para limpiar input cuando presionas enviar
  sendMessage() {
    if (this.selectedFile) {
      this.analyzeService.analyze(this.selectedFile).subscribe({
        next: (res) => {
          console.log('✅ Respuesta del backend:', res);
          this.responseMessage = res.message;
        },
        error: (err) => {
          console.error('❌ Error enviando imagen:', err);
        }
      });

      // Limpieza de UI
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
        this.selectedFile = file;   // ✅ guarda el archivo real
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result as string; // preview base64
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