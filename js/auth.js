document.addEventListener('DOMContentLoaded', () => {
    // Get base path for GitHub Pages
    const getBasePath = () => {
        const pathParts = window.location.pathname.split('/').filter(part => part.length);
        if (pathParts.includes('pages')) {
            const pagesIndex = pathParts.indexOf('pages');
            pathParts.splice(pagesIndex, 1);
        }
        return pathParts.length > 0 ? `/${pathParts.join('/')}` : '';
    };
    
    const basePath = getBasePath();
    
    // Handle splash page button click
    const enterButton = document.getElementById('enterButton');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            const input = document.getElementById('passwordInput');
            if (input && input.value === "Token") {
                localStorage.setItem("siteAccess", "granted");
                window.location.href = `${basePath}/pages/home.html`;
            }
            // Silent fail - no feedback on wrong password
        });
        
        // Allow Enter key to submit password
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const input = document.getElementById('passwordInput');
                    if (input && input.value === "Token") {
                        localStorage.setItem("siteAccess", "granted");
                        window.location.href = `${basePath}/pages/home.html`;
                    }
                }
            });
        }
    }
    
    // Check access for all protected pages
    if (!localStorage.getItem("siteAccess")) {
        // Redirect to splash page if not authenticated
        if (window.location.pathname.includes('/pages/')) {
            window.location.href = `${basePath}/index.html`;
        }
    }
    
    // Add logout functionality
    window.logout = function() {
        localStorage.removeItem("siteAccess");
        window.location.href = `${basePath}/index.html`;
    };
});
