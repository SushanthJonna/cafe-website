import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Message {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

export interface Review {
  id?: number;
  name: string;
  rating: number;
  text: string;
  role?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ---- Admin ----
  verifyAdmin(adminKey: string): Observable<any> {
    const headers = new HttpHeaders({ 'X-Admin-Key': adminKey });
    return this.http.post(`${this.baseUrl}/admin/verify`, {}, { headers });
  }

  // ---- Messages ----
  sendMessage(msg: Message): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/messages`, msg);
  }

  getMessages(adminKey: string): Observable<Message[]> {
    const headers = new HttpHeaders({ 'X-Admin-Key': adminKey });
    return this.http.get<Message[]>(`${this.baseUrl}/messages`, { headers });
  }

  deleteMessage(id: number, adminKey: string): Observable<any> {
    const headers = new HttpHeaders({ 'X-Admin-Key': adminKey });
    return this.http.delete(`${this.baseUrl}/messages/${id}`, { headers });
  }

  // ---- Reviews ----
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews`);
  }

  submitReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviews`, review);
  }

  deleteReview(id: number, adminKey: string): Observable<any> {
    const headers = new HttpHeaders({ 'X-Admin-Key': adminKey });
    return this.http.delete(`${this.baseUrl}/reviews/${id}`, { headers });
  }
}
