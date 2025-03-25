
        // Async function to hash password using SHA-256
        async function hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        // Predefined users with hashed passwords
        const validUsers = [
            { 
                username: 'david', 
                passwordHash: '9c1185a5c5e9fc54612808977ee8f548b2258d31002c44a0ccdfe9057c4d7c3d', // hash of 'geekaz2025'
                role: 'admin' 
            },
            { 
                username: 'sarah', 
                passwordHash: 'a8b64babd0aca91c8a1a6f8d850fe34765f9dcb12a54436600c4f3f44bca50f5', // hash of 'tech2025'
                role: 'editor' 
            },
            { 
                username: 'mike', 
                passwordHash: '52270eefd8b1bbfb22c06f39d5a7f67d53efb171d25347e50c5b50a50dbe4a47', // hash of 'security2025'
                role: 'content-manager' 
            },
            { 
                username: 'emily', 
                passwordHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', // hash of 'design2025'
                role: 'designer' 
            },
            { 
                username: 'alex', 
                passwordHash: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', // hash of 'developer2025'
                role: 'developer' 
            }
        ];

        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            // Hash the entered password
            const hashedPassword = await hashPassword(password);

            // Find user in validUsers array
            const user = validUsers.find(u => 
                u.username.toLowerCase() === username.toLowerCase() && 
                u.passwordHash === hashedPassword
            );

            if (user) {
                // Store user info in sessionStorage
                sessionStorage.setItem('loggedInUser', JSON.stringify({
                    username: user.username,
                    role: user.role
                }));
                
                // Redirect to blog editing page
                window.location.href = 'blog-edit.html';
            } else {
                errorMessage.textContent = 'Invalid username or password';
            }
        });
  
