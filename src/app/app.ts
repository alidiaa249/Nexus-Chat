import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './features/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthComponent],
  template: '<router-outlet />',
})
export class App {}
