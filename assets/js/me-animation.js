import * as THREE from "three";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./starfield.js";

const container = document.getElementById("canvas-container");

// Get all available model URLs
const moonUrl = container.dataset.moonUrl;
const moonDracoUrl = container.dataset.moonDracoUrl;
const moonLowresUrl = container.dataset.moonLowresUrl;
const astronautUrl = container.dataset.astronautUrl;
const astronautDracoUrl = container.dataset.astronautDracoUrl;
const astronautLowresUrl = container.dataset.astronautLowresUrl;

// Device and connection detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLowBandwidth = navigator.connection ? (navigator.connection.downlink < 5) : false;

// Choose the appropriate model URLs based on device capabilities
const selectedMoonUrl = isLowBandwidth || isMobile ? moonLowresUrl : moonDracoUrl || moonUrl;
const selectedAstronautUrl = isLowBandwidth || isMobile ? astronautLowresUrl : astronautDracoUrl || astronautUrl;

// Get dimensions from the container instead of window
const w = container.clientWidth;
const h = container.clientHeight;

const renderer = new THREE.WebGLRenderer({ antialias: !isMobile });
renderer.setSize(w, h);
container.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 17;
camera.position.y = 5;
camera.position.x = 10;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

// Add ambient light for general illumination
scene.add(new THREE.AmbientLight(0x555555));

// Add a directional light for more uniform lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const starfield = getStarfield({ numStars: isMobile ? 2000 : 5000 });
scene.add(starfield);

// --------------------------
// 2. Load GLTF Models with DRACO support
// --------------------------
const loader = new GLTFLoader();

// Set up DRACO loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
loader.setDRACOLoader(dracoLoader);

let moon1, moon2, astronaut;
let modelsLoaded = 0;

// Helper to check when all three models are loaded.
function checkModelsLoaded() {
  if (modelsLoaded === 3) {
    // Set astronaut's initial position to moon1's position
    astronaut.position.copy(moon1.position);
    // Offset to simulate sitting on the surface
    astronaut.position.y += 3.7;
    astronaut.position.z += 1;
    astronaut.position.x += 1;

    // Start the simulation once all models have been loaded.
    animate();
  }
}

// Load moon1 glTF model
loader.load(
  selectedMoonUrl,
  function (gltf) {
    moon1 = gltf.scene;
    // Adjust scale/rotation if needed (depends on your model)
    moon1.scale.set(1, 1, 1);
    scene.add(moon1);
    modelsLoaded++;
    checkModelsLoaded();
  },
  function (xhr) {
    const percentLoaded = (xhr.loaded / xhr.total) * 100;
    console.log(`Loading moon model: ${Math.round(percentLoaded)}% loaded`);
  },
  function (error) {
    console.error("Error loading moon model:", error);
    // Fallback to original model if compressed fails
    if (selectedMoonUrl !== moonUrl) {
      console.log("Attempting to load original moon model as fallback");
      loader.load(
        moonUrl,
        function (gltf) {
          moon1 = gltf.scene;
          moon1.scale.set(1, 1, 1);
          scene.add(moon1);
          modelsLoaded++;
          checkModelsLoaded();
        },
        undefined,
        function (error) {
          console.error("Error loading fallback moon model:", error);
        }
      );
    }
  }
);

// Load moon2 glTF model
loader.load(
  selectedMoonUrl,
  function (gltf) {
    moon2 = gltf.scene;
    moon2.scale.set(1, 1, 1);
    scene.add(moon2);
    modelsLoaded++;
    checkModelsLoaded();
  },
  function (xhr) {
    const percentLoaded = (xhr.loaded / xhr.total) * 100;
    console.log(`Loading second moon model: ${Math.round(percentLoaded)}% loaded`);
  },
  function (error) {
    console.error("Error loading second moon model:", error);
    // Fallback to original model if compressed fails
    if (selectedMoonUrl !== moonUrl) {
      console.log("Attempting to load original moon model as fallback");
      loader.load(
        moonUrl,
        function (gltf) {
          moon2 = gltf.scene;
          moon2.scale.set(1, 1, 1);
          scene.add(moon2);
          modelsLoaded++;
          checkModelsLoaded();
        },
        undefined,
        function (error) {
          console.error("Error loading fallback moon model:", error);
        }
      );
    }
  }
);

