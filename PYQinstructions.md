
**Objective:**  
Develop a comprehensive question bank [which has to be previously asked JEE Advanced questions] for students preparing for JEE Advanced, focusing on those who have qualified JEE Mains with a percentile of 98 and above.

---

### **Workflow:**

1. **Input Data:**
   - A PDF of question paper with solution will be uploaded, containing questions and their respective solutions.
   - Each question must be translated into a structured JSON format as outlined below.

2. **JSON Format Details:**  
   For every question, the JSON format must include the following fields (Assuming I upload a pdf of JEE Advanced Physics paper):

   ```json
   {
       "questions": [
           {
               "id": "Unique identifier for the question (e.g., JEEA-2021-PHY-001, JEEA-2021-PHY-002, etc.)",
               "title":"[2021]title of the question",
               "statistics": {
                   "numberOfDiagrams": "The number of diagrams used in the question (if any)",
                   "idealAverageTimeInS": "Ideal time for solving the question in seconds",
                   "Unit": "The physics unit or topic (e.g., Modern Physics, Mechanics, etc.)",
                   "tags": [
                       "Tag 1: Category or key concept (e.g., Photoelectric effect, Mean free path, etc.)",
                       "Tag 2: Another category or relevant concept",
                       "Tag 3: Another relevant category or sub-concept"
                   ]
               },
               "type": "Type of question (e.g., Subjective, Single Correct, Multiple Correct, etc.)",
               "questionText": "Complete text of the question as written in the image.",
               "solution": "Detailed explanation and solution of the question (step-by-step).",
               "solutionRechecked": true, 
               "solutionManualRechecked": false, 
               "hint": "Provide clear hints to guide the student towards solving the question.",
               "methodOfSolving": [
                   "Step 1: Break the problem into subparts or identify the key principle.",
                   "Step 2: Show how to apply the relevant formulas or concepts.",
                   "Step 3: Final calculation steps and arriving at the answer."
               ],
               "answer": "The final answer or result of the question."
           }
       ]
   }
   ```

---

### **Steps for Creating Each Question:**

1. **Identification:**
   - Assign a **unique ID** to each question (e.g., JEEA-2021-PHY-001, JEEA-2021-PHY-002, etc.).
   - Specify the **number of diagrams** used in the question.

2. **Statistics:**
   - Determine the **ideal average time** to solve the question (in seconds). In default, its 600s. Or as you think, based on difficulty.
   - Identify the **unit** of physics the question belongs to (e.g., Mechanics, Electrodynamics, etc.). Units must be one of the following:
        - **Mechanics** (For questions related to units dimentions, errors, kinematics, dynamics, work, energy, moementum, center of mass, collisions, rotational mechanics)
        - **Application of Mechanics**  (For questions related to Fluids, gravitation, Elasticity, SHM, Waves)
        - **Heat and Thermodynamics**  (For questions related to Thermal properties, thermal expansion, Kinetic theory of gases, thermodynamics, heat transfer)
        - **Electromagnetism**  (For questions related to electrostatics, Gauss law, Capacitance, electricity, Magnetism, EMI, AC)
        - **Optics**  (For questions related to Electromagnetic waves, Ray optics and wave optics)
        - **Modern Physics**  (For questions related to photoelectric effect, dual nature of matter/radiation, Atomic structure, X-Rays, Nuclear Physics)
    - The **unit** of one question can have multiple values too. All unit names to be simply separated by comma.
   - Tag the question with **key concepts**  (as many concepts as you can) or categories for easy categorization (e.g., “Newton’s Laws,” “Work-Energy Theorem,” “Projectile Motion”).

3. **Type:**
   - Define the question type (e.g., Subjective, Single Correct, Multiple Correct).
   - In default it has to be "Subjective"
   - Suppose we have a paragraph based question, with one paragraph and 2 or 3 questions based on it. This entire paragraph (with these set of questions) to considered as a single question.

