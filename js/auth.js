document.addEventListener('DOMContentLoaded', () => {
    // Handle splash page button click
    const enterButton = document.getElementById('enterButton');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            const input = document.getElementById('passwordInput');
            if (input && input.value === "Token") {
                localStorage.setItem("siteAccess", "granted");
                window.location.href = "pages/home.html";
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
                        window.location.href = "pages/home.html";
                    }
                }
            });
        }
    }
    
    // Check access for all protected pages
    if (!localStorage.getItem("siteAccess")) {
        // Check if we're not already on the splash page
        if (!window.location.pathname.includes('index.html') && 
            !window.location.pathname.includes('pages/')) {
            window.location.href = "index.html";
        } else if (window.location.pathname.includes('pages/')) {
            window.location.href = "../index.html";
        }
    }
    
    // Add logout functionality
    window.logout = function() {
        localStorage.removeItem("siteAccess");
        window.location.href = "../index.html";
    };
});
