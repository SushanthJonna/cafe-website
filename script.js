// ============================================================
//  THE BREW HAVEN — Main JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 800);
  });
  // Fallback hide
  setTimeout(() => preloader.classList.add('hidden'), 3000);

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 60);
    backToTop.classList.toggle('visible', scrollY > 500);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Back to top ----
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Mobile nav ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileNav);
  navOverlay.addEventListener('click', toggleMobileNav);

  // Close on link click
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleMobileNav();
    });
  });

  // ---- Active nav highlight ----
  const sections = document.querySelectorAll('section[id]');
  function highlightNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`[data-nav][href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Scroll reveal animations ----
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // ============================================================
  //  MENU DATA & RENDERING
  // ============================================================
  const menuItems = [
    // Coffee
    { name: 'Classic Espresso', desc: 'Rich, bold single-origin shot pulled to perfection.', price: '₹149', category: 'coffee', emoji: '☕' },
    { name: 'Caramel Macchiato', desc: 'Velvety steamed milk, vanilla, espresso & caramel drizzle.', price: '₹249', category: 'coffee', emoji: '☕' },
    { name: 'Hazelnut Latte', desc: 'Smooth espresso blended with hazelnut syrup & frothy milk.', price: '₹229', category: 'coffee', emoji: '☕' },
    { name: 'Cold Brew', desc: 'Slow-steeped for 18 hours. Smooth, refreshing & bold.', price: '₹199', category: 'coffee', emoji: '🧊' },
    { name: 'Mocha Frappé', desc: 'Iced chocolate-coffee blend topped with whipped cream.', price: '₹269', category: 'coffee', emoji: '🍫' },
    { name: 'Flat White', desc: 'Double ristretto with silky microfoam milk.', price: '₹209', category: 'coffee', emoji: '☕' },

    // Tea
    { name: 'Masala Chai', desc: 'Traditional Indian spiced tea with ginger & cardamom.', price: '₹99', category: 'tea', emoji: '🍵' },
    { name: 'Matcha Latte', desc: 'Ceremonial-grade matcha whisked with oat milk.', price: '₹249', category: 'tea', emoji: '🍵' },
    { name: 'Chamomile Bliss', desc: 'Calming herbal infusion with honey & lemon.', price: '₹149', category: 'tea', emoji: '🌼' },
    { name: 'Iced Peach Tea', desc: 'Refreshing peach-infused black tea over ice.', price: '₹179', category: 'tea', emoji: '🍑' },

    // Snacks
    { name: 'Avocado Toast', desc: 'Smashed avocado on sourdough with cherry tomatoes & microgreens.', price: '₹299', category: 'snacks', emoji: '🥑' },
    { name: 'Grilled Panini', desc: 'Mozzarella, pesto, sundried tomatoes on ciabatta bread.', price: '₹279', category: 'snacks', emoji: '🥪' },
    { name: 'Loaded Nachos', desc: 'Crunchy tortilla chips with cheese, salsa, guacamole & jalapeños.', price: '₹249', category: 'snacks', emoji: '🌮' },
    { name: 'Bruschetta', desc: 'Toasted baguette slices with fresh tomato, basil & balsamic.', price: '₹219', category: 'snacks', emoji: '🍞' },

    // Desserts
    { name: 'Tiramisu', desc: 'Classic Italian layers of mascarpone, espresso & cocoa.', price: '₹329', category: 'desserts', emoji: '🍰' },
    { name: 'Chocolate Lava Cake', desc: 'Warm, gooey center served with vanilla bean ice cream.', price: '₹349', category: 'desserts', emoji: '🍫' },
    { name: 'New York Cheesecake', desc: 'Creamy baked cheesecake with berry compote.', price: '₹299', category: 'desserts', emoji: '🍰' },
    { name: 'Crème Brûlée', desc: 'Vanilla custard with a crisp caramelized sugar crust.', price: '₹279', category: 'desserts', emoji: '🍮' },

    // Brunch
    { name: 'Eggs Benedict', desc: 'Poached eggs, smoked salmon, hollandaise on English muffins.', price: '₹399', category: 'brunch', emoji: '🍳' },
    { name: 'Belgian Waffles', desc: 'Fluffy waffles with maple syrup, berries & whipped cream.', price: '₹329', category: 'brunch', emoji: '🧇' },
    { name: 'Shakshuka', desc: 'Poached eggs in spiced tomato-pepper sauce with crusty bread.', price: '₹299', category: 'brunch', emoji: '🍳' },
    { name: 'Açaí Bowl', desc: 'Blended açaí topped with granola, banana, berries & honey.', price: '₹349', category: 'brunch', emoji: '🍇' },
  ];

  const menuGrid = document.getElementById('menuGrid');

  function renderMenu(filter = 'all') {
    const items = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
    menuGrid.innerHTML = items.map((item, idx) => `
      <div class="menu-card reveal" style="transition-delay: ${idx * 40}ms">
        <div class="menu-card-icon">${item.emoji}</div>
        <div class="menu-card-info">
          <div class="menu-item-header">
            <h4>${item.name}</h4>
            <span class="price">${item.price}</span>
          </div>
          <p>${item.desc}</p>
          <span class="menu-tag">${item.category}</span>
        </div>
      </div>
    `).join('');

    // Re-observe new elements
    menuGrid.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }

  renderMenu();

  // Filter buttons
  document.querySelectorAll('.menu-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.filter);
    });
  });

  // ============================================================
  //  OPENING HOURS
  // ============================================================
  const hoursData = [
    { day: 'Monday', time: '7:00 AM – 10:00 PM' },
    { day: 'Tuesday', time: '7:00 AM – 10:00 PM' },
    { day: 'Wednesday', time: '7:00 AM – 10:00 PM' },
    { day: 'Thursday', time: '7:00 AM – 10:00 PM' },
    { day: 'Friday', time: '7:00 AM – 11:00 PM' },
    { day: 'Saturday', time: '8:00 AM – 11:00 PM' },
    { day: 'Sunday', time: '8:00 AM – 10:00 PM' },
  ];

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[new Date().getDay()];

  const hoursList = document.getElementById('hoursList');
  hoursList.innerHTML = hoursData.map(h => `
    <div class="hours-row ${h.day === todayName ? 'today' : ''}">
      <span class="day">${h.day}</span>
      <span class="time">${h.time}</span>
    </div>
  `).join('');

  // ============================================================
  //  REVIEWS DATA & RENDERING
  // ============================================================
  const reviews = [
    {
      name: 'Ananya Sharma',
      initials: 'AS',
      rating: 5,
      text: "The Brew Haven is my happy place! The caramel macchiato is absolutely divine, and the cozy ambiance makes it perfect for working or catching up with friends. Highly recommend the tiramisu too!",
      role: 'Regular since 2020'
    },
    {
      name: 'Rahul Menon',
      initials: 'RM',
      rating: 5,
      text: "Best cold brew in Bengaluru, hands down. The staff is incredibly friendly and they remember your order. The avocado toast is a must-try — fresh ingredients and generous portions.",
      role: 'Coffee enthusiast'
    },
    {
      name: 'Priya Nair',
      initials: 'PN',
      rating: 5,
      text: "We hosted our book club meeting here and it was perfect. The loft area is so charming, the chocolate lava cake was heavenly, and the service was impeccable. We'll definitely be back!",
      role: 'Book Club Host'
    },
    {
      name: 'Vikram Patel',
      initials: 'VP',
      rating: 4,
      text: "A gem of a café! The matcha latte is beautifully made and the Belgian waffles for brunch are incredible. Love the eco-friendly cups and sustainable approach. Great place to unwind.",
      role: 'Weekend regular'
    },
    {
      name: 'Deepa Krishnan',
      initials: 'DK',
      rating: 5,
      text: "From the moment you walk in, you feel at home. The aroma of freshly ground coffee, warm lights, and friendly baristas make every visit special. Their Eggs Benedict is restaurant quality!",
      role: 'Food blogger'
    },
    {
      name: 'Arjun Reddy',
      initials: 'AR',
      rating: 5,
      text: "I come here almost every morning before work. The espresso is consistently excellent and the masala chai is authentic and flavorful. The early bird discount is a lovely touch. Five stars!",
      role: 'Daily visitor'
    },
  ];

  const reviewsGrid = document.getElementById('reviewsGrid');
  reviewsGrid.innerHTML = reviews.slice(0, 3).map((r, idx) => `
    <div class="review-card reveal" style="transition-delay: ${idx * 120}ms">
      <div class="quote-icon">"</div>
      <div class="review-stars">
        ${'<i data-lucide="star" style="width:16px;height:16px;fill:var(--clr-gold);stroke:var(--clr-gold);"></i>'.repeat(r.rating)}
        ${'<i data-lucide="star" style="width:16px;height:16px;stroke:var(--clr-latte);"></i>'.repeat(5 - r.rating)}
      </div>
      <p class="review-text">${r.text}</p>
      <div class="review-author">
        <div class="review-avatar">${r.initials}</div>
        <div class="review-author-info">
          <h5>${r.name}</h5>
          <span>${r.role}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Re-init Lucide to pick up dynamically added icons
  if (window.lucide) lucide.createIcons();

  // Re-observe newly added reveal elements
  document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)').forEach(el => {
    observer.observe(el);
  });

  // ============================================================
  //  CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) return;

    // Simulate sending
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formMessage.classList.add('success');
      contactForm.reset();
      submitBtn.innerHTML = '<i data-lucide="send"></i> Send Message';
      submitBtn.disabled = false;
      if (window.lucide) lucide.createIcons();

      setTimeout(() => formMessage.classList.remove('success'), 5000);
    }, 1200);
  });

  // ============================================================
  //  SMOOTH ANCHOR SCROLLING (fallback)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
