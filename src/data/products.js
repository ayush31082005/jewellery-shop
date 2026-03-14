// Unsplash jewellery images (royalty-free, no API key needed)
export const products = [
  {
    id: 1, name: 'Kundan Solitaire Ring', metal: '22K Gold · Diamond',
    price: 85000, oldPrice: 110000,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80',
    emoji: '💎', badge: 'New', category: 'rings', rating: 4.9, reviews: 128
  },
  {
    id: 2, name: 'Meenakari Necklace Set', metal: '24K Gold · Ruby',
    price: 142000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
    emoji: '📿', badge: 'Bestseller', category: 'necklaces', rating: 5.0, reviews: 84
  },
  {
    id: 3, name: 'Polki Drop Earrings', metal: '18K Gold · Polki',
    price: 38500, oldPrice: 48000,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80',
    emoji: '✨', badge: null, category: 'earrings', rating: 4.7, reviews: 63
  },
  {
    id: 4, name: 'Rajwada Bridal Choker', metal: '22K Gold · Emerald',
    price: 220000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80',
    emoji: '👑', badge: 'Limited', category: 'bridal', rating: 5.0, reviews: 41
  },
  {
    id: 5, name: 'Diamond Tennis Bracelet', metal: '18K White Gold · Diamond',
    price: 95000, oldPrice: 120000,
    image: '/dimand.png',
    emoji: '💠', badge: 'Sale', category: 'bracelets', rating: 4.8, reviews: 97
  },
  {
    id: 6, name: 'Chandni Pearl Kada Set', metal: '22K Gold · Pearl',
    price: 67500, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
    emoji: '🌙', badge: 'New', category: 'bangles', rating: 4.6, reviews: 55
  },
  {
    id: 7, name: 'Classic Jhumka Earrings', metal: '22K Gold',
    price: 24000, oldPrice: 30000,
    image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400&q=80',
    emoji: '🔮', badge: null, category: 'earrings', rating: 4.9, reviews: 212
  },
  {
    id: 8, name: 'Rose Gold Mangalsutra', metal: '18K Rose Gold · Diamond',
    price: 58000, oldPrice: null,
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80',
    emoji: '💛', badge: 'Trending', category: 'necklaces', rating: 4.8, reviews: 76
  },
]

export const heroSlides = [
  {
    id: 1,
    tag: 'New Bridal Collection 2025',
    title: ['Jewellery That', 'Stays in Your'],
    italic: 'Heart Forever',
    sub: 'Handcrafted from pure 22K gold and certified diamonds — designed to mark life\'s most precious moments with timeless elegance.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    accent: '#D4AF37',
  },
  {
    id: 2,
    tag: 'Exclusive Bridal Sets',
    title: ['Where Tradition', 'Meets Modern'],
    italic: 'Elegance',
    sub: 'Exquisite bridal jewellery sets crafted for the most important day of your life. Each piece tells your love story.',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
    accent: '#D4AF37',
  },
  {
    id: 3,
    tag: 'Diamond Collection',
    title: ['Certified Diamonds,', 'Certified'],
    italic: 'Forever',
    sub: 'Every diamond is GIA certified, hand-selected for its brilliance and fire. Wear confidence, wear Swarna.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    accent: '#D4AF37',
  },
]

export const categories = [
  { id: 'rings', name: 'Engagement Rings', count: 284, emoji: '💍', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80' },
  { id: 'necklaces', name: 'Necklace Sets', count: 196, emoji: '📿', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80' },
  { id: 'earrings', name: 'Earrings', count: 342, emoji: '✨', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80' },
  { id: 'bangles', name: 'Bangles & Kadas', count: 158, emoji: '💛', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80' },
  { id: 'pendants', name: 'Pendants', count: 224, emoji: '🔮', image: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80' },
]

export const testimonials = [
  { id: 1, text: 'I came for an engagement ring and what I received was beyond my dreams. Exceptional craftsmanship and meticulous attention to detail.', author: 'Priya Sharma', city: 'New Delhi', rating: 5 },
  { id: 2, text: 'I ordered the complete bridal set for my wedding. Both the quality and the service were truly exceptional — a memory for a lifetime.', author: 'Anjali Verma', city: 'Mumbai', rating: 5 },
  { id: 3, text: 'Wanted to surprise my wife on our anniversary. Got a custom design done — she absolutely loved it! Would recommend 100%.', author: 'Vikram Singh', city: 'Jaipur', rating: 5 },
]
