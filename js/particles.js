const canvas = document.createElement('canvas');
canvas.id = 'canvas-bg';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function init() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];
  // Adjust particle count based on screen size for performance and aesthetics
  const numParticles = Math.floor((width * height) / 12000); 
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    // Very slow, elegant drifting movement
    this.vx = (Math.random() - 0.5) * 0.4; 
    this.vy = (Math.random() - 0.5) * 0.4;
    // Tiny, minimalist nodes
    this.radius = Math.random() * 1.5 + 0.5;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    // Bounce smoothly off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
  }
}

function animate() {
  // Deep dark background color
  ctx.fillStyle = '#0a0a0c'; 
  ctx.fillRect(0, 0, width, height);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    
    // Draw connecting lines if particles are close
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Connection radius
      if (distance < 110) {
        ctx.beginPath();
        // Opacity fades as they get further apart
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 110) * 0.3})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', init);

// Initialize and start animation
init();
animate();
