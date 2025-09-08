import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="padding: 2rem; text-align: center;">
      <h1>Welcome to Home!</h1>
      <p>Login successful!</p>
    </div>
  `
})
export class HomeComponent {

}
