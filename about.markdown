---
layout: page
title: Me
permalink: /me/
color: rgb(250, 179, 135)
---
<div id="canvas-container" 
     data-moon-url="{{ '/assets/3DObjects/moon.glb' | relative_url }}"
     data-astronaut-url="{{ '/assets/3DObjects/astropink.glb' | relative_url }}" >
</div>

<div class="section-nav">
  <button class="section-btn" data-section="bio">
    {% include svg-icon.html name="profile" class="btn-icon" %}
    <span>Bio</span>
  </button>
  <button class="section-btn" data-section="experience">
    {% include svg-icon.html name="briefcase" class="btn-icon" %}
    <span>Experience</span>
  </button>
  <button class="section-btn" data-section="hobbies">
    {% include svg-icon.html name="hobby" class="btn-icon" %}
    <span>Hobbies</span>
  </button>
  <button class="section-btn" data-section="favorites">
    {% include svg-icon.html name="star" class="btn-icon" %}
    <span>Favorites</span>
  </button>
</div>

<div class="section-content">
  <!-- Bio Section -->
  <div id="marker-bio" class="section-marker"></div>
  <section id="bio">
    <p>If my social media presence has ever revealed a truth about me, it's that "about me" sections and I have been in a philosophical conflict for as long as my digital footprint has existed. (My first one ever was "*describes who he is*", and the latest being, "Why is it always Bios?")</p>
    <p>My name is Dario.</p>
  </section>

  <!-- Experience Section -->
  <div id="marker-experience" class="section-marker"></div>
  <section id="experience">
    <h2>Professional Journey</h2>
    <p>Add your experience details here...</p>
    <!-- Add your experience content -->
  </section>

  <!-- Hobbies Section -->
  <div id="marker-hobbies" class="section-marker"></div>
  <section id="hobbies">
    <h2>Favorite Activities</h2>
    <ul>
      <li>running</li>
      <li>reading</li>
      <li>playing chess</li>
      <li>coding</li>
      <li>hiking</li>
    </ul>
  </section>

  <!-- Favorites Section -->
  <div id="marker-favorites" class="section-marker"></div>
  <section id="favorites">
    <h2>My Favorites</h2>
    <ul>
      <li>color: <span style="color: orange;">orange</span></li>
      <li>food: <span>🍝</span></li>
      <li>books:
        <ul>
          <li>The Odyssey by Homer</li>
          <li>The Magic Mountain by Thomas Mann</li>
          <li>The General of the Dead Army by Ismail Kadare</li>
          <li>The Human Comedy by William Saroyan</li>
          <li>A Season in Hell by Arthur Rimbaud</li>
        </ul>
      </li>
      <li>sport: volleyball</li>
      <li>way to relax: walk along the beach</li>
    </ul>
  </section>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.section-btn');
    const sections = document.querySelectorAll('.section-content section');
    const nav = document.querySelector('.section-nav');
    
    // Hide all sections initially
    sections.forEach(section => section.style.display = 'none');
    
    // Button click handler
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        
        // Remove active class from all buttons and hide all sections
        buttons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        sections.forEach(section => section.style.display = 'none');
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show the corresponding section
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        
        // Scroll to the marker
        const marker = document.getElementById(`marker-${sectionId}`);
        setTimeout(() => {
          const offset = nav.offsetHeight + 200; // Adjust this value as needed
          const markerPosition = marker.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: markerPosition,
            behavior: 'smooth'
          });
        }, 50);
      });
    });
    
    // URL hash checking code
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1); // Remove the #
      const targetButton = document.querySelector(`.section-btn[data-section="${sectionId}"]`);
      if (targetButton) {
        targetButton.click(); // Simulate click on the appropriate button
      }
    }
    
    // Sticky navigation code
    window.addEventListener('scroll', function() {
      const navRect = nav.getBoundingClientRect();
      const isStuck = navRect.top <= 60; // Adjust this value to match the height of your navbar
      nav.classList.toggle('stuck', isStuck);
    });
  });
</script>

<style>
  .section-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  padding: 1rem 0;
  position: sticky;
  top: 60px; /* Adjust this value to match the height of your navbar */
  z-index: 100;
  background-color: var(--background-color);
  transition: border-bottom 0.3s ease;
}

/* Add a class for when the nav is stuck */
.section-nav.stuck {
  border-bottom: 1px solid var(--nav-menu-color);
}

  .btn-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
  transition: transform 0.3s, color 0.3s;
}

/* Button hover animation for icons */
.section-btn:hover .btn-icon {
  transform: scale(1.2);
}
  
  /* Base button styles */
.section-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between icon and text */
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem; /* Rounder buttons */
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
  background-size: 200% 100%;
  background-position: left center;
  color: var(--inverted-text-color);
}
  
  /* Bio button - orange gradient */
  .section-btn[data-section="bio"] {
    background-image: linear-gradient(120deg, var(--nav-link-1-color), var(--logo-red));
  }
  
  /* Experience button - green gradient */
  .section-btn[data-section="experience"] {
    background-image: linear-gradient(120deg, var(--nav-link-2-color), var(--primitive-sapphire));
  }
  
  /* Hobbies button - purple gradient */
  .section-btn[data-section="hobbies"] {
    background-image: linear-gradient(120deg, var(--nav-link-3-color), var(--inline-code));
  }
  
  /* Favorites button - pink gradient */
  .section-btn[data-section="favorites"] {
    background-image: linear-gradient(120deg, var(--logo-pink), var(--hero-gradient-2));
  }
  
  /* Hover effect - shift gradient */
  .section-btn:hover {
    background-position: right center;
  }
  
  
  .section-content section {
    display: none;
    animation: fadeIn 0.5s;
  }
  
  .section-content section.active {
    display: block;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes icon-pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
.section-btn.active .btn-icon {
  animation: icon-pulsate 2s infinite ease-in-out;
  color: var(--logo-yellow) !important
}
.section-btn:not(.active) .btn-icon {
  animation: none;
}
.section-btn:hover:not(.active) .btn-icon {
  transform: scale(1.1);
}
.section-marker {
  height: 1px;
  opacity: 0;
  pointer-events: none;
  margin-top: 120px; /* Adjust this value to control scroll position */
  margin-bottom: -120px; /* Compensate so section appears in the right place */
  scroll-margin-top: 80px; /* Modern browsers - space between nav and section */
}

@media (max-width: 768px) {
  .section-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem; /* Smaller font size */
    border-radius: 1.5rem; /* Slightly less round */
  }

  .btn-icon {
    width: 16px; /* Smaller icon size */
    height: 16px;
  }

  .section-btn span {
    display: none; /* Hide text on mobile */
  }
}
</style>