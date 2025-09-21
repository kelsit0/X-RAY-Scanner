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
    if (this.previewImage) {
      console.log('Imagen enviada:', this.previewImage);
      this.previewImage = null; // limpia previsualización
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
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result as string; // guarda preview
          this.movedDown = false;
          
        };
        reader.readAsDataURL(file);
      } else {
        this.previewImage = null; // ignora si no es imagen
      }
    }
  }
}