document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Projects filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and add to clicked button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
        } else {
          if (card.getAttribute('data-category').includes(filterValue)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log it and show a success message
      console.log('Form Submission:', { name, email, message });
      
      // Reset form
      contactForm.reset();
      
      // Show success message (you could create a more sophisticated notification)
      alert('Thank you for your message! I will get back to you soon.');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation on scroll
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
  };
  
  // Initial check for elements in view
  animateOnScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
});

