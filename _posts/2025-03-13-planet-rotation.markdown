---
layout: blog-post
title:  "How planet rotation works in my animation"
author: Dario Haxhiraj
date:   2025-03-13 18:13:33 +0100
categories: threejs tutorial planet rotation
excerpt: "Learn how to make planets rotating around each other"
permalink: /blog/:title
---

This article explains how I implemented planet (celestial body) rotation in my [Three.js](https://threejs.org/) animation. The animation features two orbiting moons and an astronaut that can jump between them. The moons rotate around a shared center of mass, and their positions are calculated using the following [orbital mechanics](https://en.wikipedia.org/wiki/Orbital_mechanics#Calculating_trajectories) equation:

$$
  [ r = \frac{p}{1 + e \cdot \cos(\theta)} ]
$$

Where:

- ( r ): The distance of the moon from the center of mass.
- ( p ): The semi-latus rectum, which controls the size of the orbit.
- ( e ): The eccentricity of the orbit, which determines how elliptical the orbit is.
- ( $$\theta$$ ): The orbital phase (true anomaly), which changes over time to simulate rotation.

This equation is used to calculate the position of each moon in its orbit, creating a realistic rotational effect. The astronaut dynamically interacts with these moons, jumping between them based on user input.

## The Basics of Orbital Motion

The rotation of the planets in this animation is based on the concept of orbital mechanics. Each moon orbits around a shared center of mass, which is determined by their relative masses. The heavier a moon is, the closer the center of mass will be to it. This creates a realistic orbital effect where both moons move in elliptical paths.

### Calculating Orbital Positions

The positions of the moons are calculated using the following equations:

1. **Radius (`r`)**:
   ```javascript
   const r = p / (1 + e * Math.cos(theta));
   ```
   This calculates the distance of the moons from the center of mass based on the current orbital phase $$\theta$$(`theta`).

2. **X and Z Coordinates**:
   ```javascript
   const x = r * Math.cos(theta);
   const z = r * Math.sin(theta);
   ```
   These equations calculate the 2D position of the moons in the orbital plane.

3. **Center of Mass Adjustment**:
   Each moon’s position is adjusted based on its distance from the center of mass:
   ```javascript
   const r1_factor = m2 / (m1 + m2);
   const r2_factor = m1 / (m1 + m2);

   const moon1BasePosition = new THREE.Vector3(r1_factor * x, 0, r1_factor * z);
   const moon2BasePosition = new THREE.Vector3(-r2_factor * x, 0, -r2_factor * z);
   ```

   - `moon1BasePosition` and `moon2BasePosition` represent the positions of the two moons relative to the center of mass.

---

## Adding Realism with Wiggle Effects

To make the animation more dynamic, I added a "wiggle" effect to the moons when the astronaut lands on them. This simulates the impact of the astronaut’s jump and adds a subtle bounce to the moon’s position.

### Wiggle Effect Implementation

The wiggle effect is implemented using a damped sine wave. Here’s how it works:

**Wiggle Offset**:
   The vertical position of the moon is adjusted using a sine wave:
   ```javascript
   const wiggleOffset =
     Math.sin(elapsedWiggleTime * wiggleFrequency) *
     wiggleAmplitude *
     dampingFactor;
   ```

   - `wiggleFrequency`: Controls how fast the moon oscillates.
   - `wiggleAmplitude`: Controls the intensity of the bounce.
   - `dampingFactor`: Gradually reduces the amplitude over time to simulate the bounce settling down.

**Applying the Wiggle**:
   The wiggle offset is added to the moon’s vertical position:
   ```javascript
   moon1BasePosition.y += wiggleOffset;
   ```

---

## Updating the Orbital Motion

The orbital motion is updated in the animation loop. The `theta` value is incremented on each frame to move the moons along their orbits:

```javascript
theta += 0.01;
```

This creates a smooth rotation effect as the moons continuously update their positions.

---

## Rendering the Scene

Finally, the updated positions of the moons are applied to their respective Three.js objects, and the scene is rendered:

```javascript
if (moon1) moon1.position.copy(moon1BasePosition);
if (moon2) moon2.position.copy(moon2BasePosition);

renderer.render(scene, camera);
```

---

## Conclusion

The planet rotation in this animation is achieved by combining basic orbital mechanics with Three.js’s powerful rendering capabilities. By calculating the positions of the moons based on their masses and orbital parameters, I was able to create a realistic and visually engaging animation. The addition of wiggle effects further enhances the realism, making the animation feel more dynamic and interactive.

If you have any questions about the implementation or want to learn more about Three.js, feel free to reach out!