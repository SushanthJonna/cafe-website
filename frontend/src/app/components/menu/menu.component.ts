import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  category: string;
  emoji: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  activeFilter = 'all';
  categories = ['all', 'coffee', 'tea', 'snacks', 'desserts', 'brunch'];

  menuItems: MenuItem[] = [
    { name: 'Classic Espresso', desc: 'Rich, bold single-origin shot pulled to perfection.', price: '₹149', category: 'coffee', emoji: '☕' },
    { name: 'Caramel Macchiato', desc: 'Velvety steamed milk, vanilla, espresso & caramel drizzle.', price: '₹249', category: 'coffee', emoji: '☕' },
    { name: 'Hazelnut Latte', desc: 'Smooth espresso blended with hazelnut syrup & frothy milk.', price: '₹229', category: 'coffee', emoji: '☕' },
    { name: 'Cold Brew', desc: 'Slow-steeped for 18 hours. Smooth, refreshing & bold.', price: '₹199', category: 'coffee', emoji: '🧊' },
    { name: 'Mocha Frappé', desc: 'Iced chocolate-coffee blend topped with whipped cream.', price: '₹269', category: 'coffee', emoji: '🍫' },
    { name: 'Flat White', desc: 'Double ristretto with silky microfoam milk.', price: '₹209', category: 'coffee', emoji: '☕' },
    { name: 'Masala Chai', desc: 'Traditional Indian spiced tea with ginger & cardamom.', price: '₹99', category: 'tea', emoji: '🍵' },
    { name: 'Matcha Latte', desc: 'Ceremonial-grade matcha whisked with oat milk.', price: '₹249', category: 'tea', emoji: '🍵' },
    { name: 'Chamomile Bliss', desc: 'Calming herbal infusion with honey & lemon.', price: '₹149', category: 'tea', emoji: '🌼' },
    { name: 'Iced Peach Tea', desc: 'Refreshing peach-infused black tea over ice.', price: '₹179', category: 'tea', emoji: '🍑' },
    { name: 'Avocado Toast', desc: 'Smashed avocado on sourdough with cherry tomatoes & microgreens.', price: '₹299', category: 'snacks', emoji: '🥑' },
    { name: 'Grilled Panini', desc: 'Mozzarella, pesto, sundried tomatoes on ciabatta bread.', price: '₹279', category: 'snacks', emoji: '🥪' },
    { name: 'Loaded Nachos', desc: 'Crunchy tortilla chips with cheese, salsa, guacamole & jalapeños.', price: '₹249', category: 'snacks', emoji: '🌮' },
    { name: 'Bruschetta', desc: 'Toasted baguette slices with fresh tomato, basil & balsamic.', price: '₹219', category: 'snacks', emoji: '🍞' },
    { name: 'Tiramisu', desc: 'Classic Italian layers of mascarpone, espresso & cocoa.', price: '₹329', category: 'desserts', emoji: '🍰' },
    { name: 'Chocolate Lava Cake', desc: 'Warm, gooey center served with vanilla bean ice cream.', price: '₹349', category: 'desserts', emoji: '🍫' },
    { name: 'New York Cheesecake', desc: 'Creamy baked cheesecake with berry compote.', price: '₹299', category: 'desserts', emoji: '🍰' },
    { name: 'Crème Brûlée', desc: 'Vanilla custard with a crisp caramelized sugar crust.', price: '₹279', category: 'desserts', emoji: '🍮' },
    { name: 'Eggs Benedict', desc: 'Poached eggs, smoked salmon, hollandaise on English muffins.', price: '₹399', category: 'brunch', emoji: '🍳' },
    { name: 'Belgian Waffles', desc: 'Fluffy waffles with maple syrup, berries & whipped cream.', price: '₹329', category: 'brunch', emoji: '🧇' },
    { name: 'Shakshuka', desc: 'Poached eggs in spiced tomato-pepper sauce with crusty bread.', price: '₹299', category: 'brunch', emoji: '🍳' },
    { name: 'Açaí Bowl', desc: 'Blended açaí topped with granola, banana, berries & honey.', price: '₹349', category: 'brunch', emoji: '🍇' },
  ];

  get filteredItems(): MenuItem[] {
    if (this.activeFilter === 'all') return this.menuItems;
    return this.menuItems.filter(i => i.category === this.activeFilter);
  }

  setFilter(cat: string) {
    this.activeFilter = cat;
  }
}