// Load astronaut glTF model
loader.load(
  selectedAstronautUrl,
  function (gltf) {
    astronaut = gltf.scene;
    astronaut.scale.set(1, 1, 1);
    scene.add(astronaut);
    modelsLoaded++;
    checkModelsLoaded();
  },
  function (xhr) {
    const percentLoaded = (xhr.loaded / xhr.total) * 100;
    console.log(`Loading astronaut model: ${Math.round(percentLoaded)}% loaded`);
  },
  function (error) {
    console.error("Error loading astronaut model:", error);
    // Fallback to original model if compressed fails
    if (selectedAstronautUrl !== astronautUrl) {
      console.log("Attempting to load original astronaut model as fallback");
      loader.load(
        astronautUrl,
        function (gltf) {
          astronaut = gltf.scene;
          astronaut.scale.set(1, 1, 1);
          scene.add(astronaut);
          modelsLoaded++;
          checkModelsLoaded();
        },
        undefined,
        function (error) {
          console.error("Error loading fallback astronaut model:", error);
        }
      );
    }
  }
);

// --------------------------
// 3. Orbital and astronaut Jump Parameters
// --------------------------
// Two-body orbit parameters.
const m1 = 5; // Mass for moon1
const m2 = 5; // Mass for moon2
let theta = 0; // orbital phase (true anomaly)
const p = 10; // semi‑latus rectum: controls overall orbit size
const e = 0.5; // eccentricity of the orbit

// astronaut jumping variables.
let astronautOnMoon1 = true; // Indicates which body the astronaut is attached to.
let isJumping = false;
let jumpProgress = 0; // Parameter from 0 to 1 representing jump progress.
let jumpStart, jumpTarget, jumpControl;
const jumpSpeed = 0.012; // Increased from 0.005 to make jump 3x faster
const jumpHeight = 12.5; // Slightly increased height for a more dramatic jump

// Add these variables near other state variables
let isRotating = false;
let rotationProgress = 0;
const rotationSpeed = 0.017; // Adjust for faster/slower rotation
let rotationStartQuaternion = new THREE.Quaternion();
let rotationEndQuaternion = new THREE.Quaternion();
let isLanding = false;  // Add this new state variable
let landingTimer = 0;   // Timer to control landing duration
const landingDuration = 1.0; // How long to stay in landing position (in seconds)

// Trigger the jump when Space is pressed.
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isJumping) {
    initiateAstronautJump();
  }
});
// Trigger the jump when the screen is tapped (mobile)
document.addEventListener("touchstart", (event) => {
  if (container.contains(event.target) && !isJumping) {
    initiateAstronautJump();
  }
});

function initiateAstronautJump() {
  if (!moon1 || !moon2 || !astronaut) return;
  isJumping = true;
  jumpProgress = 0;

  // Calculate approximate effective jump duration accounting for easing
  const jumpDuration = 0.9 / jumpSpeed;

  // Predict the future position of the target moon
  const futureTheta = theta + jumpDuration * 0.01;
  const futureR = p / (1 + e * Math.cos(futureTheta));
  const futureX = futureR * Math.cos(futureTheta);
  const futureZ = futureR * Math.sin(futureTheta);

  if (astronautOnMoon1) {
    jumpStart = astronaut.position.clone();
    // Calculate future position of moon2
    const futurePos = new THREE.Vector3(
      (-m1 / (m1 + m2)) * futureX,
      0,
      (-m1 / (m1 + m2)) * futureZ
    );
    futurePos.y += 3.7;
    futurePos.z += 1;
    futurePos.x += 1;

    jumpTarget = futurePos;
  } else {
    jumpStart = astronaut.position.clone();
    // Calculate future position of moon1
    const futurePos = new THREE.Vector3(
      (m2 / (m1 + m2)) * futureX,
      0,
      (m2 / (m1 + m2)) * futureZ
    );
    futurePos.y += 3.7;
    futurePos.z += 1;
    futurePos.x += 1;

    jumpTarget = futurePos;
  }

  // Define control point by taking the midpoint and adding a vertical offset
  jumpControl = jumpStart.clone().add(jumpTarget).multiplyScalar(0.5);
  jumpControl.y += jumpHeight;
}