4. **Question Details:**
   - Write the **question text** exactly as it appears in the uploaded image.
   - For using math: "\(MATH_HERE\)" or "\[MATH_HERE\]". Mention "\\n" for new lines everywhere. Follow other standard JSON string rules.
   - Provide a **hint** to solve the question to guide the student.

5. **Solution and Methodology:**
   - You not only have to translate the solution, but have to understand it and illustrate it. 
   - Break down the solution into **steps** (methodOfSolving).
   - Provide a **detailed solution** for every step, ensuring clarity and completeness.
   - Its completely fine if you fail to understand a perticular solution. You can enlist those solution at the end of your response, in which you are doubtfull. We will together work on them.

6. **Final Answer:**
   - Provide the **answer key** for the question. 

7. **Solution Verification:**
   - Mark `solutionRechecked` as **true** after verification. You have to verify it, once you have written it.
   - Mark `solutionManualRechecked` as **false** until it is manually reviewed.

---

### **Key Points to Remember:**

- All questions should follow the **exact JSON structure** provided above.
- Ensure every question is tagged appropriately to allow easy categorization and retrieval.
- The **hint** section must help students think through the question without giving away the solution.
- The **method of solving** must include clear and logical steps that mirror how students should approach the problem.

---

### **Example JSON for Reference:**
[JUST A SAMPLE TO ILLUSTRATE THE STRUCTURE]
```json
{
    "questions": [
        {
            "id": "JEEA-2021-PHY-001",
            "title":"Finding maximum KE of photoelectrons",
            "statistics": {
                "numberOfDiagrams": 2,
                "idealAverageTimeInS": 180,
                "Unit": "Modern Physics",
                "tags": [
                    "Quantum Mechanics",
                    "Photoelectric Effect",
                    "Wave-Particle Duality"
                ]
            },
            "type": "Subjective",
            "questionText": "Calculate the maximum kinetic energy of photoelectrons emitted when light of wavelength 400 nm falls on a metal surface with a work function of 2 eV.",
            "solution": "The energy of the incident photon is calculated using E = hc/λ. Subtract the work function to find the maximum kinetic energy of the photoelectrons. Solution: E = 1240/400 = 3.1 eV. K.E. max = 3.1 - 2 = 1.1 eV.",
            "solutionRechecked": true,
            "solutionManualRechecked": false,
            "hint": "Use the photoelectric equation: Energy of photon = Work function + Kinetic energy.",
            "methodOfSolving": [
                "Step 1: Calculate the energy of the incident photon using the formula E = hc/λ.",
                "Step 2: Subtract the work function from the photon energy to find the kinetic energy.",
                "Step 3: State the final answer with proper units."
            ],
            "answer": "1.1 eV"
        }
    ]
}
```
### **Final expected output:**
- You have to mention one of the element of "questions" array enclosed in "{}".

**Additional Instructions:**
*   Always use `\\n` for newlines within strings, *never* `\n`.
*   Enclose all mathematical expressions within MathJax delimiters: `\\( ... \\)`.  This applies to the `questionText`, `solution`, `hint`, `methodOfSolving`, and `answer` fields.
*   Represent diagrams with placeholders: `\\nDIAGRAM[number, width]\\n` on a separate line.  `number` corresponds to the diagram index (starting from 1), and `width` specifies the intended display width in pixels.
*   Ensure the `numberOfDiagrams` value in the `statistics` object matches the number of `DIAGRAM` placeholders used in the `questionText` and `solution`.
*   Break long mathematical equations into multiple lines for better readability.
*   Double-check the solution's accuracy before marking `solutionRechecked` as `true`.
*   Ensure solutions are detailed, step-by-step, and easy to understand.
*   Provide hints that guide students without revealing the complete solution.  Use MathJax for any equations in hints.


---

If you have any further questions to ask about this process, you ask me now. Else you mention, "I am ready"


---
GENERATED BY GEMINI:
## Prompt to Generate JEE Advanced Physics Question JSON

