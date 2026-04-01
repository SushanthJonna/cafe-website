import { Component } from '@angular/core';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  cafeLatitude = 12.9716;
  cafeLongitude = 77.5946;

  getDirections() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${this.cafeLatitude},${this.cafeLongitude}&travelmode=driving`;
    window.open(url, '_blank');
  }
}
