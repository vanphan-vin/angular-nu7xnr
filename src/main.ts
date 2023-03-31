import 'zone.js/dist/zone';
import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div>{{ message() }}</div>

  <div>
    <input type="text" [ngModel]="name()" (ngModelChange)="name.set($event)" />
  </div>
  <div>
    <button (click)="name.set('World')">Hello World!</button>
    <button (click)="name.set('Angular')">Hello Angular!</button>
    <button (click)="name.set('Signals')">Hello Signals!</button>
  </div>  

  <div>
    Name Changes: {{ nameChangeCount() }}
  </div>
  `,
})
export class App {
  // `signal`: create a settable signal
  readonly name = signal('World');
  // `computed`: create a signal of computed value (readonly)
  readonly message = computed(() => {
    return `Hello ${this.name()}!`;
  });

  readonly nameChangeCount = signal(0);

  constructor() {
    // `effect`: register side-effects of signals
    effect(() => {
      this.name(); // mark here as a consumer of `name`
      this.nameChangeCount.update((count) => count + 1);
    });
  }
}

bootstrapApplication(App);
