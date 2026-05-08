// ================================
// Interactive Block Animation
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const imageWrapper = document.getElementById('imageWrapper');
    const profileImage = document.getElementById('profileImage');
    const blocksContainer = document.getElementById('blocksContainer');
    const animationHint = document.querySelector('.animation-hint');
    let isAnimating = false;

    function triggerPuzzleAnimation() {
        if (isAnimating) return;
        isAnimating = true;

        const imageWidth = profileImage.clientWidth || profileImage.offsetWidth || 200;
        const imageHeight = profileImage.clientHeight || profileImage.offsetHeight || 240;
        const GRID_SIZE = 4; // 4x4 grid = 16 puzzle pieces
        const BLOCK_WIDTH = imageWidth / GRID_SIZE;
        const BLOCK_HEIGHT = imageHeight / GRID_SIZE;

        // Keep container the same size as the image
        blocksContainer.style.width = `${imageWidth}px`;
        blocksContainer.style.height = `${imageHeight}px`;

        // Create blocks
        blocksContainer.innerHTML = '';
        const blocks = [];

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const block = document.createElement('div');
                block.className = 'image-block';

                // Set background image and position for each puzzle piece
                block.style.backgroundImage = `url('${profileImage.src}')`;
                block.style.setProperty('--block-x', `${-col * BLOCK_WIDTH}px`);
                block.style.setProperty('--block-y', `${-row * BLOCK_HEIGHT}px`);
                block.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;

                // Calculate center position for more natural scattering
                const centerX = (col - GRID_SIZE/2 + 0.5) * BLOCK_WIDTH;
                const centerY = (row - GRID_SIZE/2 + 0.5) * BLOCK_HEIGHT;
                const distance = Math.sqrt(centerX * centerX + centerY * centerY);

                // Create puzzle-like movement patterns
                const angle = Math.atan2(centerY, centerX) + (Math.random() - 0.5) * 0.5;
                const moveDistance = 120 + distance * 0.8 + Math.random() * 60;

                const tx = Math.cos(angle) * moveDistance;
                const ty = Math.sin(angle) * moveDistance + Math.random() * 40 - 20; // Add some vertical variation
                const rotation = (Math.random() - 0.5) * 90; // More dramatic rotation
                const delay = (row * GRID_SIZE + col) * 0.04; // Staggered animation start

                block.style.setProperty('--translate', `translate(${tx}px, ${ty}px)`);
                block.style.setProperty('--rotation', `${rotation}deg`);
                block.style.setProperty('--delay', `${delay}s`);
                block.style.animationDelay = `${delay}s`;

                blocksContainer.appendChild(block);
                blocks.push(block);
            }
        }
            
        // Keep the image visible while the puzzle pieces animate
        profileImage.style.opacity = '0.25';
        profileImage.style.pointerEvents = 'none';

        // Animate blocks out
        setTimeout(() => {
            blocks.forEach(block => block.classList.add('animate-out'));
        }, 100);

        // Animate blocks back in
        setTimeout(() => {
            blocks.forEach(block => {
                block.classList.remove('animate-out');
                block.classList.add('animate-in');
            });
        }, 950);

        // Show image and cleanup
        setTimeout(() => {
            blocksContainer.innerHTML = '';
            profileImage.style.opacity = '1';
            profileImage.style.pointerEvents = 'auto';
            profileImage.classList.remove('hidden');
            isAnimating = false;
        }, 1900);
    }

    if (imageWrapper && profileImage && blocksContainer) {
        imageWrapper.addEventListener('click', triggerPuzzleAnimation);
    }

    if (animationHint) {
        animationHint.addEventListener('click', triggerPuzzleAnimation);
        animationHint.style.cursor = 'pointer';
    }
});

// Hero typing effect
const heroText = "Mechanical Engineering Student | Problem Solver | Innovator";

document.addEventListener('DOMContentLoaded', function () {
    const typedTextElement = document.getElementById('typedText');
    const typedCursorElement = document.getElementById('typedCursor');

    if (!typedTextElement || !typedCursorElement) return;

    typedTextElement.textContent = '';
    typedCursorElement.textContent = '|';

    let charIndex = 0;
    const typingSpeed = 80;

    function typeHeroText() {
        if (charIndex < heroText.length) {
            typedTextElement.textContent += heroText.charAt(charIndex);
            charIndex += 1;
            setTimeout(typeHeroText, typingSpeed);
        } else {
            typedCursorElement.textContent = '';
        }
    }

    typeHeroText();
});

