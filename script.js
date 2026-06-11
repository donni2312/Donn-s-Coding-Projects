// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
navLinks.classList.toggle('active');

// Animate hamburger
const spans = hamburger.querySelectorAll('span');
spans[0].style.transform = navLinks.classList.contains('active')
? 'rotate(45deg) translateY(10px)'
: 'none';
spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
spans[2].style.transform = navLinks.classList.contains('active')
? 'rotate(-45deg) translateY(-10px)'
: 'none';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
link.addEventListener('click', () => {
navLinks.classList.remove('active');
const spans = hamburger.querySelectorAll('span');
spans[0].style.transform = 'none';
spans[1].style.opacity = '1';
spans[2].style.transform = 'none';
});
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
const offsetTop = target.offsetTop - 80; // Account for fixed navbar
window.scrollTo({
top: offsetTop,
behavior: 'smooth'
});
}
});
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
const currentScroll = window.pageYOffset;

if (currentScroll > 100) {
navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
} else {
navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
}

lastScroll = currentScroll;
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
const scrollY = window.pageYOffset;

sections.forEach(section => {
const sectionHeight = section.offsetHeight;
const sectionTop = section.offsetTop - 100;
const sectionId = section.getAttribute('id');
const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
navLink.classList.add('active');
navLink.style.color = 'var(--primary-color)';
} else {
navLink.classList.remove('active');
navLink.style.color = 'var(--text-dark)';
}
});
}

window.addEventListener('scroll', highlightNavLink);

// ===== Intersection Observer for Animations =====
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
}
});
}, observerOptions);

// Apply animation to elements
document.querySelectorAll('.skill-category, .project-card, .stat-card, .achievement-card, .about-text, .contact-info, .contact-form').forEach(el => {
el.style.opacity = '0';
el.style.transform = 'translateY(30px)';
el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
observer.observe(el);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
e.preventDefault();

// Get form values
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const message = document.getElementById('message').value;

// Simple validation
if (!name || !email || !message) {
showNotification('Please fill in all fields', 'error');
return;
}

if (!isValidEmail(email)) {
showNotification('Please enter a valid email address', 'error');
return;
}

// Simulate form submission (replace with actual backend integration)
console.log('Form submitted:', { name, email, message });

// Show success message
showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');

// Reset form
contactForm.reset();
});

// Email validation helper
function isValidEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
// Remove existing notification
const existingNotification = document.querySelector('.notification');
if (existingNotification) {
existingNotification.remove();
}

// Create notification element
const notification = document.createElement('div');
notification.className = `notification notification-${type}`;
notification.textContent = message;

// Style the notification
notification.style.cssText = `
position: fixed;
top: 100px;
right: 20px;
padding: 1rem 2rem;
border-radius: 8px;
color: white;
font-weight: 600;
z-index: 10000;
animation: slideIn 0.3s ease;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

if (type === 'success') {
notification.style.background = '#10b981';
} else {
notification.style.background = '#ef4444';
}

document.body.appendChild(notification);

// Remove after 5 seconds
setTimeout(() => {
notification.style.animation = 'slideOut 0.3s ease';
setTimeout(() => notification.remove(), 300);
}, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
from {
transform: translateX(100%);
opacity: 0;
}
to {
transform: translateX(0);
opacity: 1;
}
}

@keyframes slideOut {
from {
transform: translateX(0);
opacity: 1;
}
to {
transform: translateX(100%);
opacity: 0;
}
}
`;
document.head.appendChild(style);

// ===== Typing Effect for Hero Section (Optional Enhancement) =====
const taglineElement = document.querySelector('.tagline');
const taglines = [
'Passionate about Web Development, AI & Cloud Technologies',
'Building Robust, Scalable Solutions',
'Innovating for Real-World Impact'
];

let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeTagline() {
const currentTagline = taglines[taglineIndex];

if (isDeleting) {
taglineElement.textContent = currentTagline.substring(0, charIndex - 1);
charIndex--;
typingSpeed = 50;
} else {
taglineElement.textContent = currentTagline.substring(0, charIndex + 1);
charIndex++;
typingSpeed = 100;
}

if (!isDeleting && charIndex === currentTagline.length) {
isDeleting = true;
typingSpeed = 2000; // Pause at end
} else if (isDeleting && charIndex === 0) {
isDeleting = false;
taglineIndex = (taglineIndex + 1) % taglines.length;
typingSpeed = 500; // Pause before typing next
}

setTimeout(typeTagline, typingSpeed);
}

// Uncomment to enable typing effect
// typeTagline();

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
position: fixed;
bottom: 30px;
right: 30px;
width: 50px;
height: 50px;
border-radius: 50%;
background: var(--primary-color);
color: white;
border: none;
font-size: 1.2rem;
cursor: pointer;
opacity: 0;
visibility: hidden;
transition: all 0.3s ease;
z-index: 999;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
if (window.pageYOffset > 300) {
scrollToTopBtn.style.opacity = '1';
scrollToTopBtn.style.visibility = 'visible';
} else {
scrollToTopBtn.style.opacity = '0';
scrollToTopBtn.style.visibility = 'hidden';
}
});

scrollToTopBtn.addEventListener('click', () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});

// Add hover effect
scrollToTopBtn.addEventListener('mouseenter', () => {
scrollToTopBtn.style.transform = 'translateY(-3px)';
scrollToTopBtn.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
scrollToTopBtn.style.transform = 'translateY(0)';
scrollToTopBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
});

// ===== Dynamic Year in Footer =====
const yearElement = document.querySelector('.footer-content p');
if (yearElement) {
const currentYear = new Date().getFullYear();
yearElement.textContent = `© ${currentYear} Donnelly Anesu. All rights reserved.`;
}

// ===== Project Filter (Optional Enhancement) =====
// You can add project filtering functionality here if you have multiple projects

console.log('Portfolio loaded successfully! 🚀');