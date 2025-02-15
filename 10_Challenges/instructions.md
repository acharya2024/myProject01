

## Prompt to Generate JEE Advanced Physics Question JSON

**Task:** Generate JSON data (from the images uploaded) representing challenging physics questions suitable for JEE Advanced preparation, along with their detailed solutions, hints, and relevant metadata.  Adhere strictly to the specified JSON structure and formatting rules.  Only process questions and solutions provided as images; do *not* generate your own questions.

**Input:** An image containing a physics question, its solution, and potentially multiple-choice options. The questions can cover various topics in Mechanics, Electromagnetism, etc. Images may contain diagrams crucial for understanding the problem and solution.

**Output:** A JSON object representing the question, conforming to the structure below. The JSON should be formatted for readability, with proper indentation and newlines (`\\n`) within text strings.  Diagrams within the question text or solution should be replaced with placeholders, and their details should be recorded in the `statistics` object. In the solution part of the questions, it might not be written perfectly. May be only some equations are given, or just instructions are written to solve the question. You have to read and understand the solution and based on that, you have to provide the detailed solution.

**JSON Structure:**

```json

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
  
```

**Formatting Rules:**

*   If some data (like some logarithmic values or some trigonometric ratio of some specific angles) is required in a question, you may add this info after question text. Like "Use \\(\\ln(2)=0.693\\)"
*   To write something in bold, you may use "*". For example "Here is a statement with *one word* as bold"
*   Enclose everywhere math in \\(MATH\\). Be it hint, answer or anything. Write last question again.
*   Always use `\\n` for newlines within strings, *never* use `\n`.
*   Enclose all mathematical expressions within MathJax delimiters: `\\( ... \\)`.  This applies to the `questionText`, `solution`, `hint`, `methodOfSolving`, and `answer` fields.
*   Represent diagrams with placeholders: `\\nDIAGRAM[number,width]\\n` on a separate line.  `number` corresponds to the diagram index (starting from 1), and `width` specifies the intended display width in pixels.
*   Ensure the `numberOfDiagrams` value in the `statistics` object matches the number of `DIAGRAM` placeholders used in the `questionText` and `solution`.
*   Break long mathematical equations into multiple lines for better readability in mobile view. The width of the equation should not be large.
*   If somewhere, a table to be shown then use this fomat:
      \\n[TABLE_START][ROW_START][CELL_START]*Column I*[CELL_END][CELL_START]*Column II*[CELL_END][ROW_END][ROW_START][CELL_START](A) Nuclear fusion[CELL_END][CELL_START](P) Absorption of thermal neutrons by \\(^{235}_{92}U\\)[CELL_END][ROW_END][ROW_START][CELL_START](B) Fission in a nuclear reactor[CELL_END][CELL_START](Q) \\(^{60}_{27}Co\\) nucleus[CELL_END][ROW_END][ROW_START][CELL_START](C) β-decay[CELL_END][CELL_START](R) Energy production in stars via hydrogen conversion to helium[CELL_END][ROW_END][ROW_START][CELL_START](D) γ-ray emission[CELL_END][CELL_START](S) Heavy water[CELL_END][ROW_END][ROW_START][CELL_START][CELL_END][CELL_START](T) Neutrino emission[CELL_END][ROW_END][TABLE_END]


**Additional Instructions:**

*   The content should be written fresh. Without any reference from previous problem etc. Also, in bookish style.
*   If deeper understanding will be required, it will be informed to you. Try your best to understand from the given solution.
*   Understand the question solution well enough to mention the answer key, hint, steps to solve etc. Also, you have to make solution more elaborate if it is not elaborate.
*   Avoid deep understanding of the question. Just superficial understanding is sufficient. So that you could focus more on presentation of the content.
*   For subjective questions asking for specific values, phrase the question directly (e.g., "Find the force...") instead of asking to prove something (e.g., "Show that the force is...").
*   If question has multiple options, after understanding the question you make it a subjective question. Asking whatever was overall required in the question.
*   Clarify the frame of reference, coordinate system, origin, and other relevant context in the question text, if not given in the question text.
*   Ensure solutions are detailed, step-by-step, and easy to understand.
*   Provide hints that guide students without revealing the complete solution.  Use MathJax for any equations in hints.
*   Double-check the solution's accuracy before marking `solutionRechecked` as `true`.

**Example output**