// Section Navigation & Animation
// ================================

// ================================
// Navigation – Scroll to Section
// ================================

document.addEventListener('DOMContentLoaded', function () {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const sectionId = this.dataset.section;
            const section = document.getElementById(sectionId);

            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ================================
// Auto Active Nav on Scroll (FIXED)
// ================================

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-btn')
                .forEach(btn => btn.classList.remove('active'));

            const activeBtn = document.querySelector(
                `.nav-btn[data-section="${entry.target.id}"]`
            );
            if (activeBtn) activeBtn.classList.add('active');
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.section').forEach(section => {
    navObserver.observe(section);
});



// ================================
// Form Submission Handler
// ================================

const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (name && email && subject && message) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
        } else {
            showNotification('Please fill all fields!', 'error');
        }
    });
}

// ================================
// Notification System
// ================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutLeft 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ================================
// Smooth Scroll for Internal Links
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        // Check if it's a section we manage
        const sectionId = href.substring(1);
        const section = document.getElementById(sectionId);
        
        if (section && section.classList.contains('section')) {
            e.preventDefault();
            // Trigger the navigation through nav buttons
            const navBtn = document.querySelector(`[data-section="${sectionId}"]`);
            if (navBtn) {
                navBtn.click();
            }
        }
    });
});

// ================================
// Add ripple effect to buttons
// ================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleAnimation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================
// Intersection Observer for animations
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInRight 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and other elements
document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});


function openInternshipModal(id) {
    const modal = document.getElementById("internshipModal");
    const body = document.getElementById("internshipModalBody");

    body.innerHTML = "";

    if (id === 1) {
        body.innerHTML = `
            <h2>Endurance Technologies Pvt. Ltd.</h2>

            <p><strong>Role:</strong> Intern  GDC Quality Department</p>
            <p><strong>Duration:</strong> 10 June 2025 - 02 August 2025</p>

            <h3>Key Skills</h3>
            <ul>
                <li>Gravity Die Casting (GDC) Process</li>
                <li>Casting Defect Identification & Analysis</li>
                <li>Process Audit & Quality Inspection</li>
                <li>Spectrolab Chemical Composition Testing</li>
                <li>Hardness Testing (BHN & HRC)</li>
            </ul>

            
         <h3 class="certificate-title">Internship Certificate</h3>

<p class="certificate-text">
    Successfully completed an internship in the Gravity Die Casting (GDC)
    Quality Department at Endurance Technologies Pvt. Ltd.
</p>

            <div class="certificate-actions">
               <a href="images/Bhagyashri Thakur SIPCertificate 2_page-0001.jpg"
   target="_blank"
   class="btn btn--primary">
   View Certificate
</a>
            </div>
        `;
    }

       else if (id === 2) {
        body.innerHTML = `
            <h2>Website Development Tutorial</h2>

            <p><strong>Role:</strong> Intern – Website Development</p>
          
             <p><strong>Duration:</strong> 01 June 2024 – 06 August 2024 </p>

            <h3>Key Skills</h3>
            <ul>
                <li>HTML5 structure and semantic elements</li>
                <li>CSS3 styling, layouts, and responsive design</li>
                <li>JavaScript basics for interactivity</li>
                <li>Website layout design and navigation</li>
                <li>Form handling and UI best practices</li>
                <li>Fundamentals of front-end web development</li>
            </ul>

            <h3 class="certificate-title">Course Completion Certificate</h3>

            <p class="certificate-text">
                Successfully completed the Website Development Tutorial conducted
                under the Infosys Springboard learning initiative on 06 August 2024,
                demonstrating proficiency in fundamental web development concepts
                and practical implementation skills.
            </p>

            <div class="certificate-actions">
           
            <a href="images/Website Development Tutorial.jpg"
                   target="_blank"
            class="btn btn--primary certificate-link">
                   View Certificate
               </a>

            </div>
        `;
    }

    modal.style.display = "flex";
}

