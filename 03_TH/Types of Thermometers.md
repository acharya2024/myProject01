# Types of Thermometers (Optional Reading)

## Liquid Thermometer
The functioning of these thermometers is based on the principle of expansion of liquids on heating (e.g., mercury thermometer, alcohol thermometer). Mercury is preferably used in thermometers since it possesses low specific heat and high conductivity. The range of Hg thermometer is $-30^\circ \text{C}$ to $357^\circ \text{C}$.

## Gas Thermometer
These thermometers are based on Gay Lussac’s Law, according to which the temperature of the gas ($T$) is directly proportional to its pressure ($P$) at constant volume ($V$), i.e., $P \propto T$.

If $P_0$ is the pressure of the gas at $0^\circ \text{C}$, $P_{100}$ is the pressure of the gas at $100^\circ \text{C}$, and $P_t$ is the pressure of the gas at $t^\circ \text{C}$ (all at constant volume), then:

$
t = \left(\frac{P_t - P_0}{P_{100} - P_0}\right) \times 100^\circ \text{C}
$

Gas thermometers measure temperatures ranging from $-268^\circ \text{C}$ to $1500^\circ \text{C}$.

## Resistance Thermometers
These thermometers employ the variation of resistance of metals with the change in temperature. If $R_t$ and $R_0$ are the resistances of a metal at $t^\circ \text{C}$ and $0^\circ \text{C}$ respectively, then experimentally it has been checked that:

$
R_t = R_0 (1 + \alpha t)
$

where $\alpha$ is called the temperature coefficient of resistance and has the unit $\text{(°C)}^{-1}$ or $\text{K}^{-1}$.

Platinum is used in resistance thermometers as it has a high melting point, and its variation in resistance is uniform throughout the range $-200^\circ \text{C}$ to $1200^\circ \text{C}$. The unknown temperature $t$ is calculated from the equation:

$
t = \left(\frac{R_t - R_0}{R_{100} - R_0}\right) \times 100^\circ \text{C}
$

If $R_0$ is unknown, we calculate the resistance at two temperatures $t_1$ and $t_2$, and use:

$
R_1 = R_0 (1 + \alpha t_1) \quad (1)
$
$
R_2 = R_0 (1 + \alpha t_2) \quad (2)
$

From (1) and (2), dividing and rearranging:

$
\alpha = \frac{R_2 - R_1}{R_1 t_2 - R_2 t_1}
$

## Thermocouple Thermometers
These thermometers are based on the Seebeck effect. According to this effect, *when distinct metals are joined (called a thermocouple) and a temperature difference is maintained across its two junctions, an electromotive force (emf) is developed in the thermocouple*. This thermo-emf is a function of temperature:

$
\xi = At + Bt^2 \, \text{(in volts)}
$

where $A$ and $B$ are constants depending on the materials of the thermocouple. The range is $-200^\circ \text{C}$ to $1600^\circ \text{C}$ depending on the thermocouple.

## Total Radiation Pyrometers
Pyrometers measure high temperatures irrespective of the source's distance. These are based on Stefan’s Law, which states that *the radiant energy emitted per second per unit area ($E$) of a black body is proportional to the fourth power of absolute temperature ($T$)*:

$
E \propto T^4 \quad \Rightarrow \quad E = \sigma T^4
$

where $\sigma$ is Stefan’s constant with a value $5.67 \times 10^{-8} \, \text{W m}^{-2} \text{K}^{-4}$. The minimum measurable temperature is $800^\circ \text{C}$.

## Vapour Pressure Thermometer
This thermometer is based on the relationship between the saturated vapor pressure ($P$) of a liquid and its temperature ($T$):

$
\log P = a + bT - \frac{c}{T}
$

where $a$, $b$, and $c$ are constants, and $T$ is in absolute temperature. Using liquid helium, the minimum temperature measurable is $0.71 \, \text{K}$. For other liquids, temperatures up to $122 \, \text{K}$ can be measured.

## Magnetic Thermometer
This is used for measuring temperatures close to $0 \, \text{K}$.

---
---
# Critical and Boyle's Temperature
## Critical Temperature and Pressure (Tc)