// --------------------------
// 4. Animation Loop with Performance Optimizations
// --------------------------
let isWiggling = false;
let wiggleStartTime = 0;
const wiggleDuration = 0.8; // Duration in seconds
const wiggleFrequency = 15; // Higher = faster oscillation
const wiggleAmplitude = 0.5; // Higher = more intense wiggle

let lastTime = 0;
let frameCount = 0;
let frameTime = 0;

// Modify the animate function to include the wiggle effect and performance monitoring
function animate(timestamp) {
  requestAnimationFrame(animate);
  
  // Calculate delta time for consistent animation regardless of frame rate
  const deltaTime = lastTime ? (timestamp - lastTime) / 1000 : 0.016;
  lastTime = timestamp;
  
  // Performance monitoring
  frameCount++;
  frameTime += deltaTime;
  if (frameTime >= 1) {
    // console.log(`FPS: ${Math.round(frameCount / frameTime)}`);
    frameCount = 0;
    frameTime = 0;
  }

  const currentTime = performance.now() / 1000; // Current time in seconds

  // Update the orbital positions.
  const r = p / (1 + e * Math.cos(theta));
  const x = r * Math.cos(theta);
  const z = r * Math.sin(theta);
  const r1_factor = m2 / (m1 + m2);
  const r2_factor = m1 / (m1 + m2);

  // Calculate base positions (without wiggle)
  const moon1BasePosition = new THREE.Vector3(r1_factor * x, 0, r1_factor * z);
  const moon2BasePosition = new THREE.Vector3(
    -r2_factor * x,
    0,
    -r2_factor * z
  );

  // Apply wiggle effect if active
  if (isWiggling) {
    const elapsedWiggleTime = currentTime - wiggleStartTime;

    if (elapsedWiggleTime < wiggleDuration) {
      // Calculate wiggle offset using damped sine wave
      const dampingFactor = 1 - elapsedWiggleTime / wiggleDuration; // Decrease over time
      const wiggleOffset =
        Math.sin(elapsedWiggleTime * wiggleFrequency) *
        wiggleAmplitude *
        dampingFactor;

      // Apply wiggle to the landing moon
      if (astronautOnMoon1) {
        moon1BasePosition.y += wiggleOffset;
      } else {
        moon2BasePosition.y += wiggleOffset;
      }
    } else {
      isWiggling = false; // Turn off wiggling after duration elapsed
    }
  }

  // Set moon positions (now potentially including wiggle)
  if (moon1) moon1.position.copy(moon1BasePosition);
  if (moon2) moon2.position.copy(moon2BasePosition);

  theta += 0.01 * (deltaTime / 0.016); // Normalize to 60fps

  // Update the astronaut's position with easing.
  if (isJumping) {
    jumpProgress += jumpSpeed * (deltaTime / 0.016);
    let t = jumpProgress;

    if (jumpProgress >= 1) {
      jumpProgress = 1;
      isJumping = false;
      isLanding = true;  // Enter landing state
      landingTimer = 0;  // Reset timer
      astronautOnMoon1 = !astronautOnMoon1; // Toggle the attachment on landing

      // Start rotation after landing
      isRotating = true;
      rotationProgress = 0;

      // Store current rotation as starting point
      rotationStartQuaternion.copy(astronaut.quaternion);

      // Create a temporary object to get target rotation
      const targetDirection = astronautOnMoon1
        ? moon2.position.clone()
        : moon1.position.clone();
      const tempObject = new THREE.Object3D();
      tempObject.position.copy(astronaut.position);
      tempObject.lookAt(targetDirection);
      tempObject.rotateX(-Math.PI / 8); // Apply the same tilt
      rotationEndQuaternion.copy(tempObject.quaternion);

      // Trigger wiggle effect on landing
      isWiggling = true;
      wiggleStartTime = currentTime;
    }

    // Quadratic Bezier interpolation:
    // pos(t) = (1-t)²*jumpStart + 2(1-t)*t*jumpControl + t²*jumpTarget
    const oneMinusT = 1 - t;
    const jumpPos = new THREE.Vector3()
      .add(jumpStart.clone().multiplyScalar(oneMinusT * oneMinusT))
      .add(jumpControl.clone().multiplyScalar(2 * oneMinusT * t))
      .add(jumpTarget.clone().multiplyScalar(t * t));
    astronaut.position.copy(jumpPos);

    astronaut.lookAt(jumpTarget);
    astronaut.rotateX(-Math.PI / 12);
  } else {
    // While not jumping, the astronaut stays "attached" to its host body.
    if (astronaut) {
      if (astronautOnMoon1 && moon1) {
        astronaut.position.copy(moon1.position);
        if (isLanding) {
          astronaut.position.y += 3.5; // Lower value for landing
        } else {
          astronaut.position.y += 3.7; // Normal height
        }
        astronaut.position.z += 1;
        astronaut.position.x += 1;

        // Only do immediate lookAt if not in transition
        if (!isRotating) {
          astronaut.lookAt(moon2.position);
          astronaut.rotateX(-Math.PI / 8);
        }
      } else if (moon2) {
        astronaut.position.copy(moon2.position);
        if (isLanding) {
          astronaut.position.y += 3.5; // Lower value for landing
        } else {
          astronaut.position.y += 3.7; // Normal height
        }
        astronaut.position.z += 1;
        astronaut.position.x += 1;

        // Only do immediate lookAt if not in transition
        if (!isRotating) {
          astronaut.lookAt(moon1.position);
          astronaut.rotateX(-Math.PI / 8);
        }
      }

      // Handle rotation transition
      if (isRotating) {
        rotationProgress += rotationSpeed * (deltaTime / 0.016);
        if (rotationProgress >= 1) {
          rotationProgress = 1;
          isRotating = false;
        }

        // Use quaternion slerp for smooth rotation
        astronaut.quaternion.slerpQuaternions(
          rotationStartQuaternion,
          rotationEndQuaternion,
          rotationProgress
        );
      }
    }
  }

  // Update landing state timer
  if (isLanding) {
    landingTimer += deltaTime;
    if (landingTimer >= landingDuration) {
      isLanding = false;
    }
  }
    
  renderer.render(scene, camera);
  controls.update();
}

