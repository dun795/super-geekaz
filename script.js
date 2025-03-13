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
    
    // Simple form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    emailjs.init("hWoqjWtrA9ReGybO5"); // Replace with your actual User ID

// Handle Contact Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
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
      function () {
        // Log success
        console.log("Email sent successfully!");
        alert("Message sent successfully!");
        contactForm.reset(); // Clear the form after successful submission
      },
      function (error) {
        // Log error
        console.error("Failed to send email:", error);
        alert("Failed to send message. Error: " + error.text);
      }
    );
});

// Validate Email Function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
