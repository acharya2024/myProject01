Certainly! Below is the complete code for the **doPhysics.in** website as per your specifications. The website includes the landing page (`index.html`), the learning page (`learn.html`), the practice page (`practice.html`), and the activities page (`activities.html`). The CSS styles are provided in a separate `styles.css` file located in the `css/` directory. The JavaScript functionality is minimal and included where necessary.

---

### **Folder Structure:**

```
doPhysics/
├── index.html
├── learn.html
├── practice.html
├── activities.html
├── css/
│   └── styles.css
├── js/
│   └── script.js (if needed)
└── assets/
    ├── images/
    │   └── (logo and other images)
    └── (other media assets)
```

---

### **Shared CSS (`css/styles.css`):**

```css
/* General Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #f8f9fa;
    font-family: 'Roboto', sans-serif;
    color: #333;
}

/* Container */
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
}

/* Header */
header {
    background-color: #ffffff;
    padding: 20px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header .logo {
    font-size: 2em;
    font-weight: bold;
    color: #007bff;
    text-align: center;
}

header .tagline {
    font-size: 1.2em;
    color: #6c757d;
    text-align: center;
    margin-top: 10px;
}

/* Navigation */
nav {
    background-color: #ffffff;
    padding: 10px 0;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    color: #007bff;
    text-decoration: none;
    font-size: 1.1em;
    transition: color 0.3s ease;
}

nav ul li a:hover {
    color: #0056b3;
}

/* Button Styles */
.button {
    display: inline-block;
    padding: 15px 30px;
    margin: 20px 10px;
    border-radius: 50px;
    background: linear-gradient(225deg, #f0f0f0, #cacaca);
    box-shadow: -13px 13px 32px #a6a6a6, 13px -13px 32px #ffffff;
    color: #333;
    text-decoration: none;
    font-size: 1em;
    transition: all 0.3s ease;
}

.button:active {
    background: linear-gradient(225deg, #cacaca, #f0f0f0);
    box-shadow: -5px 5px 10px #a6a6a6, 5px -5px 10px #ffffff;
}

/* Landing Page */
.landing {
    text-align: center;
    padding: 100px 20px;
}

.landing .cta-buttons {
    margin-top: 40px;
}

/* Units and Chapters */
.unit-card {
    background-color: #ffffff;
    border-radius: 10px;
    margin: 20px 0;
    padding: 20px;
    transition: box-shadow 0.3s ease;
}

.unit-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.unit-card h2 {
    margin-bottom: 15px;
    color: #007bff;
}

.chapter-list {
    list-style: none;
    padding-left: 20px;
}

.chapter-list li {
    margin: 10px 0;
}

.chapter-list a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s ease;
}

.chapter-list a:hover {
    color: #007bff;
}

/* Practice Page */
.exercise-group {
    margin: 30px 0;
}

.exercise-group h2 {
    color: #007bff;
    margin-bottom: 15px;
}

.exercise-options {
    list-style: none;
    padding-left: 0;
}

.exercise-options li {
    margin: 10px 0;
}

.exercise-options a {
    display: block;
    padding: 10px 15px;
    background-color: #ffffff;
    border: 2px solid #007bff;
    border-radius: 5px;
    color: #007bff;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.exercise-options a:hover {
    background-color: #007bff;
    color: #ffffff;
}

/* Activities Page */
.activity-module {
    background-color: #ffffff;
    border-radius: 10px;
    margin: 20px 0;
    padding: 20px;
    transition: box-shadow 0.3s ease;
}

.activity-module:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.activity-module h3 {
    color: #007bff;
    margin-bottom: 10px;
}

.activity-module p {
    color: #555;
}

/* Footer */
footer {
    background-color: #ffffff;
    padding: 20px 0;
    text-align: center;
    color: #6c757d;
    margin-top: 40px;
}

/* Responsive Design */
@media (max-width: 768px) {
    nav ul {
        flex-direction: column;
    }

    .button {
        margin: 10px auto;
    }
}
```

---

