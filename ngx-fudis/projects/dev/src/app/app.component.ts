import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: false,
})
export class AppComponent {

  constructor(protected router: Router) {}

  routes: { id: string; label: string; path: string }[] = [
    { id: 'exercise', label: 'Exercise', path: '/exercise' },
    { id: 'sandbox', label: 'Sandbox', path: '/sandbox' },
  ];

  change(path: string) {
    this.router.navigate([path]);
  }
}
