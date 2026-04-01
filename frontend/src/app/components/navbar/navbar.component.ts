import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  mobileOpen = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.onScroll();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.isBrowser) {
      this.scrolled = window.scrollY > 60;
    }
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
    if (this.isBrowser) {
      document.body.style.overflow = this.mobileOpen ? 'hidden' : '';
    }
  }

  closeMobile() {
    this.mobileOpen = false;
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  scrollTo(id: string) {
    this.closeMobile();
    if (this.isBrowser) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
