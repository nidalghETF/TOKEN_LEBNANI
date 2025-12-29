// 1. DYNAMIC BASE PATH DETECTION
// This fixes the "basePath is not defined" error and works for both
// Localhost (root /) and GitHub Pages (/TOKEN_LEBNANI/)
function getBasePath() {
    const path = window.location.pathname;
    // If we are in a repo (like /TOKEN_LEBNANI/), this gets that part.
    // If we are at root, it returns empty string.
    const pathParts = path.split('/');
    // Check if the first part is a repo name (usually length > 0 and not 'pages')
    if (pathParts.length > 1 && pathParts[1] !== "" && pathParts[1] !== "pages") {
        return "/" + pathParts[1];
    }
    return "";
}

// Define basePath globally so all functions can use it
const basePath = getBasePath();
console.log("Detected Base Path:", basePath); // For debugging
document.addEventListener('DOMContentLoaded', () => {
    // Insert mobile menu button
    const headerContainer = document.getElementById('header');
    if (headerContainer) {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.setAttribute('aria-label', 'Menu');
        headerContainer.appendChild(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', () => {
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav) {
                mobileNav.classList.toggle('active');
            }
        });
    }
    
    // Load header
    loadComponent('header', '/TOKEN_LEBNANI/includes/header.html');
    
    // Load navigation
    loadComponent('navigation', '/TOKEN_LEBNANI/includes/navigation.html', () => {
        setupNavigation();
        setupMobileNavigation();
    });
    
    // Load footer
    loadComponent('footer', '/TOKEN_LEBNANI/includes/footer.html');
});

function loadComponent(elementId, filePath, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            if (callback) callback();
        })
        .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
            // Fallback content for navigation
            if (elementId === 'navigation') {
                element.innerHTML = `
                <nav>
                    <a href="/TOKEN_LEBNANI/pages/home.html">Home</a>
                    <a href="/TOKEN_LEBNANI/pages/value-proposition.html">Value Proposition</a>
                    <a href="/TOKEN_LEBNANI/pages/investors-deck.html">Investors Deck</a>
                    <a href="/TOKEN_LEBNANI/pages/home-business-plan.html">Home Business Plan</a>
                    <a href="/TOKEN_LEBNANI/pages/legal-framework.html">Legal Framework</a>
                    <a href="/TOKEN_LEBNANI/pages/go-to-market.html">Go to Market</a>
                    <a href="/TOKEN_LEBNANI/pages/yaz-consult-pitch.html">Yaz Consult Pitch</a>
                </nav>
                `;
                if (callback) callback();
            }
        });
}

function setupNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    const navLinks = document.querySelectorAll('#navigation a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

function setupMobileNavigation() {
    // Clone desktop navigation for mobile
    const desktopNav = document.querySelector('#navigation nav');
    if (!desktopNav) return;
    
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Clone links
    const links = desktopNav.querySelectorAll('a');
    links.forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileLink.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
        mobileNav.appendChild(mobileLink);
    });
    
    // Insert mobile navigation after desktop navigation
    const navContainer = document.getElementById('navigation');
    navContainer.appendChild(mobileNav);
}

// Add logout function
window.logout = function() {
    localStorage.removeItem("siteAccess");
    window.location.href = "/TOKEN_LEBNANI/index.html";
};
