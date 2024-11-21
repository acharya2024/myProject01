# Atomic Structure

## Activity 01: Wave nature of electron in Bohr's orbit

### Aim

- Explain Bohr's postulates using wavefunction model of electron
- To show the circumference as integral multiple of De Broglie wavelength of electron in its orbit

### Input take from user
- Quantum state \(n\) of electron in the Hydrogen atom (only upto n=4)
- To include imaginary part of wavefunction or not (Yes/no or toggle button)
- To animate or not

### Output display
- Draw a circle (of changable radius r) for reference to plot the graph on the circumference
- Real part of wave (which is a standing wave) to be plotted on circumference
    - assuming it to be sinosoidal function
    - of wavelength equal to circumference (or 1/n of circumference)
    - Amplitude of oscillation depends on theta, the angular position from center

- Imaginary part of wave (which is a standing wave) to be plotted on circumference
    - assuming it to be cos theta function
    - of wavelength equal to circumference (or 1/n of circumference)
    - Amplitude of oscillation depends on theta, the angular position from center (with a phase difference of 90 degrees)
    - Such that modulus of amplitude remains constant at all places on circumference


### Animation part
- With passage of time the graph should oscillate between inside of circumference (half of wavelength) and outside of circumference
- The frequency should be 

### User input controls effects
- If n is changed by user, a new diagram/animation with
    - radius of atom becomes n^2 times ground state radius
    - Wavelength of n times of ground state wavelength
- If imaginary part of wave function to be shown, then only it should be shown with some different colour oscillating with same frequency.




### Prompt for Coding the Photoelectric Effect Simulation

**Objective**: Develop an interactive simulation of the photoelectric effect to visualize how changing frequency, intensity, and retarding voltage affects electron emission and current.

#### Structure

1. **Inputs from the User**:
   - **Metal Selection**:
     - Create a slider to select metals with different work functions. The slider should display the name and work function dynamically (e.g., "Cesium (5.1 eV)").
     - Metal selection should limit itself to metals that exhibit photoemission under visible light frequencies.
   - **Frequency Slider**:
     - Add a frequency slider that adjusts the color of the incident light beam dynamically according to the selected frequency. The frequency should cover the visible light spectrum, from red to violet.
     - Set discrete frequency ranges corresponding to visible light colors (e.g., Red, Orange, Yellow, etc.), with each color label changing according to frequency bands.
   - **Intensity Slider**:
     - Include an intensity slider with dynamic labels indicating the intensity level (e.g., "1 Bulb," "10 Bulbs," "30 Bulbs").
     - As the intensity increases, adjust the opacity of the light beam on the canvas to reflect the intensity change.
   - **Retarding Voltage Slider**:
     - Add a slider to adjust retarding voltage, with a dynamic label showing the voltage value. This should affect electron movement and deceleration proportionally.

2. **Output Display**:
   - **Photoelectric Setup**:
     - Draw two parallel plates on the canvas representing the emitter and collector. Position them with ample separation to allow for clear visualization of electron movement.
   - **Incident Light Beam**:
     - Represent the incident light beam as a thick line approaching the emitter at a 45-degree angle.
     - Make the color of the light beam dynamic to match the selected frequency and intensity level (via opacity).
   - **Electron Emission Animation**:
     - Display electron emission from random points on the emitter plate.
     - The electrons should appear as small circles and travel toward the collector with initial velocity depending on the frequency.
     - Electrons should have a variable velocity, randomized within a range determined by the incident frequency. Higher frequencies should result in a wider velocity range.
   - **Ammeter Display for Current**:
     - Add a digital ammeter that shows photocurrent in response to the number of electrons reaching the collector.
     - Current values should change in real-time as the intensity of incident light changes. The ammeter reading should be proportional to the emitted electron count, providing immediate feedback as user parameters change.

3. **Animations**:
   - **Electron Movement**:
     - Emit electrons from the emitter plate with random velocities, determined by the incident frequency. Apply retarding voltage to influence electron movement and deceleration.
     - If the retarding voltage is sufficiently high, electrons should decelerate, reverse direction, or fail to reach the collector, resulting in zero current.
   - **Current Reading**:
     - Update the digital ammeter’s display to reflect the changing intensity of the light source. More electrons should lead to a higher current reading.
   - **Visual Feedback for Frequency and Intensity**:
     - The incident light color and transparency should change based on the user-selected frequency and intensity values. Higher intensities produce a less transparent beam, while different frequencies adjust the beam color according to the visible spectrum.

4. **Controls**:
   - **Frequency Adjustment**:
     - Ensure that adjusting the frequency slider changes the color of the light beam dynamically across the visible spectrum, with labels like "Red," "Green," "Blue," etc.
   - **Intensity Adjustment**:
     - The intensity slider should directly affect the opacity of the light beam, with higher intensity creating a more opaque beam.
   - **Voltage Adjustment**:
     - The retarding voltage should modify the velocity and trajectory of emitted electrons. High retarding voltage should reduce or stop electron flow, decreasing the current to zero on the ammeter.

#### Additional Considerations
   - Ensure all labels update dynamically as sliders are adjusted, and use smoothing effects on the ammeter reading for realism.
   - Implement real-time feedback for each input, with sliders updating output displays immediately.




## Activity 03: Building a nucleus
### Aim: To illustrate formation of stable nucleus and ways in which it decays to achieve stability

### Controls
- Number of protons can be increased by 1 using a button
- Number of neutron can be increased by 1 using a button
- If nucleus is unstable, another button "Make it stable" activates (else its "Already stable"). Pressing the button shows the decay process in animation and nucleus becomes unstable (vibration mode on) to stable (vibration mode off).

### Display
- The nucleus
  - Protons(red spheres) and Neutrons (blue spheres) combining together or stuck together to form the nucleus
- The stability
  - If stable, no vibration of the nucleus
  - If unstable, the nucleus should be vibrating