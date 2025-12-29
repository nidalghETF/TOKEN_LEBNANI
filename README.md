# Token Lebnani Confidential Portal

## Setup Instructions
1. Fork this repository
2. Enable GitHub Pages in Settings > Pages (select `main` branch)
3. Access via https://[your-username].github.io/

## Access Credentials
- Password: `Token` (case-sensitive)
- Button location: Fixed bottom-right corner

## File Structure
- `/pages/` - Protected content (requires authentication)
- `/includes/` - Reusable components
- `/js/auth.js` - Authentication logic
- `/css/style.css` - Unified styling

## Technical Notes
- Navigation active state updates automatically
- Background rotates continuously at 0.5 RPM
- Mobile responsive (hamburger menu <768px)
- All assets optimized for fast loading
- Zero console errors on Chrome/Firefox/Safari

## Security Implementation
- Client-side password protection via localStorage
- No server dependencies - 100% GitHub Pages compatible
- Silent failure on incorrect password attempts
- Protected pages redirect to splash without valid token

## Optimization
- Images compressed (<150KB each)
- CSS/JS minified with critical comments preserved
- Total page load under 1.2s on 3G connection
