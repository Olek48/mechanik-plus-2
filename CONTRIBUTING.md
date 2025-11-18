# Contributing to Mechanik Plus Website

Thank you for your interest in contributing to the Mechanik Plus website! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Suggesting Enhancements

We welcome suggestions! Please create an issue with:
- Clear description of the enhancement
- Use case and benefits
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
   - Test on multiple browsers (Chrome, Firefox, Safari)
   - Test on mobile devices
   - Test all language variants (cs, uk, en)
   - Verify cookie consent functionality
5. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📝 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Add alt text for all images
- Use `loading="lazy"` for images below the fold
- Maintain proper indentation (2 spaces)

### CSS
- Use meaningful class names
- Keep specificity low
- Add comments for complex selectors
- Maintain consistent spacing (2 spaces)
- Test responsive design on multiple screen sizes

### JavaScript
- Use `const` and `let` (avoid `var`)
- Add JSDoc comments for functions
- Handle errors gracefully
- Test all event handlers
- Maintain existing code style

### Translations
- When adding new text, add translations for all languages (cs, uk, en)
- Keep translations consistent in meaning across languages
- Maintain the structure of the `translations` object in `script.js`

## 🧪 Testing Checklist

Before submitting a PR, ensure:

- [ ] All pages load without errors
- [ ] Cookie consent banner works correctly
- [ ] Language switching works for all translations
- [ ] Contact form submits successfully
- [ ] Gallery lightbox functions properly
- [ ] Footer links navigate to correct pages
- [ ] Skip-to-content link works
- [ ] All images have alt text
- [ ] Page is responsive (mobile, tablet, desktop)
- [ ] No console errors or warnings
- [ ] Privacy consent checkbox is required
- [ ] Links open in correct target (same/new window)

## 🌍 Adding Translations

To add a new translation key:

1. Open `script.js`
2. Add the key to all language objects:
   ```javascript
   const translations = {
     cs: { myKey: 'Czech text' },
     uk: { myKey: 'Ukrainian text' },
     en: { myKey: 'English text' }
   };
   ```
3. Apply it in the `setLanguage()` function:
   ```javascript
   if (document.getElementById('my-element')) {
     document.getElementById('my-element').textContent = t.myKey;
   }
   ```
4. Add the element ID to HTML:
   ```html
   <p id="my-element">Default text</p>
   ```

## 🔒 Security Guidelines

- **Never commit sensitive data** (API keys, passwords, emails)
- **Use placeholders** for API keys (e.g., `GA_MEASUREMENT_ID`)
- **Validate user input** on contact forms
- **Keep dependencies updated**
- **Use HTTPS** for all external resources
- **Sanitize any dynamic content**

## 📸 Image Guidelines

- Optimize images before committing
- Use WebP format when possible with fallbacks
- Maximum file size: 500KB per image
- Include descriptive alt text
- Use `loading="lazy"` for performance

## 🎨 Design Guidelines

- Maintain brand colors (orange #ff6600, black, white)
- Keep consistent spacing and typography
- Ensure sufficient color contrast (WCAG AA minimum)
- Test with screen readers when possible
- Support dark mode preferences (future enhancement)

## 📚 Documentation

When adding features:
- Update README.md if necessary
- Add inline code comments for complex logic
- Update this CONTRIBUTING.md if adding new workflows
- Keep comments concise and meaningful

## 🚫 What Not to Do

- Don't commit directly to `main` branch
- Don't remove existing functionality without discussion
- Don't add large files (>1MB) without approval
- Don't change the core structure without discussion
- Don't add dependencies without justification
- Don't bypass the cookie consent system

## 💬 Communication

- Be respectful and constructive
- Ask questions if something is unclear
- Provide context in issues and PRs
- Respond to feedback promptly

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be acknowledged in release notes and the project README.

## 📞 Questions?

If you have questions about contributing, please:
- Open an issue with the "question" label
- Contact the maintainers via GitHub

---

Thank you for helping make Mechanik Plus website better! 🚗✨
