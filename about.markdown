---
layout: page
title: Me
permalink: /me/
color: rgb(250, 179, 135)
---

<div id="canvas-container" 
     data-moon-url="{{ '/assets/3DObjects/moon.glb' | relative_url }}"
     data-moon-draco-url="{{ '/assets/3DObjects/moon-draco.glb' | relative_url }}"
     data-moon-lowres-url="{{ '/assets/3DObjects/moon-lowres-draco.glb' | relative_url }}"
     data-astronaut-url="{{ '/assets/3DObjects/astropink.glb' | relative_url }}"
     data-astronaut-draco-url="{{ '/assets/3DObjects/astropink-draco.glb' | relative_url }}"
     data-astronaut-lowres-url="{{ '/assets/3DObjects/astropink-lowres-draco.glb' | relative_url }}">
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
    <p>But here we go. My name is Dario. I am mainly a web developer, with a passion for frontend technologies.</p>
     <br>
    <p>I hope you enjoyed the little 3D animation on this page because I truly enjoyed making it! It’s built with Three.js, and the 3D objects were created in Blender. You can navigate the scene by zooming in or out, and explore along the x, y, and z axes. You can also make the little astronaut, cleverly named AstroPink, jump from moon to moon by pressing the Space key or tap on mobile.
    </p>
    <p>If you want to learn more about the animation check my article on <a href="{{ '/blog/planet-rotation' | relative_url }}">celestial body orbiting</a>.</p>

  </section>

  <!-- Experience Section -->
  <div id="marker-experience" class="section-marker"></div>
  <section id="experience">
    <h2>Professional Journey</h2>
    <h3>Web Development</h3>
<p>
  I have several years of experience in web development and its associated
  technologies. I designed the curriculum for a beginner-level web development
  course, which I taught for several years, leaving hundreds of students
  satisfied.
</p>
<p>
  I am proficient in JavaScript, HTML, CSS, and React on the frontend, and
  Node.js, Express.js, and ASP.NET on the backend.
</p>
<h3>Desktop Development</h3>
<p>
  I have developed numerous desktop applications for Windows users, utilizing
  technologies such as WinForms and Xamarin.Forms. Additionally, I briefly
  explored Flutter and Dart.
</p>
<h3>Programming Languages</h3>
<p>
  I am passionate about Java and have designed a beginner-level course focused
  on the core concepts of the language and basic data structures and algorithms
  (DSA), which I successfully taught for several years.
</p>
<h3>Open Source</h3>
<p>
  I am an active contributor to open-source projects on GitHub. I have
  contributed to several projects, including the popular MDN Web Docs.
</p>
<h3>Skills</h3>
<ul>
  <li>JavaScript</li>
  <li>HTML</li>
  <li>CSS</li>
  <li>React</li>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>ASP.NET</li>
  <li>Java</li>
  <li>WinForms</li>
  <li>Xamarin.Forms</li>
  <li>Flutter</li>
  <li>Dart</li>
  <li>DSA</li>
  <li>C#</li>
  <li>SQL</li>
  <li>Git</li>
  <li>GitHub</li>
</ul>
<h3>Languages</h3>
<ul>
<li>English</li>
<li>Italian</li>
<li>Albanian</li>
<li>Albanian Sign Language</li>
</ul>

    <!-- Add your experience content -->
  </section>

  <!-- Hobbies Section -->
  <div id="marker-hobbies" class="section-marker"></div>
  <section id="hobbies">
    <h2>Favorite Activities</h2>
    <h3>Running</h3>
    <p>
      I love running; it's my favorite way to get some exercise. I recently
      rediscovered this hobby and am currently running 5k in 35 minutes. My goal is
      to complete a half marathon by the end of the year.
    </p>
    <h3>Swimming</h3>
    <p>
      I grew up in a coastal city at the meeting point of the Adriatic and Ionian
      seas. Swimming has always been an important part of my life.
    </p>
    <h3>Reading</h3>
    <p>
      I love exploring a wide range of genres. While I mostly read
      fiction, I adore the classics. I also enjoy non-fiction, particularly topics
      on math and science. However, my greatest passion lies in poetry. I appreciate
      poetry across all genres, though I have a soft spot for French Symbolism,
      Surrealism, Dadaism, and Italian Hermeticism.
    </p>
    <h3>Playing Chess</h3>
    <p>
      I started playing chess eight years ago and still approach it with the same
      enthusiasm. It’s a fantastic way for me to relax and keep my mind sharp.
    </p>
    <h3>Gaming</h3>
    <p>
      I am a casual gamer and enjoy metroidvania platformers and action roguelikes.
      My recent achievements include defeating the final boss in <strong>Nine Sols</strong> and
      completing <strong>Slay the Spire</strong> on Ascension 20.
    </p>

  </section>

  <!-- Favorites Section -->
  <div id="marker-favorites" class="section-marker"></div>
  <section id="favorites">
    <h2>My Favorites</h2>
      <h3>Color</h3>
        <p>
          My favorite color is <span style="color: #fe640b">orange</span>, like a
          peach or the sunset reflection at the meeting point of the Ionian and Adriatic
          Seas in my hometown.
        </p>
      <h3>Food</h3>
        <p>
          My favorite food is pasta, and my favorite types are either linguine or
          penne rigate. I can make the best cherry tomato sauce with basil.
        </p>
      <h3>Book</h3>
        <p>
          This is a hard one, and I’m going to cheat. So here is the resolution of
          my internal battle:
        </p>
        <ul>
          <li>
            My favorite Albanian novel: <em>The General of the Dead Army</em> by
            Ismail Kadare
          </li>
          <li>My favorite epic poem: <em>The Odyssey</em> by Homer</li>
          <li>My favorite poetry book: <em>A Season in Hell</em> by Arthur Rimbaud</li>
          <li>My favorite novel: <em>The Magic Mountain</em> by Thomas Mann</li>
          <li>
            My favorite play: <em>The Resistible Rise of Arturo Ui</em> by Bertolt
            Brecht
          </li>
          <li>My favorite short story: <em>The Overcoat</em> by Nikolai Gogol</li>
        </ul>
      <h3>Movie</h3>
        <p>My favorite movie is <em>Night on Earth</em> by Jim Jarmusch.</p>
      <h3>Song</h3>
        <p>I’m not going to pick a favorite song because it’s a transient, dynamic feeling. However, I do have a favorite music video: Rihanna's <em>Needed Me</em>, directed by one of my favorite movie directors, Harmony Korine.</p>
      <h3>Language</h3>
        <p>My favorite language is Albanian. It's sweet, it's soft, it's complex.</p>
      <h3>Sport</h3>
        <p>My favorite sport is Volleyball.</p>
      <br>
      <br>
      <h4>In progress...</h4>
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
    transform: scale(1.3);
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