Critical Temperature is the temperature below which a gas can be liquefied by increasing the pressure alone. The critical temperature is different for different gases, being 31 °C for $ \text{CO}_2 $, $-118$ °C for oxygen, $-240$ °C for hydrogen, and $-268$ °C for helium.

The minimum pressure required to liquefy a gas at critical temperature is called **critical pressure** ($P_c$). Lesser is the critical temperature, lesser is the critical pressure, being 72.8 atm for $ \text{CO}_2 $ and 2.26 atm for helium. The values of critical temperature, critical pressure, and critical volume are:

$
T_c = \frac{8a}{27Rb}, \quad P_c = \frac{a}{27b^2}, \quad V_c = 3b
$

---

## Boyle Temperature ($T_B$)

The Boyle temperature is that temperature:

- (a) Below which the product $PV$ first decreases, becomes minimum, and then increases with an increase of pressure $P$.
- (b) Above which the product $PV$ increases with an increase of pressure $P$.

So, Boyle temperature is:

$
T_B = \frac{a}{Rb}
$

Since:

$
T_c = \frac{8a}{27Rb},
$

we have:

$
T_B = \frac{27}{8} T_c
$

--- 

# Second Law of Thermodynamics

The **Second Law of Thermodynamics** has several equivalent forms or statements, each describing different aspects of the same principle. These include the **Kelvin-Planck**, **Clausius**, and other interpretations. Below are the commonly accepted forms:

---

### 1. **Kelvin-Planck Statement**
This statement focuses on the impossibility of a perfect heat engine:

**"It is impossible to construct a heat engine that operates in a cycle and produces no effect other than the absorption of heat from a single reservoir and the performance of an equivalent amount of work."**

- Implication: No engine can convert all the heat absorbed into work; there will always be some heat rejected to a lower temperature reservoir.

---

### 2. **Clausius Statement**
This statement addresses the impossibility of a perfect refrigerator:

**"It is impossible to construct a device that operates in a cycle and transfers heat from a colder body to a hotter body without the input of external work."**

- Implication: Heat cannot flow spontaneously from a colder region to a hotter region; external energy is required to transfer heat against the natural gradient.

---

### 3. **Entropy Statement**
This is a more general and mathematical interpretation:

**"The entropy of an isolated system never decreases. It either increases until equilibrium is reached or remains constant if the system is at equilibrium."**

- Implication: Natural processes are irreversible, and the entropy of the universe always increases.

---

### 4. **Perpetual Motion Machine of the Second Kind (PMM-2)**
This statement rejects the possibility of a particular kind of perpetual motion machine:

**"A perpetual motion machine of the second kind, which extracts heat from a reservoir and converts it completely into work, is impossible."**

- Implication: Some energy will always be lost to the surroundings, and 100% efficiency cannot be achieved.

---

### 5. **Heat Engine and Heat Pump Relationship**
This form relates heat engines and heat pumps:

**"In any cyclic process, the total amount of heat absorbed from the reservoirs will always be greater than or equal to the work done."**

- Implication: For a heat engine:
  \[
  W \leq Q_H - Q_C
  \]
  For a heat pump or refrigerator:
  \[
  W \geq Q_C - Q_H
  \]

---

### 6. **Natural Processes Statement**
This form focuses on the irreversibility of natural processes:

**"Heat flows naturally from a higher-temperature body to a lower-temperature body, and not in the reverse direction without external work being done."**

- Implication: This aligns with the Clausius statement and highlights the directionality of spontaneous processes.

---

### 7. **Carathéodory’s Statement**
This is a more abstract formulation:

**"In the neighborhood of any equilibrium state of a thermodynamic system, there exist states that are inaccessible by any adiabatic process."**

- Implication: It is impossible to reach certain thermodynamic states through purely adiabatic (no heat exchange) processes.

---

### 8. **Universal Increase of Entropy**
A more philosophical form:

**"All natural processes proceed in such a way that the entropy of the universe increases."**

- Implication: This form emphasizes the direction of time and irreversibility.

---

### Relationships Between Statements
- **Equivalence**: All these statements are logically equivalent. If one is proven false, all others are false.
- **Applications**: Each form is suited for specific scenarios, such as heat engines, refrigerators, or entropy-related processes.

By understanding these statements, the Second Law of Thermodynamics can be applied across various areas of thermodynamics and energy transfer.