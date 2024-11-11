// JavaScript for section switching
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
import { createRoot } from 'react-dom/client';
import FantasyCupBracket from './fantasy-cup-bracket';

// ... your existing code ...

function showSection(sectionId) {
  // ... your existing code ...
  
  if (sectionId === 'fantasy-cup') {
    const root = createRoot(document.getElementById('fantasy-cup-root'));
    root.render(<FantasyCupBracket />);
  }
}
