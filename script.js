// EmailJS Initialization
emailjs.init("hWoqjWtrA9ReGybO5"); // Replace with your actual User ID

// Shared utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

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
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
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

            // Send email using EmailJS
            emailjs
                .send("service_199u7yr", "template_1kfpiwa", {
                    name: name,
                    email: email,
                    message: message,
                })
                .then(
                    function() {
                        alert("Message sent successfully!");
                        contactForm.reset(); // Clear the form after successful submission
                    },
                    function(error) {
                        console.error("Failed to send email:", error);
                        alert("Failed to send message. Error: " + error.text);
                    }
                );
        });
    }

    // Blog Category Filtering
    const categoryLinks = document.querySelectorAll('.category-list a');
    const blogCards = document.querySelectorAll('.blog-card');
    const blogGrid = document.getElementById('blogGrid');
    
    if (categoryLinks.length > 0 && blogCards.length > 0) {
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
    }
    
    // Blog Pagination
    const paginationLinks = document.querySelectorAll('.blog-pagination a');
    
    if (paginationLinks.length > 0 && blogGrid) {
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
                    const currentPageLink = document.querySelector(`.blog-pagination a[data-page="${currentPage}"]`);
                    if (currentPageLink) {
                        currentPageLink.classList.add('active');
                    }
                } else {
                    // Add active class to clicked link
                    this.classList.add('active');
                    currentPage = parseInt(pageNum);
                }
                
                // Simulate page change
                window.scrollTo({
                    top: blogGrid.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
    }
    
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

    // Modal functionality
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const contactButtons = document.querySelectorAll('a.btn-primary');

    // Function to open modal with animation
    function openModal() {
        if (contactModal) {
            contactModal.classList.add('show');
            setTimeout(() => {
                const modalContent = document.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'translateY(0)';
                    modalContent.style.opacity = '1';
                }
            }, 10);
        }
    }

    // Function to close modal with animation
    function closeModal() {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent && contactModal) {
            modalContent.style.transform = 'translateY(-50px)';
            modalContent.style.opacity = '0';
            setTimeout(() => {
                contactModal.classList.remove('show');
            }, 300); // Match this to your transition duration
        }
    }

    // Add event listeners to "Get in Touch" and "Get a Quote" buttons
    if (contactButtons.length > 0) {
        contactButtons.forEach(button => {
            if (button.textContent.includes('Get in Touch') || button.textContent.includes('Get a Quote')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    openModal();
                });
            }
        });
    }

    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            closeModal();
        }
    });

    // Handle popup form submission
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
            
            // Send email using EmailJS - using a different template for the popup form
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
                        alert('Message sent successfully!');
                        popupContactForm.reset(); // Clear the form after successful submission
                        closeModal();
                    },
                    function(error) {
                        console.error('Failed to send email:', error);
                        alert('Failed to send message. Error: ' + error.text);
                    }
                );
        });
    }
});
