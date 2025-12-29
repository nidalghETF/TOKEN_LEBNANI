document.addEventListener('DOMContentLoaded', () => {
    // Load header
    loadComponent('header', '/TOKEN_LEBNANI/includes/header.html');
    
    // Load navigation
    loadComponent('navigation', '/TOKEN_LEBNANI/includes/navigation.html', () => {
        setupNavigation();
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
            // Fallback navigation
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
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    const navLinks = document.querySelectorAll('#navigation a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const cleanHref = href.substring(href.lastIndexOf('/') + 1);
        if (cleanHref === currentPage) {
            link.classList.add('active');
        }
    });
}