### **Landing Page (`index.html`):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>doPhysics.in | Welcome</title>
    <meta name="description" content="To learn physics you must doPhysics.">
    <meta name="keywords" content="Physics, Learning, Education, doPhysics">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="logo">doPhysics.in</div>
            <div class="tagline">To learn physics you must doPhysics.</div>
        </div>
    </header>

    <!-- Navigation -->
    <nav>
        <ul>
            <li><a href="learn.html">Learn</a></li>
            <li><a href="practice.html">Practice</a></li>
            <li><a href="activities.html">Activities</a></li>
        </ul>
    </nav>

    <!-- Landing Section -->
    <section class="landing">
        <div class="container">
            <div class="cta-buttons">
                <a href="learn.html" class="button">Learn</a>
                <a href="practice.html" class="button">Practice</a>
                <a href="activities.html" class="button">Activities</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            &copy; 2023 doPhysics.in. All rights reserved.
        </div>
    </footer>

</body>
</html>
```

---

### **Learning Page (`learn.html`):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>doPhysics.in | Learn</title>
    <meta name="description" content="Comprehensive physics theory and concepts.">
    <meta name="keywords" content="Physics, Learning, Education, Theory">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="logo">doPhysics.in</div>
            <div class="tagline">Enhance outcome-based learning.</div>
        </div>
    </header>

    <!-- Navigation -->
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="practice.html">Practice</a></li>
            <li><a href="activities.html">Activities</a></li>
        </ul>
    </nav>

    <!-- Main Content -->
    <main>
        <div class="container">
            <!-- Unit Cards -->
            <div class="unit-card">
                <h2>Mechanics</h2>
                <details>
                    <summary>Chapters</summary>
                    <ul class="chapter-list">
                        <li><a href="theory/mechanics/chapter1.html">Kinematics</a></li>
                        <li><a href="theory/mechanics/chapter2.html">Dynamics</a></li>
                        <!-- Add more chapters as needed -->
                    </ul>
                </details>
            </div>

            <div class="unit-card">
                <h2>Electrodynamics</h2>
                <details>
                    <summary>Chapters</summary>
                    <ul class="chapter-list">
                        <li><a href="theory/electrodynamics/chapter1.html">Electric Fields</a></li>
                        <li><a href="theory/electrodynamics/chapter2.html">Magnetic Fields</a></li>
                        <!-- Add more chapters as needed -->
                    </ul>
                </details>
            </div>

            <!-- Add more units as needed -->
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            &copy; 2023 doPhysics.in. All rights reserved.
        </div>
    </footer>

</body>
</html>
```

---

### **Practice Page (`practice.html`):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>doPhysics.in | Practice</title>
    <meta name="description" content="Practice physics exercises to enhance understanding.">
    <meta name="keywords" content="Physics, Practice, Exercises, Education">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="logo">doPhysics.in</div>
            <div class="tagline">Only learning-based platform to learn physics.</div>
        </div>
    </header>

    <!-- Navigation -->
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="learn.html">Learn</a></li>
            <li><a href="activities.html">Activities</a></li>
        </ul>
    </nav>

    <!-- Main Content -->
    <main>
        <div class="container">
            <!-- Exercise Groups -->
            <div class="exercise-group">
                <h2>Mechanics</h2>
                <ul class="exercise-options">
                    <li><a href="exercises/mechanics/exercise1.html">Exercise 1</a></li>
                    <li><a href="exercises/mechanics/exercise2.html">Exercise 2</a></li>
                    <!-- Add more exercises as needed -->
                </ul>
            </div>

            <div class="exercise-group">
                <h2>Electrodynamics</h2>
                <ul class="exercise-options">
                    <li><a href="exercises/electrodynamics/exercise1.html">Exercise 1</a></li>
                    <li><a href="exercises/electrodynamics/exercise2.html">Exercise 2</a></li>
                    <!-- Add more exercises as needed -->
                </ul>
            </div>

            <!-- Add more units and exercises as needed -->
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            &copy; 2023 doPhysics.in. All rights reserved.
        </div>
    </footer>

</body>
</html>
```

---

### **Activities Page (`activities.html`):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>doPhysics.in | Activities</title>
    <meta name="description" content="Interactive physics activities and simulations.">
    <meta name="keywords" content="Physics, Activities, Simulations, Education">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="logo">doPhysics.in</div>
            <div class="tagline">Enhance outcome-based learning.</div>
        </div>
    </header>

    <!-- Navigation -->
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="learn.html">Learn</a></li>
            <li><a href="practice.html">Practice</a></li>
        </ul>
    </nav>

    <!-- Main Content -->
    <main>
        <div class="container">
            <!-- Activity Modules -->
            <div class="activity-module">
                <h3>Simple Harmonic Motion Simulator</h3>
                <p>Adjust the mass of an oscillating block and observe changes in its time period.</p>
                <a href="activities/shm.html" class="button">Start Activity</a>
            </div>

            <div class="activity-module">
                <h3>Photoelectric Effect Experiment</h3>
                <p>Vary retarding voltage to see how photocurrent changes.</p>
                <a href="activities/photoelectric.html" class="button">Start Activity</a>
            </div>

            <!-- Add more activities as needed -->
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            &copy; 2023 doPhysics.in. All rights reserved.
        </div>
    </footer>

</body>
</html>
```