**Task:** Generate JSON data representing challenging physics questions suitable for JEE Advanced preparation, along with their detailed solutions, hints, and relevant metadata.  Adhere strictly to the specified JSON structure and formatting rules.  Only process questions and solutions provided as images; do *not* generate your own questions.

**Input:** An image containing a physics question, its solution, and potentially multiple-choice options. The questions can cover various topics in Mechanics, Electromagnetism, etc. Images may contain diagrams crucial for understanding the problem and solution.

**Output:** A JSON object representing the question, conforming to the structure below. The JSON should be formatted for readability, with proper indentation and newlines (`\\n`) within text strings.  Diagrams within the question text or solution should be replaced with placeholders, and their details should be recorded in the `statistics` object.

**JSON Structure:**

```json
{
  "questions": [
    {
      "id": "Unit-Number (e.g., ME-0001, EM-0001)", // Start from 0001 for each unit.  ME for Mechanics, EM for Electromagnetism, etc.
      "title": "Concise title of the question",
      "statistics": {
        "numberOfDiagrams": "Number of diagrams (integer)",
        "idealAverageTimeInS": "Ideal solving time in seconds (integer, default 600)",
        "Unit": "Physics unit (string, e.g., 'Mechanics', 'Electromagnetism')", // Mechanics, Application of Mechanics, Heat and Thermodynamics, Electromagnetism, Optics, Modern Physics
        "tags": [
          "Relevant tags and concepts (array of strings)",
          "e.g., 'Kinematics', 'Friction', 'Gauss's Law'"
        ]
      },
      "type": "Question type (string, default 'Subjective')", // Subjective, Single Correct, Multiple Correct, Integer Type
      "questionText": "Complete question text (string) with \\n for newlines and \\( ... \\) for MathJax", // DIAGRAM[number, width] for diagram placeholder
      "solution": "Step-by-step solution (string) with \\n for newlines and \\( ... \\) for MathJax", // DIAGRAM[number, width] for diagram placeholder
      "solutionRechecked": true, // Boolean, true if checked, false otherwise
      "solutionManualRechecked": false, //Boolean, set false for all, change manually to true
      "hint": "Hints to guide the student (string) with \\( ... \\) for MathJax",
      "methodOfSolving": [
        "Steps to solve the question (array of strings) with \\( ... \\) for MathJax" ,
        "Each step should be clear and concise."
      ],
      "answer": "Final answer (string) with \\( ... \\) for MathJax" //For MCQ, mention the option, and for others mention the exact answer
    }
  ]
}
```

**Formatting Rules:**

*   Always use `\\n` for newlines within strings, *never* `\n`.
*   Enclose all mathematical expressions within MathJax delimiters: `\\( ... \\)`.  This applies to the `questionText`, `solution`, `hint`, `methodOfSolving`, and `answer` fields.
*   Represent diagrams with placeholders: `\\nDIAGRAM[number, width]\\n` on a separate line.  `number` corresponds to the diagram index (starting from 1), and `width` specifies the intended display width in pixels.
*   Ensure the `numberOfDiagrams` value in the `statistics` object matches the number of `DIAGRAM` placeholders used in the `questionText` and `solution`.
*   Break long mathematical equations into multiple lines for better readability.


**Additional Instructions:**

*   Do not generate question titles; extract them from the provided image or provide a concise, descriptive title.
*  For subjective questions asking for specific values, phrase the question directly (e.g., "Find the force...") instead of asking to prove something (e.g., "Show that the force is...").
*   Clearly label multi-part questions with (a), (b), etc., and provide corresponding answers in the same format.
*   Clarify the frame of reference, coordinate system, origin, and other relevant context in the question text.
*   Ensure solutions are detailed, step-by-step, and easy to understand.
*   Provide hints that guide students without revealing the complete solution.  Use MathJax for any equations in hints.
*   Double-check the solution's accuracy before marking `solutionRechecked` as `true`.



By following these instructions precisely, you should be able to generate high-quality JSON data representing JEE Advanced physics questions and their detailed solutions.
