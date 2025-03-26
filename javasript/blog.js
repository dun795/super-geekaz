document.addEventListener('DOMContentLoaded', () => {
  const blogGrid = document.getElementById('blogGrid');
  const featuredPostDiv = document.getElementById('featuredPost');

  // Fetch blog posts from JSON
  fetch('blog/blogposts.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(posts => {
          // Sort posts by date (most recent first)
          posts.sort((a, b) => new Date(b.date) - new Date(a.date));

          // Render featured post (first post)
          if (posts.length > 0) {
              const featuredPost = posts[0];
              featuredPostDiv.innerHTML = `
                  <div class="featured-post-content">
                      <img src="${featuredPost.image}" alt="${featuredPost.title}">
                      <div class="post-details">
                          <span class="post-category">${featuredPost.category}</span>
                          <h2>${featuredPost.title}</h2>
                          <p>${featuredPost.excerpt}</p>
                          <a href="#" class="read-more">Read More</a>
                      </div>
                  </div>
              `;
          }

          // Render blog grid
          posts.forEach(post => {
              const postElement = document.createElement('div');
              postElement.classList.add('blog-post');
              postElement.setAttribute('data-category', post.category.toLowerCase());
              
              postElement.innerHTML = `
                  <img src="${post.image}" alt="${post.title}">
                  <div class="post-content">
                      <span class="post-category">${post.category}</span>
                      <h3>${post.title}</h3>
                      <p>${post.excerpt}</p>
                      <div class="post-meta">
                          <span class="post-date">${post.date}</span>
                          <a href="#" class="read-more">Read More</a>
                      </div>
                  </div>
              `;

              blogGrid.appendChild(postElement);
          });

          // Category filtering
          const categoryLinks = document.querySelectorAll('.category-list a');
          categoryLinks.forEach(link => {
              link.addEventListener('click', (e) => {
                  e.preventDefault();
                  const category = link.getAttribute('data-category');
                  
                  // Remove active class from all category links
                  categoryLinks.forEach(l => l.classList.remove('active'));
                  link.classList.add('active');

                  // Filter blog posts
                  const posts = document.querySelectorAll('.blog-post');
                  posts.forEach(post => {
                      if (category === 'all' || post.getAttribute('data-category') === category) {
                          post.style.display = 'block';
                      } else {
                          post.style.display = 'none';
                      }
                  });
              });
          });
      })
      .catch(error => {
          console.error('Error fetching blog posts:', error);
          blogGrid.innerHTML = '<p>Unable to load blog posts. Please try again later.</p>';
      });
});