*   You have to create an output just like this (obviously with different content):
{
      "id": "EM-0065",
      "title": "Minimum Separation Between a Charged Particle and a Current-Carrying Wire",
      "statistics": {
        "numberOfDiagrams": 1,
        "idealAverageTimeInS": 720,
        "Unit": "Electromagnetism",
        "tags": [
          "Magnetic Force",
          "Charged Particle",
          "Current-Carrying Wire",
          "Integration",
          "Non-Uniform Field"
        ]
      },
      "type": "Subjective",
      "questionText": "A long, straight wire carries a current \\(i\\). A particle having a positive charge \\(q\\) and mass \\(m\\), kept at a distance \\(x_0\\) from the wire, is projected towards it with a speed \\(v\\). Find the minimum separation between the wire and the particle.\\nDIAGRAM[1,200]",
      "solution": "Let the particle be initially at P as shown in diagram below:\\nDIAGRAM[1,200]\\nTake the wire as the y-axis and the foot of perpendicular from P to the wire as the origin. Take the line OP as the x-axis. The magnetic field \\(\\vec{B}\\) at any point to the right of the wire is along the negative z-axis. The magnetic force on the particle is, therefore, in the x-y plane. As there is no initial velocity along the z-axis, the motion will be in the x-y plane. Also, as the magnetic field is not uniform, the particle does not go along a circle. The force at time \\(t\\) is \\(\\vec{F} = q \\vec{v} \\times \\vec{B}\\)\\n\\(\\vec{F} = q(v_x \\hat{i} + v_y \\hat{j}) \\times \\left(-\\dfrac{\\mu_0 i}{2\\pi x} \\hat{k}\\right) = j qv_x \\dfrac{\\mu_0 i}{2\\pi x} - i qv_y \\dfrac{\\mu_0 i}{2\\pi x}\\)\\nThus\\n\\(a_x = \\dfrac{F_x}{m} = -\\dfrac{\\mu_0 q i}{2\\pi m} \\dfrac{v_y}{x} = -\\lambda \\dfrac{v_y}{x} \\quad ...(i)\\)\\nwhere \\(\\lambda = \\dfrac{\\mu_0 q i}{2\\pi m}\\)\\nAlso,\\n\\(a_x = \\dfrac{dv_x}{dt} = \\dfrac{dv_x}{dx} \\dfrac{dx}{dt} = v_x \\dfrac{dv_x}{dx}\\) \\(\\quad ...(ii)\\)\\nSince the force acting on the charged particle is only the magnetic force, the speed of the particle must not change. Thus,\\n\\(v_x^2 + v_y^2 = v^2\\)\\nGiving:\\(\\qquad2v_x dv_x + 2v_y dv_y = 0\\)\\n\\(\\Rightarrow v_x dv_x = -v_y dv_y \\quad ...(iii)\\)\\nFrom (i), (ii) and (iii),\\n\\(v_x \\dfrac{dv_x}{dx} = -\\dfrac{\\lambda v_y}{x}\\)\\n\\(\\Rightarrow\\dfrac{dx}{x} = \\dfrac{dv_y}{\\lambda} \\)\\nInitially, \\(x = x_0\\) and \\(v_y = 0\\). \\nAt minimum separation from the wire, \\(v_x = 0\\) so that \\(v_y = -v\\).\\nThus\\n\\(\\displaystyle\\int_{x_0}^{x_{\\min}} \\dfrac{dx}{x} = \\int_0^{-v} \\dfrac{dv_y}{\\lambda}\\)\\n\\(\\ln \\dfrac{x_{\\min}}{x_0} = -\\dfrac{v}{\\lambda}\\)\\n\\(\\Rightarrow x = x_0 e^{-v/\\lambda} \\)\\n\\(\\Rightarrow x = x_0 e^{-\\frac{2\\pi mv}{\\mu_0 q i}}\\)",
      "solutionRechecked": true,
      "solutionManualRechecked": false,
      "hint": "Use the Biot-Savart law to calculate the magnetic field due to the wire. Find the magnetic force on the charged particle. Apply conservation of energy to find the minimum separation.",
      "methodOfSolving": [
        "Calculate the magnetic field as a function of distance.",
        "Use Newton's second law to find the equations of motion.",
        "Consider the x-component of the magnetic force acting on the particle.",
        "Relate the velocity components to the distance x.",
        "Solve the differential equation."
      ],
      "answer": "\\(x = x_0 e^{-\\dfrac{2\\pi mv}{\\mu_0 q i}}\\)"
    }

By following these instructions precisely, you should be able to generate high-quality JSON data representing JEE Advanced physics questions and their detailed solutions. If any doubts, confusion or any question, you ask me. Else summarise whatever you understood and then write "I am ready".
