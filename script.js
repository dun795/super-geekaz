// EmailJS Initialization
emailjs.init("hWoqjWtrA9ReGybO5"); // Replace with your actual User ID

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Handle Contact Form Submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate form inputs
        if (name === "" || email === "" || message === "") {
            alert("Please fill out all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Log the form values to the console for debugging
        console.log("Form Data:", { name, email, message });

        // Log before sending the email
        console.log("Sending email...");

        // Send email using EmailJS
        emailjs
            .send("service_199u7yr", "template_1kfpiwa", {
                name: name,
                email: email,
                message: message,
            })
            .then(
                function() {
                    // Log success
                    console.log("Email sent successfully!");
                    alert("Message sent successfully!");
                    contactForm.reset(); // Clear the form after successful submission
                },
                function(error) {
                    // Log error
                    console.error("Failed to send email:", error);
                    alert("Failed to send message. Error: " + error.text);
                }
            );
    });
}

// Validate Email Function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Blog Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Blog Category Filtering
    const categoryLinks = document.querySelectorAll('.category-list a');
    const blogCards = document.querySelectorAll('.blog-card');
    const blogGrid = document.getElementById('blogGrid');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all category links
            categoryLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter blog cards based on selected category
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Blog Pagination
    const paginationLinks = document.querySelectorAll('.blog-pagination a');
    let currentPage = 1;
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pageNum = this.getAttribute('data-page');
            
            // Remove active class from all pagination links
            paginationLinks.forEach(item => item.classList.remove('active'));
            
            // Handle "Next" button
            if (pageNum === 'next') {
                currentPage++;
                if (currentPage > 3) currentPage = 3;
                
                // Add active class to the current page link
                document.querySelector(`.blog-pagination a[data-page="${currentPage}"]`).classList.add('active');
            } else {
                // Add active class to clicked link
                this.classList.add('active');
                currentPage = parseInt(pageNum);
            }
            
            // Simulate page change (in a real app, you'd load different content)
            // This is just for demonstration purposes
            window.scrollTo({
                top: blogGrid.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value.trim();
            
            if (email === '') {
                alert('Please enter your email address.');
                return;
            }
            
            // Validate email format
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send this to your server or newsletter service
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Email validation function (reusing from script.js)
    function validateEmail(email) {
        const re = /^[^\s@]+@
