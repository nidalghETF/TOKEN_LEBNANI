/* js/includes.js - Adapted for your specific file structure */

async function loadComponent(elementId, filename) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Based on your file layout, the includes are inside the 'js' folder.
    // We need to check paths relative to where the USER is currently standing.

    const pathsToTry = [
        // 1. If we are in the 'pages' folder (e.g., home.html)
        `../js/includes/${filename}`,
        
        // 2. If we are at the Root (e.g., index.html)
        `js/includes/${filename}`,
        
        // 3. Fallback: Standard root folder (just in case)
        `includes/${filename}`,
        `../includes/${filename}`
    ];

    for (let path of pathsToTry) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const html = await response.text();
                element.innerHTML = html;
                
                // If this is the navigation menu, activate the highlight logic
                if (elementId === 'navigation') setupNavigation();
                
                // Stop looking once we found it
                return;
            }
        } catch (e) {
            // Keep trying the next path
        }
    }
    
    console.error(`ERROR: Could not find ${filename}. I looked in: js/includes/, ../js/includes/, and root includes.`);
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Highlight if the link matches the current page
        if (href && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });

    // Mobile Menu Logic
    const menuBtn = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuBtn && mobileNav) {
        const newBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newBtn, menuBtn);
        
        newBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            newBtn.innerHTML = mobileNav.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
    loadComponent('navigation', 'navigation.html');
});
