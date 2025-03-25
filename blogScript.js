  // Check authentication on page load
        document.addEventListener('DOMContentLoaded', function() {
            const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
            const userInfoDisplay = document.getElementById('userInfoDisplay');
            const roleAccessSection = document.getElementById('roleAccessSection');

            if (!user) {
                // Redirect to login if not authenticated
                window.location.href = 'login.html';
                return;
            }

            // Display user information
            userInfoDisplay.innerHTML = `
                <p>Welcome, ${user.username}!</p>
                <p>Role: ${user.role}</p>
            `;

            // Role-based access control
            const roleAccess = {
                'admin': `
                    <h3>Admin Access</h3>
                    <ul>
                        <li>Create new blog posts</li>
                        <li>Edit any existing posts</li>
                        <li>Delete posts</li>
                        <li>Manage user accounts</li>
                    </ul>
                `,
                'editor': `
                    <h3>Editor Access</h3>
                    <ul>
                        <li>Edit assigned blog posts</li>
                        <li>Submit new content for review</li>
                    </ul>
                `,
                'content-manager': `
                    <h3>Content Manager Access</h3>
                    <ul>
                        <li>Review and approve posts</li>
                        <li>Manage content workflows</li>
                    </ul>
                `,
                'designer': `
                    <h3>Designer Access</h3>
                    <ul>
                        <li>Update blog visual design</li>
                        <li>Create graphics for posts</li>
                    </ul>
                `,
                'developer': `
                    <h3>Developer Access</h3>
                    <ul>
                        <li>Technical blog maintenance</li>
                        <li>Site performance optimization</li>
                    </ul>
                `
            };

            // Display role-specific access
            roleAccessSection.innerHTML = roleAccess[user.role] || 
                '<p>No specific access rights defined for this role.</p>';

            // Logout functionality
            document.getElementById('logoutBtn').addEventListener('click', function() {
                sessionStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        });
    
