import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name = '';
  email = '';
  phone = '';
  message = '';
  submitting = false;
  submitted = false;

  constructor(private api: ApiService) {}

  submitForm() {
    if (!this.name || !this.email || !this.message) return;
    this.submitting = true;

    this.api.sendMessage({
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.name = '';
        this.email = '';
        this.phone = '';
        this.message = '';
        setTimeout(() => this.submitted = false, 5000);
      },
      error: () => {
        this.submitting = false;
        alert('Failed to send message. Please try again.');
      }
    });
  }
}
