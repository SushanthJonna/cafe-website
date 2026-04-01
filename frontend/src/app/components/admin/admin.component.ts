import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService, Message, Review } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  adminKey = '';
  authenticated = false;
  activeTab: 'messages' | 'reviews' = 'messages';

  messages: Message[] = [];
  reviews: Review[] = [];
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    const stored = sessionStorage.getItem('adminKey');
    if (stored) {
      this.adminKey = stored;
      this.authenticate();
    }
  }

  authenticate() {
    if (!this.adminKey) return;
    this.loading = true;

    // Fast verify — no DB query, returns in milliseconds
    this.api.verifyAdmin(this.adminKey).subscribe({
      next: () => {
        this.authenticated = true;
        this.loading = false;
        sessionStorage.setItem('adminKey', this.adminKey);

        // Load data in parallel AFTER dashboard is already visible
        this.loadAllData();
      },
      error: () => {
        this.authenticated = false;
        this.loading = false;
        alert('Invalid admin key. Please try again.');
      }
    });
  }

  logout() {
    this.authenticated = false;
    this.adminKey = '';
    sessionStorage.removeItem('adminKey');
  }

  loadAllData() {
    forkJoin({
      messages: this.api.getMessages(this.adminKey),
      reviews: this.api.getReviews()
    }).subscribe({
      next: (data) => {
        this.messages = data.messages;
        this.reviews = data.reviews;
      }
    });
  }

  loadMessages() {
    this.api.getMessages(this.adminKey).subscribe({
      next: (msgs) => this.messages = msgs
    });
  }

  loadReviews() {
    this.api.getReviews().subscribe({
      next: (revs) => this.reviews = revs
    });
  }

  deleteMessage(id: number) {
    if (!confirm('Delete this message?')) return;
    this.api.deleteMessage(id, this.adminKey).subscribe({
      next: () => this.loadMessages()
    });
  }

  deleteReview(id: number) {
    if (!confirm('Delete this review?')) return;
    this.api.deleteReview(id, this.adminKey).subscribe({
      next: () => this.loadReviews()
    });
  }

  switchTab(tab: 'messages' | 'reviews') {
    this.activeTab = tab;
    if (tab === 'messages') this.loadMessages();
    else this.loadReviews();
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString();
  }
}

