### **Effect of Finite Mass of Nucleus**

In Bohr's original model of the hydrogen atom, the nucleus is considered to be infinitely massive compared to the electron. This approximation simplifies the calculations by allowing the nucleus to remain stationary while the electron orbits around it. However, in reality, the nucleus possesses a finite mass and thus cannot be treated as an immovable point. Both the nucleus and the electron experience mutual gravitational and electromagnetic attractions, causing them to accelerate towards each other. Consequently, they both revolve around a common center of mass (also known as the barycenter), which remains stationary if no external forces act upon the system.

#### **Center of Mass Motion**

The concept of the center of mass is fundamental in understanding the dynamics of two-body systems like the electron-nucleus pair in an atom. The center of mass ($ R $) of the system is defined by the equation:

$$
R = \frac{m r_e + M r_n}{m + M}
$$

where:
- $ m $ is the mass of the electron,
- $ M $ is the mass of the nucleus,
- $ r_e $ is the position vector of the electron,
- $ r_n $ is the position vector of the nucleus.

In the absence of external forces, the center of mass remains at rest or moves with a constant velocity. This implies that both the electron and the nucleus orbit this fixed point, each with their respective velocities and radii inversely proportional to their masses.

#### **Introduction of Reduced Mass ($ \mu $)**

To account for the finite mass of the nucleus, Bohr's quantization condition is modified by introducing the **reduced mass** ($ \mu $). The reduced mass effectively allows us to treat the two-body problem as a single-body problem by considering the motion relative to the center of mass. The reduced mass is given by:

$$
\mu = \frac{m M}{m + M}
$$

where:
- $ \mu $ is the reduced mass,
- $ m $ is the mass of the electron,
- $ M $ is the mass of the nucleus.

Since $ M $ is typically much larger than $ m $ (for hydrogen, $ M $ is approximately $ 1836 $ times $ m $), the reduced mass $ \mu $ is slightly less than the electron mass $ m $. This slight reduction has important implications for the calculated values of the electron's orbit radius and energy levels.

#### **Impact on Radius and Energy Levels**

1. **Radius ($ r_n $)**:
   
   The radius of the $ n $-th orbit in Bohr's model is originally given by:

   $$
   r_n = \frac{n^2 h^2}{4 \pi^2 m e^2}
   $$

   Incorporating the reduced mass:

   $$
   r_n = \frac{n^2 h^2}{4 \pi^2 \mu e^2}
   $$

   Since $ \mu < m $, the corrected radius $ r_n $ becomes slightly larger than the radius calculated assuming an infinite nuclear mass.

2. **Energy Levels ($ E_n $)**:
   
   The energy of the electron in the $ n $-th orbit is initially:

   $$
   E_n = -\frac{m e^4}{8 \epsilon_0^2 h^2 n^2}
   $$

   With the introduction of reduced mass:

   $$
   E_n = -\frac{\mu e^4}{8 \epsilon_0^2 h^2 n^2}
   $$

   This correction results in a slightly more negative (i.e., lower) energy level, indicating a more tightly bound electron than previously calculated.

#### **Numerical Example for Hydrogen Atom**

For the hydrogen atom ($ M \approx 1836 \, m $), the reduced mass is approximately:

$$
\mu \approx \frac{m \times 1836 m}{m + 1836 m} = \frac{1836 m^2}{1837 m} \approx 0.99946 \, m
$$

This value shows that the reduced mass is only marginally less than the electron mass, resulting in very slight adjustments to the calculated radii and energy levels. However, for heavier elements where $ M $ is significantly larger, the effect of the reduced mass becomes even less pronounced.

### **Drawbacks of Bohr's Model**

Despite its groundbreaking success in explaining the spectral lines of hydrogen, Bohr's model exhibits several significant limitations that prevent it from accurately describing more complex atomic systems and phenomena. Below are the primary drawbacks of Bohr's model:

1. **Inability to Explain Multi-Electron Atoms**:
   
   - **Limitation**: Bohr's model was specifically tailored for hydrogen-like atoms, which contain only one electron. Extending the model to atoms with multiple electrons introduces complexities due to electron-electron interactions that Bohr's framework cannot accommodate.
   
   - **Implication**: The model fails to predict the correct energy levels and spectral lines for elements beyond hydrogen, rendering it ineffective for understanding the behavior of heavier and more complex atoms.

2. **Failure to Account for Fine Structure and Spectral Line Splitting**:
   
   - **Limitation**: Experimental observations reveal that spectral lines are not single, sharp lines but exhibit fine structure—small splittings and shifts. Bohr's model does not account for these fine details.
   
   - **Implication**: The inability to explain fine structure implies that Bohr's model overlooks relativistic effects and spin-orbit coupling, which are essential for a comprehensive understanding of atomic spectra.

3. **Violation of the Heisenberg Uncertainty Principle**:
   
   - **Limitation**: According to the Heisenberg Uncertainty Principle, it is impossible to simultaneously know both the exact position and momentum of a particle with arbitrary precision. Bohr's model assumes well-defined orbits with precise radii and velocities, implying exact knowledge of both position and momentum.
   
   - **Implication**: This fundamental inconsistency indicates that Bohr's model is incompatible with the principles of quantum mechanics, highlighting its inability to fully describe the probabilistic nature of electrons.

4. **Inability to Explain the Zeeman Effect**:
   
   - **Limitation**: The Zeeman effect involves the splitting of spectral lines in the presence of a magnetic field. Bohr's model does not provide a mechanism to account for how external magnetic fields influence atomic energy levels and lead to spectral line splitting.
   
   - **Implication**: The model's failure to explain the Zeeman effect underscores its inadequacy in addressing interactions between atoms and external fields, limiting its applicability in broader physical contexts.

5. **Lack of Wave-Particle Duality Integration**:
   
   - **Limitation**: Bohr's model treats electrons purely as particles orbiting the nucleus, without incorporating their wave-like properties. The model does not integrate the dual nature of electrons, which is central to modern quantum mechanics.
   
   - **Implication**: Ignoring wave-particle duality prevents the model from explaining phenomena such as electron diffraction and interference, which are pivotal in understanding quantum behavior.

6. **No Explanation for Chemical Behavior and Periodicity**:
   
   - **Limitation**: Bohr's model does not provide insights into the chemical properties of elements or the periodic table's structure. It focuses solely on the physical aspects of atomic spectra without addressing how electrons influence chemical bonding and reactivity.
   
   - **Implication**: The inability to connect atomic structure with chemical behavior limits the model's usefulness in chemistry and materials science.

7. **No Predictive Power for Transition Probabilities**:
   
   - **Limitation**: While Bohr's model can predict the energy levels of electrons, it does not offer a framework for calculating the probabilities of transitions between these levels or the intensities of spectral lines.
   
   - **Implication**: This shortfall restricts the model's ability to make quantitative predictions about atomic processes, which is essential for applications in spectroscopy and quantum optics.

### **Conclusion**

Bohr's model represents a significant milestone in the development of atomic physics by introducing the concept of quantized energy levels and successfully explaining the hydrogen atom's spectral lines. However, its numerous limitations—ranging from the inability to handle multi-electron systems to its fundamental inconsistency with the uncertainty principle—highlight the necessity for more advanced theories. The advent of quantum mechanics, with its wavefunction-based approach and probabilistic interpretation, addresses these shortcomings, providing a more accurate and comprehensive framework for understanding atomic and subatomic phenomena.