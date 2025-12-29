/* js/auth.js - NUCLEAR OPTION (Fail-Safe Login) */

const PASSWORD = "Token"; 

// 1. FORCE GLOBAL FUNCTION (So HTML onclick="..." can find it)
window.checkPassword = function() {
    console.log("Login function triggered..."); // DEBUG LOG

    // Find the input box
    const input = document.getElementById('passwordInput');
    
    // Safety check: Does the box exist?
    if (!input) {
        alert("Error: Could not find 'passwordInput' box.");
        return;
    }

    const userValue = input.value;
    console.log("User typed:", userValue); // DEBUG LOG

    if (userValue === PASSWORD) {
        console.log("Password Correct! Redirecting...");
        
        // Save the key
        sessionStorage.setItem('authenticated', 'true');
        
        // FORCE REDIRECT
        // We try two common paths to be safe
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/pages/')) {
             // If we are somehow already inside 'pages', stay there
             window.location.href = 'home.html';
        } else {
             // Normal splash page login
             window.location.href = 'pages/home.html';
        }
        
    } else {
        alert("Incorrect Password");
    }
};

// 2. ENABLE "ENTER" KEY (So you don't have to click the button)
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('passwordInput');
    if (input) {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                window.checkPassword();
            }
        });
    }

    // 3. SECURITY CHECK (Runs on every page load)
    const path = window.location.pathname;
    
    // SKIP security if we are on the Splash Page (index.html) or root (/)
    if (path.endsWith('index.html') || path.endsWith('/')) {
        console.log("On Splash Page - Security Skipped");
        return; 
    }

    // RUN security on all other pages
    const isAuth = sessionStorage.getItem('authenticated');
    if (isAuth !== 'true') {
        console.warn("Unauthorized! Redirecting to Splash...");
        // Bounce back to root
        window.location.href = '../index.html'; 
    }
});
