

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

*   Always use `\\n` for newlines within strings, *never* use `\n`.
*   Enclose all mathematical expressions within MathJax delimiters: `\\( ... \\)`.  This applies to the `questionText`, `solution`, `hint`, `methodOfSolving`, and `answer` fields.
*   Represent diagrams with placeholders: `\\nDIAGRAM[number, width]\\n` on a separate line.  `number` corresponds to the diagram index (starting from 1), and `width` specifies the intended display width in pixels.
*   Ensure the `numberOfDiagrams` value in the `statistics` object matches the number of `DIAGRAM` placeholders used in the `questionText` and `solution`.
*   Break long mathematical equations into multiple lines for better readability in mobile view. The width of the equation should not be large.


**Additional Instructions:**

*   For subjective questions asking for specific values, phrase the question directly (e.g., "Find the force...") instead of asking to prove something (e.g., "Show that the force is...").
*   If question has multiple options, after understanding the question you make it a subjective question. Asking whatever was overall required in the question.
*   Clarify the frame of reference, coordinate system, origin, and other relevant context in the question text, if not given in the question text.
*   Ensure solutions are detailed, step-by-step, and easy to understand.
*   Provide hints that guide students without revealing the complete solution.  Use MathJax for any equations in hints.
*   Double-check the solution's accuracy before marking `solutionRechecked` as `true`.



By following these instructions precisely, you should be able to generate high-quality JSON data representing JEE Advanced physics questions and their detailed solutions. If any doubts, confusion or any question, you ask me. Else write "I am ready".
