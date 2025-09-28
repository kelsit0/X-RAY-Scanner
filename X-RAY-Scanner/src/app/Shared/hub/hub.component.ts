import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss'
})
export class HubComponent {

  constructor(private router: Router) {}
  public navigationClicks$ = new Subject<string>();

  navegar(ruta: string) {
    this.navigationClicks$.next(ruta);
  }
}
