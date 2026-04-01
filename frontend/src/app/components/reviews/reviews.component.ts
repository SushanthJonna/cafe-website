import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Review } from '../../services/api.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  showForm = false;
  submitting = false;
  submitted = false;

  newReview: Review = {
    name: '',
    rating: 5,
    text: '',
    role: 'Guest'
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.api.getReviews().subscribe({
      next: (data) => this.reviews = data,
      error: () => {
        // If backend is not running, show empty state
        this.reviews = [];
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.submitted = false;
  }

  submitReview() {
    if (!this.newReview.name || !this.newReview.text) return;
    this.submitting = true;
    this.api.submitReview(this.newReview).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.newReview = { name: '', rating: 5, text: '', role: 'Guest' };
        this.loadReviews();
        setTimeout(() => {
          this.showForm = false;
          this.submitted = false;
        }, 3000);
      },
      error: () => {
        this.submitting = false;
        alert('Failed to submit review. Please try again.');
      }
    });
  }

  setRating(star: number) {
    this.newReview.rating = star;
  }
}
