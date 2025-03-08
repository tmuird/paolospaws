document.addEventListener('DOMContentLoaded', () => {
  // Add subtle animations to all cards
  const cards = document.querySelectorAll('.service-card, .team-member, .testimonial-card, .contact-card, .location-card');
  
  // Staggered animation on scroll
  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a staggered delay based on the index
          setTimeout(() => {
            entry.target.classList.add('appear');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, appearOptions);
    
    cards.forEach(card => {
      card.classList.add('hidden');
      appearOnScroll.observe(card);
    });
  } else {
    // Fallback for browsers without Intersection Observer
    cards.forEach(card => {
      card.classList.add('appear');
    });
  }
  
  // Animate service icons on hover
  document.querySelectorAll('.service-card i').forEach(icon => {
    icon.addEventListener('mouseover', () => {
      icon.classList.add('pulse');
    });
    
    icon.addEventListener('animationend', () => {
      icon.classList.remove('pulse');
    });
  });
  
  // Add parallax effect to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
  }
  
  // Add decorative elements that appear on scroll
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    // Create decorative element
    const decorator = document.createElement('div');
    decorator.classList.add('section-decorator');
    section.appendChild(decorator);
  });
  
  // Add subtle animations to testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const quote = card.querySelector('.quote');
      if (quote) {
        quote.style.transform = 'translateY(-5px)';
        quote.style.transition = 'transform 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const quote = card.querySelector('.quote');
      if (quote) {
        quote.style.transform = 'translateY(0)';
      }
    });
  });
});
