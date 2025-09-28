import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HubComponent } from '../../../Shared/hub/hub.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HubComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
