import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HoursEntry {
  day: string;
  time: string;
  isToday: boolean;
}

@Component({
  selector: 'app-hours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hours.component.html',
  styleUrl: './hours.component.css'
})
export class HoursComponent implements OnInit {
  hours: HoursEntry[] = [];

  ngOnInit() {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[new Date().getDay()];

    const data = [
      { day: 'Monday', time: '7:00 AM – 10:00 PM' },
      { day: 'Tuesday', time: '7:00 AM – 10:00 PM' },
      { day: 'Wednesday', time: '7:00 AM – 10:00 PM' },
      { day: 'Thursday', time: '7:00 AM – 10:00 PM' },
      { day: 'Friday', time: '7:00 AM – 11:00 PM' },
      { day: 'Saturday', time: '8:00 AM – 11:00 PM' },
      { day: 'Sunday', time: '8:00 AM – 10:00 PM' },
    ];

    this.hours = data.map(h => ({ ...h, isToday: h.day === todayName }));
  }
}
