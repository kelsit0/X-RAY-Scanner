import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  errorMessage = signal('');
  isLoading = signal(false);

  // Credenciales hardcodeadas para testing
  private readonly VALID_CREDENTIALS = {
    username: 'admin',
    password: '123456'
  };

  constructor(private router: Router) {}

  async onSubmit() {
    // Limpiar mensaje de error previo
    this.errorMessage.set('');

    // Validar campos vacíos
    if (!this.username().trim() || !this.password().trim()) {
      this.errorMessage.set('Please fill in all fields');
      return;
    }

    // Mostrar estado de carga
    this.isLoading.set(true);

    try {
      // Simular delay de autenticación (opcional)
      await this.simulateAuthDelay();

      // Verificar credenciales
      if (this.username().trim() === this.VALID_CREDENTIALS.username &&
          this.password() === this.VALID_CREDENTIALS.password) {

        // Login exitoso
        this.errorMessage.set('');

        // Navegar a home
        await this.router.navigate(['/inicio']);

        console.log('Login successful - navigating to home');

      } else {
        // Credenciales inválidas
        this.errorMessage.set('Invalid username or password');
      }

    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage.set('An error occurred during login');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Simular delay de autenticación para mejor UX
  private simulateAuthDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  // Limpiar error cuando el usuario empiece a escribir
  onInputChange() {
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }
}
