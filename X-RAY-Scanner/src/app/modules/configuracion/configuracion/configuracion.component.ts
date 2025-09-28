import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubComponent } from '../../../Shared/hub/hub.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [HubComponent, CommonModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear(); // limpiar sesión
    this.router.navigate(['/login']);
  }
}
