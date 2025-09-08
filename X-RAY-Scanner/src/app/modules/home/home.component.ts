import { Component,  ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // lo que el usuario escribe
   @ViewChild('messageInput') messageInput!: ElementRef;
  
  isMinimized = false;
  
  toggleChat() {
    this.isMinimized = !this.isMinimized;
  }
  
  sendMessage() {
    const message = this.messageInput.nativeElement.value.trim();
    if (message) {
      // Aquí iría la lógica para enviar el mensaje
      console.log('Mensaje enviado:', message);
      this.messageInput.nativeElement.value = '';
    }
  }
}