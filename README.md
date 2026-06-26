# Jackson 5 Audition Audition form.html
  ├── style.css
  ├── script.js
  └── index.html

## Features

- **Role-based dynamic form**: Select a role (Singer, Electric Guitar, Guitar, Drummer, Backstage crew) to see relevant questions
- **Form validation**: Real-time validation for required fields
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Modern UI/UX**: 
  - Elevated card designs with hover effects
  - Smooth animations and transitions
  - Loading states for form submission
  - Visual feedback for form validation
  - Responsive design for all screen sizes
- **Error handling**: User-friendly error messages with auto-dismiss
- **Success state**: Confirmation message after successful submission

## Components

### HTML Structure (`index.html`)
- Semantic HTML5 elements for accessibility
- ARIA attributes for screen readers
- Role-based question sections that load dynamically
- Loading state indicator on submit button
- Success screen with celebration animation

### CSS Styling (`style.css`)
- CSS Custom Properties (Variables) for easy theming
- Modern design inspired by 21st.dev component library
- Dark theme with accent colors
- Elevated card designs with hover effects
- Smooth transitions and animations
- Focus states for keyboard navigation
- Responsive design for mobile and desktop
- Print-friendly stylesheet

### JavaScript Functionality (`script.js`)
- Dynamic question loading based on selected role
- Form validation with visual feedback
- Loading state management during submission
- Error handling and user feedback
- Form reset functionality
- Keyboard navigation support
- Enter key handling (with Ctrl+Enter for newlines in textareas)

## How to Use

1. Simply open `index.html` in any modern web browser
2. Fill in your name and room number
3. Select your audition role from the options
4. Answer the 5 role-specific questions that appear
5. Click "Submit audition" to submit your application
6. View the success confirmation or any error messages

## Design Inspiration

This implementation draws inspiration from modern UI component libraries like those found on 21st.dev, particularly:

- **Card components**: Elevated containers with hover effects and depth
- **Input fields**: Enhanced focus states and validation styling
- **Buttons**: Loading states and hover interactions
- **Form layouts**: Clear visual hierarchy and spacing
- **Micro-interactions**: Subtle animations for better user experience

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (responsive design)

## Accessibility Features

- Full keyboard navigation (Tab/Enter/Space)
- ARIA labels and roles for screen readers
- Proper heading structure
- Focus visible indicators
- Live regions for dynamic content updates
- Error messages associated with form fields
- Color contrast meeting WCAG guidelines

## Customization

To modify the questions or roles:
1. Edit the `getQuestionsForRole()` function in `script.js`
2. Update the `roleNames` and `prefixes` objects as needed
3. Modify the role options in `index.html` if adding/removing roles

## Credits

- Font: Inter from Google Fonts
- SVG icons: Custom music note logo
- Design inspiration: 21st.dev component library
- Form backend: Formspree (configured in the fetch request)