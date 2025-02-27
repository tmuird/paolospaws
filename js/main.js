document.addEventListener('DOMContentLoaded', () => {
  // Set the current year in copyright
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu functionality
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      const expanded = mobileMenu.getAttribute('aria-expanded') === 'true';
      mobileMenu.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container')) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Hide header on scroll down, show on scroll up
  let lastScroll = 0;
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 50) {
        header.classList.remove('header-hidden');
        return;
      }
      
      if (currentScroll > lastScroll && !header.classList.contains('header-hidden')) {
        header.classList.add('header-hidden');
      } else if (currentScroll < lastScroll && header.classList.contains('header-hidden')) {
        header.classList.remove('header-hidden');
      }
      lastScroll = currentScroll;
    });
  }

  // Add animation delay to service cards
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Simple form validation
  const contactForms = document.querySelectorAll('form');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('invalid');
          
          // Create or update error message
          let errorMsg = field.parentNode.querySelector('.error-message');
          if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            field.parentNode.appendChild(errorMsg);
          }
          errorMsg.textContent = `${field.getAttribute('placeholder') || 'This field'} is required`;
        } else {
          field.classList.remove('invalid');
          const errorMsg = field.parentNode.querySelector('.error-message');
          if (errorMsg) errorMsg.remove();
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // Image lazy loading with Intersection Observer
  if ('IntersectionObserver' in window) {
    const imgOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px 100px 0px"
    };
    
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.onload = () => {
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            };
          }
          observer.unobserve(img);
        }
      });
    }, imgOptions);

    document.querySelectorAll('img[data-src]').forEach(img => {
      imgObserver.observe(img);
    });
  } else {
    // Fallback for browsers without Intersection Observer
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.getAttribute('data-src');
      img.onload = () => {
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      };
    });
  }

  // Ensure contact cards have consistent heights
  function equalizeContactCardHeight() {
    const contactCards = document.querySelectorAll('.contact-card');
    if (contactCards.length > 1) {
      // Reset heights first
      contactCards.forEach(card => {
        card.style.height = 'auto';
      });
      
      // Only equalize on larger screens
      if (window.innerWidth >= 768) {
        // Find the tallest card
        let maxHeight = 0;
        contactCards.forEach(card => {
          const height = card.offsetHeight;
          maxHeight = Math.max(maxHeight, height);
        });
        
        // Apply the height to all cards
        contactCards.forEach(card => {
          card.style.height = maxHeight + 'px';
        });
      }
    }
  }
  
  // Run on initial load and when window is resized
  equalizeContactCardHeight();
  window.addEventListener('resize', equalizeContactCardHeight);
  
  // Also run after any images load (which might change heights)
  window.addEventListener('load', equalizeContactCardHeight);
});
