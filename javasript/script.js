document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
  
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  
    // Close mobile menu when any nav link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  
    // --- Header Scroll Effect (Debounced with requestAnimationFrame) ---
    const header = document.getElementById("header");
    let lastScrollY = window.scrollY;
    let ticking = false;
  
    window.addEventListener("scroll", () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastScrollY > 50) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#" || targetId === "") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          // Calculate target position (offsetting for fixed header)
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  
    // --- Contact Form Submission Handling ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        // You can add real form submission logic here (e.g., using fetch)
        alert("Thank you for your message! We will get back to you soon.");
        this.reset();
      });
    }
  
    // --- Fetch and Render Blog Posts ---
    const jsonUrl =
      "https://raw.githubusercontent.com/mrndivho/post/main/post.json";
    const featuredPostContainer = document.getElementById("featuredPost");
    const blogGrid = document.getElementById("blogGrid");
  
    // Display a loading indicator
    blogGrid.innerHTML = '<p class="loading">Loading posts...</p>';
  
    async function fetchPosts() {
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          // Clear loading indicator
          blogGrid.innerHTML = "";
  
          // Set the first post as the featured post
          const featuredPost = data[0];
          featuredPostContainer.innerHTML = `
            <div class="featured-post-card">
              <div class="featured-post-image">
                <span class="featured-tag">Featured</span>
                <img src="${featuredPost.image}" alt="${featuredPost.title}">
              </div>
              <div class="featured-post-content">
                <div class="blog-meta">
                  <span class="blog-date">${featuredPost.date}</span>
                  <span class="blog-category">${featuredPost.category}</span>
                </div>
                <h2>${featuredPost.title}</h2>
                <p>${featuredPost.description}</p>
                <a href="${featuredPost.link}" class="btn btn-primary">Read Full Article</a>
              </div>
            </div>
          `;
  
          // Render the rest of the posts in the blog grid
          data.slice(1).forEach((post) => {
            const card = document.createElement("div");
            card.className = "blog-card";
            card.setAttribute("data-category", (post.category || "general").toLowerCase());
            card.innerHTML = `
              <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <span class="blog-date">${post.date}</span>
                  <span class="blog-category">${post.category}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <a href="${post.link}" class="blog-link">Read More</a>
              </div>
            `;
            blogGrid.appendChild(card);
          });
        } else {
          blogGrid.innerHTML = '<p>No posts available.</p>';
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        blogGrid.innerHTML =
          '<p class="error">Error loading posts. Please try again later.</p>';
      }
    }
  
    fetchPosts();
  });
  