// Loading screen or indicator
const loadingElement = document.createElement('div');
loadingElement.style.position = 'absolute';
loadingElement.style.top = '50%';
loadingElement.style.left = '50%';
loadingElement.style.transform = 'translate(-50%, -50%)';
loadingElement.style.fontSize = '20px';
loadingElement.style.fontFamily = 'Arial, sans-serif';
loadingElement.textContent = 'Loading models...';
container.appendChild(loadingElement);

// Remove loading indicator when models are loaded
function removeLoadingIndicator() {
  if (loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
  }
}

// Modify checkModelsLoaded to remove loading indicator
const originalCheckModelsLoaded = checkModelsLoaded;
checkModelsLoaded = function() {
  if (modelsLoaded === 3) {
    removeLoadingIndicator();
    originalCheckModelsLoaded();
  }
};

// --------------------------
// 5. Handle Window Resize
// --------------------------
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  // Only update if container size has changed
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
}

// Function to detect connection speed and adjust quality accordingly
function detectConnectionAndAdjustQuality() {
  if (navigator.connection) {
    const connection = navigator.connection;
    
    // Log connection information
    console.log(`Connection type: ${connection.type}`);
    console.log(`Effective bandwidth: ${connection.downlink} Mbps`);
    console.log(`RTT: ${connection.rtt} ms`);
    console.log(`Save-Data enabled: ${connection.saveData}`);
    
    // Listen for connection changes
    connection.addEventListener('change', function() {
      console.log(`Connection changed. New effective bandwidth: ${connection.downlink} Mbps`);
      // Could implement dynamic quality adjustment here
    });
  }
}

// Call connection detection on startup
detectConnectionAndAdjustQuality();