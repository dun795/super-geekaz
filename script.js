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


        // Modal functionality
const modal = document.createElement('div');
modal.id = 'contactModal';
modal.className = 'modal';

// Insert modal HTML
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Contact Us</h2>
        <p>Fill out the form below and we'll get back to you as soon as possible.</p>
        <form id="popupContactForm">
            <div class="form-row">
                <div class="form-group">
                    <label for="firstName">First Name*</label>
                    <input type="text" id="firstName" name="firstName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name*</label>
                    <input type="text" id="lastName" name="lastName" class="form-control" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="phone">Contact Number*</label>
                    <input type="tel" id="phone" name="phone" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="company">Company Name</label>
                    <input type="text" id="company" name="company" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="popupEmail">Email Address*</label>
                <input type="email" id="popupEmail" name="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="popupMessage">Message</label>
                <textarea id="popupMessage" name="message" class="form-control" rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Send Message</button>
        </form>
    </div>
`;

// Add modal to body
document.body.appendChild(modal);

// Add styles to head
const styleElement = document.createElement('style');
styleElement.textContent = `
    /* Popup Modal Styles */
    .modal {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal.show {
        display: block;
        opacity: 1;
    }
    
    .modal-content {
        background-color: white;
        margin: 5% auto;
        max-width: 600px;
        width: 90%;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        padding: 30px;
        position: relative;
        transform: translateY(-50px);
        opacity: 0;
        transition: all 0.4s ease;
    }
    
    .modal.show .modal-content {
        transform: translateY(0);
        opacity: 1;
    }
    
    .close-modal {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 28px;
        font-weight: bold;
        color: var(--gray);
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .close-modal:hover {
        color: var(--primary);
    }
    
    .modal h2 {
        font-size: 24px;
        margin-bottom: 10px;
        color: var(--dark);
    }
    
    .modal p {
        color: var(--gray);
        margin-bottom: 25px;
    }
    
    /* Form Styles */
    .form-row {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
    }
    
    .form-row .form-group {
        flex: 1;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: var(--dark);
    }
    
    .btn-block {
        display: block;
        width: 100%;
    }
    
    /* Responsive Form */
    @media (max-width: 767px) {
        .form-row {
            flex-direction: column;
            gap: 0;
        }
        
        .modal-content {
            padding: 20px;
            margin: 10% auto;
        }
    }
`;
document.head.appendChild(styleElement);

// Get modal elements
const contactModal = document.getElementById('contactModal');
const closeModal = document.querySelector('.close-modal');

// Get all "Get in Touch" buttons
const contactButtons = document.querySelectorAll('a.btn-primary');

// Add event listeners to all "Get in Touch" buttons
contactButtons.forEach(button => {
    if (button.textContent.includes('Get in Touch') || button.textContent.includes('Get a Quote')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.classList.add('show');
            setTimeout(() => {
                document.querySelector('.modal-content').style.transform = 'translateY(0)';
                document.querySelector('.modal-content').style.opacity = '1';
            }, 10);
        });
    }
});

// Close modal when clicking the close button
closeModal.addEventListener('click', function() {
    document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    document.querySelector('.modal-content').style.opacity = '0';
    setTimeout(() => {
        contactModal.classList.remove('show');
    }, 300);
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === contactModal) {
        document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        document.querySelector('.modal-content').style.opacity = '0';
        setTimeout(() => {
            contactModal.classList.remove('show');
        }, 300);
    }
});

// Handle form submission
const popupContactForm = document.getElementById('popupContactForm');
if (popupContactForm) {
    popupContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const company = document.getElementById('company').value.trim();
        const email = document.getElementById('popupEmail').value.trim();
        const message = document.getElementById('popupMessage').value.trim();
        
        // Validate form inputs
        if (firstName === '' || lastName === '' || phone === '' || email === '') {
            alert('Please fill out all required fields.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Log the form values to the console for debugging
        console.log('Form Data:', { firstName, lastName, phone, company, email, message });
        
        // Send email using EmailJS
        emailjs
            .send('service_199u7yr', 'template_1kfpiwa', {
                name: firstName + ' ' + lastName,
                phone: phone,
                company: company,
                email: email,
                message: message,
            })
            .then(
                function() {
                    // Log success
                    console.log('Email sent successfully!');
                    alert('Message sent successfully!');
                    popupContactForm.reset(); // Clear the form after successful submission
                    
                    // Close modal
                    document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
                    document.querySelector('.modal-content').style.opacity = '0';
                    setTimeout(() => {
                        contactModal.classList.remove('show');
                    }, 300);
                },
                function(error) {
                    // Log error
                    console.error('Failed to send email:', error);
                    alert('Failed to send message. Error: ' + error.text);
                }
            );
    });
}

// Fix mobile menu button functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}
        // Find the specific button in web.html
document.addEventListener('DOMContentLoaded', function() {
    // Get all relevant buttons
    const contactButtons = document.querySelectorAll('.btn.btn-primary');
    const modal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Add event listeners to buttons with specific text content
    contactButtons.forEach(button => {
        if (button.textContent.includes('Get in Touch') || button.textContent.includes('Get a Quote')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        }
    });
    
    // Close modal with close button
    if (closeModal) {
        closeModal.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Open modal function with animation
    function openModal() {
        modal.classList.add('show');
        // Allow DOM to update before applying the transform
        setTimeout(() => {
            document.querySelector('.modal-content').style.transform = 'translateY(0)';
            document.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }
    
    // Close modal function with animation
    function closeModal() {
        document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        document.querySelector('.modal-content').style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('show');
        }, 300); // Match this to your transition duration
    }
});
