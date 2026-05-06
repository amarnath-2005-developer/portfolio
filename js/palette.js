/**
 * Command Palette and Reveal Logic
 */

// Reveal Logic
function triggerReveal() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => el.classList.add('active'));
}

// Trigger initial reveal on load
window.addEventListener('load', () => {
  setTimeout(triggerReveal, 500);
});

// Command Palette Logic
const palette = document.querySelector('#command-palette');
const search = document.querySelector('#palette-search');
const items = document.querySelectorAll('.palette-item');

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    palette.classList.toggle('hidden');
    if (!palette.classList.contains('hidden')) {
      search.focus();
    }
  }
  if (e.key === 'Escape') {
    palette.classList.add('hidden');
  }
});

palette.addEventListener('click', (e) => {
  if (e.target === palette) palette.classList.add('hidden');
});

items.forEach(item => {
  item.addEventListener('click', () => {
    const action = item.getAttribute('data-action');
    handleAction(action);
    palette.classList.add('hidden');
  });
});

function handleAction(action) {
  switch(action) {
    case 'about': document.querySelector('#grid__tl__btn').click(); break;
    case 'experience': document.querySelector('#grid__tr__btn').click(); break;
    case 'projects': document.querySelector('#grid__bl__btn').click(); break;
    case 'contact': document.querySelector('#grid__br__btn').click(); break;
    case 'resume': window.open('assets/amarnath_resume.pdf', '_blank'); break;
  }
}

// Filter logic
search.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(term) ? 'block' : 'none';
  });
});

// Trigger reveal on any section click
document.querySelectorAll('#grid__tl__btn, #grid__tr__btn, #grid__bl__btn, #grid__br__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset and re-trigger reveal for fresh animation
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => el.classList.remove('active'));
    setTimeout(triggerReveal, 100);
  });
});

