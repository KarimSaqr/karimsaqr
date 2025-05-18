// Import Firebase functionality
import { app, analytics, db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';

document.addEventListener('DOMContentLoaded', function() {
  // Track page view with Firebase Analytics
  logEvent(analytics, 'page_view');

  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    logEvent(analytics, 'menu_toggle');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      // Track which navigation item was clicked
      logEvent(analytics, 'nav_click', {
        item_id: link.getAttribute('href').substring(1)
      });
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
      
      // Track which filter was applied
      logEvent(analytics, 'filter_projects', {
        filter: filterValue
      });

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

  // Track project clicks
  const projectLearnMore = document.querySelectorAll('.learn-more');
  projectLearnMore.forEach(link => {
    link.addEventListener('click', (e) => {
      const projectTitle = e.target.closest('.project-info').querySelector('h3').textContent;
      logEvent(analytics, 'project_click', {
        project_title: projectTitle
      });
    });
  });

  // Contact form submission with Firebase Firestore
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Show loading status
      formStatus.innerHTML = '<p class="loading">Sending message...</p>';
      formStatus.style.display = 'block';
      
      try {
        // Add message to Firestore
        await addDoc(collection(db, "messages"), {
          name: name,
          email: email,
          message: message,
          timestamp: serverTimestamp()
        });
        
        // Track successful form submission
        logEvent(analytics, 'form_submission', {
          form_name: 'contact'
        });
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        formStatus.innerHTML = '<p class="success">Thank you for your message! I will get back to you soon.</p>';
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
        
      } catch (error) {
        console.error("Error submitting form: ", error);
        
        // Track form error
        logEvent(analytics, 'form_error', {
          form_name: 'contact',
          error_message: error.message
        });
        
        // Show error message
        formStatus.innerHTML = '<p class="error">Something went wrong. Please try again later.</p>';
      }
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
        
        // Track section visibility
        if (!section.hasAttribute('data-viewed')) {
          logEvent(analytics, 'section_view', {
            section_id: section.id
          });
          section.setAttribute('data-viewed', 'true');
        }
      }
    });
  };
  
  // Initial check for elements in view
  animateOnScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
});