// ================================
// Internship Modal Close Function
// ================================

function closeInternshipModal() {
    const modal = document.getElementById("internshipModal");
    modal.style.display = "none";
}

// Close modal when clicking outside
window.addEventListener("click", function (e) {
    const modal = document.getElementById("internshipModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

/* =====================================================
   NAVIGATION SCROLL
===================================================== */
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const section = document.getElementById(btn.dataset.section);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ================= PROJECT MODAL =================

function goToProject(projectId) {
  const modal = document.getElementById("projectModal");
  const body = document.getElementById("projectModalBody");

  if (!modal || !body) {
    console.error("Project modal HTML not found");
    return;
  }

  body.innerHTML = "";

  if (projectId === "project1") {
    body.innerHTML = `
      <h2>Regenerative Braking System</h2>

      <img 
        src="images/Regenerative Braking System.jpeg"
        class="project-modal-image"
        alt="Regenerative Braking System">

      <p>
        Designed and tested a compact regenerative braking system to recover
        braking-induced kinetic energy and convert it into usable electrical
        energy for small electric vehicle applications.
      </p>

      <p>
        The system focuses on improving energy efficiency by capturing energy
        normally lost during braking and converting it into electrical output
        through a DC motor-based mechanism.
      </p>

      <h4>Key Contributions</h4>
      <ul>
        <li>Designed a mechanical braking setup integrated with an energy recovery mechanism.</li>
        <li>Converted rotational kinetic energy into electrical energy using a DC motor.</li>
        <li>Experimentally evaluated system performance across varying rotational speeds.</li>
        <li>Analyzed braking disc temperature to ensure safe operation.</li>
      </ul>

      <h4>Outcome</h4>
      <ul>
        <li>Generated 2–6 V at 1958–5010 RPM</li>
        <li>Maximum power output: 1.8 W</li>
        <li>Safe disc temperature: 55.8 °C</li>
        <li>Recovered up to 266 J of energy</li>
      </ul>
    `;
  }

  else if (projectId === "project2") {
    body.innerHTML = `
      <h2>Inventory Management System Website</h2>

      <img 
        src="images/Inventory Management System Website.jpeg"
        class="project-modal-image"
        alt="Inventory Management System Website">

      <p>
        Web-based system developed for efficient inventory control and real-time
        stock monitoring.
      </p>

      <h4>Role & Domain</h4>
      <p><strong>Role:</strong> Full-Stack Web Developer</p>
      <p><strong>Domain:</strong> Full-Stack Development | Database Management | Real-Time Data Processing</p>

      <h4>Key Highlights</h4>
      <ul>
        <li>Managed inventory, stock levels, orders, and suppliers</li>
        <li>Implemented real-time updates and advanced search features</li>
        <li>Developed using HTML, CSS, JavaScript with backend database</li>
      </ul>

      <h4>Outcome</h4>
      <ul>
        <li>Improved stock accuracy and system efficiency</li>
        <li>Reduced manual inventory handling</li>
      </ul>
    `;
  }

  else if (projectId === "project3") {
    body.innerHTML = `
      <h2>Single-Stage Thermoelectric Refrigeration System</h2>

      <img 
        src="images/Single-Stage Thermoelectric Refrigeration System.jpeg"
        class="project-modal-image"
        alt="Single-Stage Thermoelectric Refrigeration System">

      <p>
        Single-stage water-cooled thermoelectric refrigeration system designed
        and experimentally evaluated for compact, eco-friendly cooling.
      </p>

      <h4>Project Outcome</h4>
      <ul>
        <li>Developed system using TEC1-12706 modules</li>
        <li>Implemented water-cooled heat rejection</li>
        <li>Analyzed water level vs cooling performance</li>
        <li>Evaluated COP and power consumption</li>
        <li>Demonstrated solar-powered DC operation feasibility</li>
      </ul>
    `;
  }

  else if (projectId === "project4") {
    body.innerHTML = `
      <h2>EV Battery Thermal Analysis</h2>

      <img 
        src="images/EV Battery Thermal Analysis.png"
        class="project-modal-image"
        alt="EV Battery Thermal Analysis">

      <p>
        CFD-based thermal analysis of a cylindrical lithium-ion battery pack
        under forced air cooling for electric vehicle applications.
      </p>

      <h4>Project Outcome</h4>
      <ul>
        <li>Identified inlet air temperature as a key cooling factor</li>
        <li>300 K inlet showed better temperature uniformity</li>
        <li>323 K inlet caused higher temperatures and hotspots</li>
        <li>Analyzed airflow patterns and thermal gradients</li>
        <li>Provided design insights for EV battery cooling</li>
      </ul>
    `;
  }

  modal.style.display = "flex";
}

// ================= CLOSE PROJECT MODAL =================

function closeProjectModal() {
  document.getElementById("projectModal").style.display = "none";
}

// ================= PROFESSIONAL SKILLS CIRCLES ANIMATION =================

function animateCircle(circle, targetValue, duration = 2000) {
  const startTime = Date.now();
  
  function update() {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // 0 to 1
    const currentValue = Math.floor(targetValue * progress);
    
    circle.style.setProperty('--value', currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      circle.style.setProperty('--value', targetValue);
    }
  }
  
  update();
}

function initializeCircles() {
  const circles = document.querySelectorAll('.circle');
  
  circles.forEach((circle, index) => {
    const percent = parseInt(circle.getAttribute('data-percent'));
    
    // Initialize value to 0
    circle.style.setProperty('--value', '0');
    
    // Start animation with staggered delay
    setTimeout(() => {
      animateCircle(circle, percent, 2500);
    }, index * 200);
  });
}

// Initialize circles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('.professional-skills');
  if (skillsSection) {
    // Small delay to ensure DOM is ready
    setTimeout(initializeCircles, 300);
  }
});

// Re-initialize on page fully loaded
window.addEventListener('load', () => {
  const circles = document.querySelectorAll('.circle');
  const hasAnimated = circles.length > 0 && circles[0].style.getPropertyValue('--value') > 0;
  
  if (!hasAnimated) {
    setTimeout(initializeCircles, 500);
  }
});

window.addEventListener("click", function (e) {
  const modal = document.getElementById("projectModal");
  if (e.target === modal) {
    closeProjectModal();
  }
});


/* =====================================================
   PROJECT SLIDER – SHOW 4th PROJECT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".projects-track");
  const cards = document.querySelectorAll(".project-card");
  const prev = document.querySelector(".slider-btn.prev");
  const next = document.querySelector(".slider-btn.next");

  if (!track || !cards.length || !prev || !next) {
    console.warn("Project slider elements not found");
    return;
  }

  let index = 0;
  const visibleCards = 3;
  const gap = 24; // must match CSS gap

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  next.addEventListener("click", () => {
    if (index < cards.length - visibleCards) {
      index++;
      updateSlider();
    }
  });

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
});





/* =====================================================
   PROJECT SLIDER + ACTIVE CARD (FINAL STABLE VERSION)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".projects-track");
  const cards = document.querySelectorAll(".project-card");
  const prev = document.querySelector(".slider-btn.prev");
  const next = document.querySelector(".slider-btn.next");

  if (!track || !cards.length || !prev || !next) return;

  let index = 0;
  const visibleCards = 3;
  const gap = 24;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // ✅ ACTIVE CARD CONTROL
    cards.forEach(card => card.classList.remove("active"));
    if (cards[index]) {
      cards[index].classList.add("active");
    }
  }

  // Initial state
  updateSlider();

  // Next arrow
  next.addEventListener("click", () => {
    if (index < cards.length - visibleCards) {
      index++;
      updateSlider();
    }
  });

  // Prev arrow
  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  // Resize fix
  window.addEventListener("resize", updateSlider);
});

const skills = document.querySelectorAll('.progress');

window.addEventListener('scroll', () => {
  skills.forEach(skill => {
    skill.style.width = skill.style.width;
  });
});


/* ================= ACTIVE CARD FOCUS CONTROL ================= */

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  // remove visual lift on load
  cards.forEach(card => card.classList.remove("is-focused"));

  // lift only on hover
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      cards.forEach(c => c.classList.remove("is-focused"));
      card.classList.add("is-focused");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-focused");
    });
  });
});