---

### **Notes and Instructions:**

1. **Interactivity:**
   - The theory chapters and exercises are linked to HTML pages that need to be created with the specific content.
   - For the activities, you can use JavaScript and HTML5 Canvas or libraries like p5.js to create interactive simulations.

2. **Assets:**
   - Place all images, diagrams, and media files in the `assets/` directory.
   - Ensure all images have appropriate `alt` text for accessibility.

3. **Accessibility:**
   - All pages use semantic HTML tags.
   - Links and buttons are designed for keyboard navigation.
   - Text has sufficient contrast with the background.

4. **Responsive Design:**
   - The CSS includes media queries to adjust the layout for smaller screens.
   - Test the website on different devices to ensure it displays correctly.

5. **Performance Optimization:**
   - Minify CSS and JavaScript files before deployment.
   - Optimize images using appropriate formats and compression.

6. **SEO Best Practices:**
   - Meta tags are included in each HTML file.
   - Use descriptive titles and headings.

7. **Future Enhancements:**
   - User authentication and progress tracking can be added later.
   - Discussion forums or comment sections can be implemented in the future.

---

### **Example of an Interactive Activity (`activities/shm.html`):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Harmonic Motion Simulator</title>
    <meta name="description" content="Adjust the mass of an oscillating block and observe changes in its time period.">
    <meta name="keywords" content="Physics, SHM, Simulation, Education">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSS -->
    <link rel="stylesheet" href="../css/styles.css">
    <!-- p5.js Library -->
    <script src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js"></script>
</head>
<body>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="logo">doPhysics.in</div>
            <div class="tagline">Interactive Physics Activity</div>
        </div>
    </header>

    <!-- Main Content -->
    <main>
        <div class="container">
            <h2>Simple Harmonic Motion Simulator</h2>
            <p>Use the slider to adjust the mass of the block and observe how the time period changes.</p>
            <div id="sketch-holder"></div>
            <label for="massSlider">Mass (kg): </label>
            <input type="range" id="massSlider" min="1" max="10" value="1" step="0.1" oninput="updateMass(this.value)">
            <span id="massValue">1 kg</span>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            &copy; 2023 doPhysics.in. All rights reserved.
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        let mass = 1;
        let timePeriod;
        let angle = 0;

        function updateMass(value) {
            mass = parseFloat(value);
            document.getElementById('massValue').textContent = mass + ' kg';
            timePeriod = 2 * Math.PI * Math.sqrt(mass / 10); // Assuming k = 10 N/m
        }

        function setup() {
            let canvas = createCanvas(600, 400);
            canvas.parent('sketch-holder');
            updateMass(1);
        }

        function draw() {
            background(240);
            translate(width / 2, height / 2);

            // Calculate position
            let x = 100 * sin(angle);

            // Draw the block
            fill(100, 150, 255);
            rectMode(CENTER);
            rect(x, 0, 50, 50);

            // Update angle
            angle += (2 * Math.PI / (60 * timePeriod)); // 60 FPS

            // Display time period
            fill(0);
            noStroke();
            textSize(16);
            textAlign(CENTER);
            text('Time Period: ' + timePeriod.toFixed(2) + ' s', 0, -150);
        }
    </script>

</body>
</html>
```

---

### **Final Remarks:**

- Replace placeholder content (e.g., chapters, exercises) with actual content as it becomes available.
- Ensure all internal links point to the correct files.
- The interactive activity provided is a basic example using p5.js. You can enhance it or create more complex simulations as needed.
- Regularly test the website to fix any issues and improve user experience.

---

By following this structure and using the provided code, you can build the **doPhysics.in** website as per your requirements. Feel free to customize and expand upon this foundation to create a comprehensive and engaging learning platform for students studying physics.