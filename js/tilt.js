/**
 * 3D Tilt Effect for Portfolio Cards
 */
const tiltElements = document.querySelectorAll('.project, article');

tiltElements.forEach(el => {
  el.addEventListener('mousemove', handleMove);
  el.addEventListener('mouseout', handleReset);
});

function handleMove(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  // Calculate rotation (max 10 degrees)
  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;
  
  el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  el.style.transition = 'none';
}

function handleReset(e) {
  const el = e.currentTarget;
  el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  el.style.transition = 'transform 0.5s ease';
}
