# Mechanik Plus - Autoservis Website

Professional auto repair service website with multilingual support (Czech, Ukrainian, English).

## 🌐 Live Website

Visit us at: [https://mechanik-plus.com](https://mechanik-plus.com)

## 🚀 Features

- **Multilingual Support**: Czech (cs), Ukrainian (uk), and English (en)
- **Cookie Consent Banner**: GDPR-compliant cookie consent with analytics opt-in
- **Privacy & Cookie Policies**: Comprehensive privacy and cookie policy pages in all languages
- **Contact Form**: Integrated with Formspree for easy contact management
- **Photo Gallery**: Showcase of completed auto repair work with lightbox functionality
- **Responsive Design**: Mobile-friendly layout optimized for all screen sizes
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, Schema.org markup
- **Accessibility**: Skip-to-content links, ARIA labels, keyboard navigation support
- **Performance**: Lazy loading for images and maps

## 📋 Project Structure

```
mechanik-plus-2/
├── index.html              # Main homepage
├── fotovideo.html          # Photo gallery page
├── privacy-*.html          # Privacy policy pages (cs/uk/en)
├── cookies-*.html          # Cookie policy pages (cs/uk/en)
├── script.js               # Main JavaScript with translations
├── gallery.js              # Gallery lightbox functionality
├── cookie-consent.js       # Cookie consent banner logic
├── style.css               # Main stylesheet
├── cookie-consent.css      # Cookie banner styles
├── sitemap.xml             # Search engine sitemap
├── robots.txt              # Search engine crawling rules
├── gallery-photos/         # Photo gallery images
├── favicons/               # Favicon files
└── logo.jpg                # Company logo
```

## 🛠️ Local Development

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Olek48/mechanik-plus-2.git
   cd mechanik-plus-2
   ```

2. Start a local web server:

   **Using Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Testing Different Languages

The site uses `localStorage` to store language preference. To test different languages:

1. Open browser developer tools (F12)
2. Go to Console tab
3. Run: `localStorage.setItem('siteLang', 'uk')` (or 'cs', 'en')
4. Refresh the page

## 🔧 Configuration

### Google Analytics

To add Google Analytics tracking:

1. **Using GitHub Secrets (Recommended for CI/CD):**
   - Add your GA ID as a GitHub Secret: `GA_MEASUREMENT_ID`
   - Update the deployment workflow to inject it during build

2. **Manual Configuration:**
   - Open `index.html` and `fotovideo.html`
   - Find the `initCookieConsent` call near the end
   - Replace the empty `gaId` parameter:
     ```javascript
     initCookieConsent({
       gaId: 'G-XXXXXXXXXX', // Your Google Analytics ID
       policyUrls: { ... }
     });
     ```

**Important:** Never commit your real Google Analytics ID directly to the repository. Use environment variables or GitHub Secrets.

### Contact Form (Formspree)

The contact form uses Formspree. The current endpoint is:
```
https://formspree.io/f/xyzlpwyo
```

To use your own Formspree endpoint:
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update the `action` attribute in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 🌍 Localization

All text content is managed through the `translations` object in `script.js`. To add or modify translations:

1. Open `script.js`
2. Find the `translations` object
3. Add your translation keys under the appropriate language section (cs/uk/en)
4. Use the translation key in HTML by setting an `id` attribute
5. The translation will be applied automatically on page load

Example:
```javascript
const translations = {
  cs: {
    myNewKey: 'Můj nový text'
  },
  uk: {
    myNewKey: 'Мій новий текст'
  },
  en: {
    myNewKey: 'My new text'
  }
};
```

## 🎨 Styling

The site uses a custom CSS design with:
- Orange accent color (#ff6600)
- Dark theme for footer and header
- Responsive breakpoints for mobile, tablet, and desktop
- Custom checkbox and form styles

To modify colors or styles, edit `style.css`. CSS variables are not currently used but can be added for easier theme customization.

## 📊 SEO

The site includes:
- XML Sitemap (`sitemap.xml`)
- Robots.txt (`robots.txt`)
- Schema.org LocalBusiness markup
- Open Graph tags for social media
- Twitter Card tags
- Canonical URLs

To update the sitemap after adding new pages, edit `sitemap.xml` and update the `lastmod` dates.

## 🔒 Privacy & Security

- GDPR-compliant cookie consent banner
- No third-party tracking without explicit user consent
- Secure HTTPS connection required for production
- No sensitive data stored in client-side code
- Privacy policy and cookie policy available in all languages

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Mechanik Plus**
- **Address:** Líšný 2.díl 6, 468 22 Líšný-Železný Brod, Czech Republic
- **Phone:** +420 777 318 202 / +420 773 977 965
- **Email:** autoservis@mechanik-plus.com
- **Privacy:** privacy@mechanik-plus.com
- **Website:** [https://mechanik-plus.com](https://mechanik-plus.com)

## 🐛 Known Issues

- Gallery images could be optimized further (consider WebP format)
- No build process for CSS/JS minification (can be added via CI/CD)

## 🔮 Future Enhancements

- [ ] Add service booking system
- [ ] Implement online payment integration
- [ ] Add customer testimonials section
- [ ] Create blog/news section
- [ ] Add live chat support
- [ ] Implement PWA features (offline support)
- [ ] Add image optimization pipeline (WebP, responsive images)

## 🙏 Acknowledgments

- Cookie consent implementation inspired by GDPR best practices
- Icons and favicons generated using modern tools
- Translation contributions from the team

---

**Last Updated:** November 18, 2024
