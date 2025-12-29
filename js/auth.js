/* js/auth.js - Security & Logout Logic */

const PASSWORD = "123"; // Or your chosen password

// 1. CHECK SECURITY (Runs on every page load)
document.addEventListener('DOMContentLoaded', () => {
    // If we are NOT on the splash page (index.html), check for a token
    if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        const isAuth = sessionStorage.getItem('authenticated');
        
        if (isAuth !== 'true') {
            // Not logged in? Kick them out.
            console.warn("Unauthorized access. Redirecting to Splash Page...");
            redirectToSplash();
        }
    }
    
    // 2. ATTACH LOGOUT LISTENER
    // We wait 1 second to ensure the footer (which contains the button) has loaded
    setTimeout(() => {
        const logoutBtn = document.getElementById('logout-button');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    }, 1000); 
});

// 3. THE LOGOUT FUNCTION
function logout() {
    // Clear the key
    sessionStorage.removeItem('authenticated');
    
    // Go to Splash Page
    redirectToSplash();
}

// 4. SMART REDIRECT (Finds the Splash Page)
function redirectToSplash() {
    // If we are inside the 'pages' folder, we need to go up one level (../)
    if (window.location.pathname.includes('/pages/')) {
        window.location.href = '../index.html';
    } else {
        // Otherwise, assume we are at root
        window.location.href = 'index.html';
    }
}

// 5. LOGIN FUNCTION (Used by the Splash Page)
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    if (input === PASSWORD) {
        sessionStorage.setItem('authenticated', 'true');
        window.location.href = 'pages/home.html';
    } else {
        alert("Incorrect Password");
    }
}
