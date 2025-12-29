/* js/auth.js - SIMPLEST VERSION (No Logout) */

const PASSWORD = "123"; 

// 1. LOGIN FUNCTION (Called by the Enter Button on Splash Page)
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    
    if (input === PASSWORD) {
        // Save the key
        sessionStorage.setItem('authenticated', 'true');
        
        // Go to Home
        window.location.href = 'pages/home.html';
    } else {
        alert("Incorrect Password");
    }
}

// 2. SECURITY CHECK (Runs automatically on every page)
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    // If we are on the Splash Page, do nothing (let them log in)
    if (path.endsWith('index.html') || path.endsWith('/')) {
        return; 
    }

    // If we are on a Protected Page, check for the key
    const isAuth = sessionStorage.getItem('authenticated');
    
    if (isAuth !== 'true') {
        // No key? Kick them out.
        console.warn("Access Denied. Redirecting to Splash...");
        
        if (path.includes('/pages/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    }
});
