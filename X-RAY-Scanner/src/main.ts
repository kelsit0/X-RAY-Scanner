import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';  // 👈 importa esto

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()   // 👈 agrega esto
  ],
}).catch((err) => console.error(err));
