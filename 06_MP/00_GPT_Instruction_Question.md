
Following is the format of writing questions. You update your memory and mention the required number of questions from the topic I will tell you. I will tell you the number of questions from each topic too, and the starting question id:
With the highest level of accuracy in the questions, frame questions (when asked) in the following JSON format. Mark `"solutionGPTRechecked": true` only if you have rechecked the solution before writing it for the first time. This must be verified by checking it. Always set `"solutionManualRechecked": false`. Note that id of the questions must be related to conceptsID (like PEE.1.2.[Question serial number here]), the concept id will be provided in the content structure. Regarding:
"resolution": {
                    "information": 0.3, 
                    "concept": 0.3,
                    "calculation": 0.4,
                    "difficultyIn10": 6
                }
Check the question solving skill verifies which quality of student, is it information retention capability (high value of "information"), is it calculation solving capability (high value of "calculations"),is it concept application capability (high value of "concept"). Total of these should be 1. Overall difficulty to be counted in difficultyIn10. difficultyIn10=4 for an average JEE Main/NEET level question. difficultyIn10=7to8 for JEE Advanced level.

```json{
    "questions": [
        {
            "id": "TF.PEE.2.3.Q3",
            "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            },
            "type": "truefalse",
            "exerciseName": "True or False",
            "questionText": "A good question here",
            "solution": "False. Explanation here.",
            "solutionGPTRechecked": true,
            "solutionManualRechecked": false,
            "hint": "Hint here.",
            "answer": "False",
            "options": [
                "True",
                "False"
            ],
            "conceptStatistics": {
                "chapter": "Physics",
                "section": "Mechanics",
                "concept": "Newton's Laws",
                "source": "Textbook A",
                "resolution": {
                    "information": 0.3,
                    "concept": 0.3,
                    "calculation": 0.4,
                    "difficultyIn10": 6
                },
                "tags": [
                    "Newton",
                    "Laws",
                    "Mechanics"
                ]
            }
        },
        {
            "id": "OW.PEE.2.3.Q3",
            "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            },
            "type": "oneword",
            "exerciseName": "One Word",
            "questionText": "question here",
            "solution": "The correct answer is 'Work function.'",
            "solutionGPTRechecked": false,
            "solutionManualRechecked": false,
            "hint": "It's a term that defines the energy barrier for electron emission.",
            "answer": [
                "Work function",
                "phi",
                "work-function"
            ],
            "conceptStatistics": {
                "chapter": "Physics",
                "section": "Mechanics",
                "concept": "Newton's Laws",
                "source": "Textbook A",
                "resolution": {
                    "information": 0.3,
                    "concept": 0.3,
                    "calculation": 0.4,
                    "difficultyIn10": 6
                },
                "tags": [
                    "Newton",
                    "Laws",
                    "Mechanics"
                ]
            }
        },
        {
            "id": "SO.PEE.2.3.Q3",
            
            "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            },
            "type": "singleoption",
            "exerciseName": "Single Option",
            "questionText": "In a photoelectric experiment, what happens to the photocurrent when the intensity of incident light is increased while keeping frequency constant?",
            "solution": "It increases. Higher intensity means more photons, leading to more emitted electrons and higher photocurrent.",
            "solutionGPTRechecked": false,
            "solutionManualRechecked": false,
            "hint": "Consider how intensity affects the number of emitted electrons.",
            "options": [
                "It increases",
                "It decreases",
                "It remains the same",
                "It becomes zero"
            ],
            "answer": "A",
            "conceptStatistics": {
                "chapter": "Physics",
                "section": "Mechanics",
                "concept": "Newton's Laws",
                "source": "Textbook A",
                "resolution": {
                    "information": 0.3,
                    "concept": 0.3,
                    "calculation": 0.4,
                    "difficultyIn10": 6
                },
                "tags": [
                    "Newton",
                    "Laws",
                    "Mechanics"
                ]
            },
        },
        {
            "id": "NM.PEE.2.3.Q3",
            
            "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            },
            "type": "numerical",
            "exerciseName": "Numerical",
            "questionText": "Calculate the work done when a force of \\(10 N\\) moves an object 5 meters in the direction of the force.",
            "solution": "\\(\\text{Work} = \\text{Force} \\times \\text{Distance} = 10 N \\times 5 m = 50 J.\\)",
            "solutionGPTRechecked": false,
            "solutionManualRechecked": false,
            "range": "0",
            "hint": "Use the formula Work = Force \\(\\times) Distance.",
            "answer": 50,
            "conceptStatistics": {
                "chapter": "Physics",
                "section": "Mechanics",
                "concept": "Newton's Laws",
                "source": "Textbook A",
                "resolution": {
                    "information": 0.3,
                    "concept": 0.3,
                    "calculation": 0.4,
                    "difficultyIn10": 6
                },
                "tags": [
                    "Newton",
                    "Laws",
                    "Mechanics"
                ]
            },
        },
        {
            "id": "PG.PEE.2.3.Q3",
            "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            }
        },
        {
            "type": "paragraph",
            "exerciseName": "Reading Comprehension",
            "paragraph": "A point source of light is placed at the center of curvature of a hemispherical perfectly reflecting surface. The energy emitted by the source falls uniformly on the surface. By calculating the projected area, the net force exerted by the reflected light on the hemisphere is determined as half the power of the source divided by the speed of light.",
            "questions": [
                {
                    "id": "SO.PEE.2.3.Q3.1",
                    "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            },
                    "type": "singleoption",
                    "questionText": "Where is the point source of light located in relation to the hemisphere?",
                    "solution": "The point source is located at the center of curvature of the hemisphere.",
                    "solutionGPTRechecked": false,
                    "solutionManualRechecked": false,
                    "hint": "Think about the symmetry of the setup and where light would evenly reach the surface.",
                    "options": [
                        "At the center of curvature",
                        "On the surface",
                        "At the focal point",
                        "At an arbitrary point"
                    ],
                    "answer": "A",
                    "conceptStatistics": {
                        "chapter": "Physics",
                        "section": "Mechanics",
                        "concept": "Newton's Laws",
                        "source": "Textbook A",
                        "resolution": {
                            "information": 0.3,
                            "concept": 0.3,
                            "calculation": 0.4,
                            "difficultyIn10": 6
                        },
                        "tags": [
                            "Newton",
                            "Laws",
                            "Mechanics"
                        ]
                    }
                },
                {
                    "id": "TF.PEE.2.3.Q3.2",
                    "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            },
                    "type": "truefalse",
                    "exerciseName": "True or False",
                    "questionText": "A good question here",
                    "solution": "True. The net force is calculated as the power divided by twice the speed of light.",
                    "solutionGPTRechecked": false,
                    "solutionManualRechecked": false,
                    "hint": "Consider the formula derived for the force based on power and speed of light.",
                    "options": [
                        "True",
                        "False"
                    ],
                    "answer": "True",
                    "conceptStatistics": {
                        "chapter": "Physics",
                        "section": "Mechanics",
                        "concept": "Newton's Laws",
                        "source": "Textbook A",
                        "resolution": {
                            "information": 0.3,
                            "concept": 0.3,
                            "calculation": 0.4,
                            "difficultyIn10": 6
                        },
                        "tags": [
                            "Newton",
                            "Laws",
                            "Mechanics"
                        ]
                    }
                },
                {
                    "id": "TF.PEE.2.3.Q3.3",
                    "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            },
                    "type": "truefalse",
                    "questionText": "The net force on the hemisphere is directed radially outward.",
                    "hint": "Think about the symmetry and the reflection of light.",
                    "solution": "False. The net force is directed along the symmetry axis of the hemisphere due to the reflected light.",
                    "solutionGPTRechecked": false,
                    "solutionManualRechecked": false,
                    "answer": "False",
                    "conceptStatistics": {
                        "chapter": "Physics",
                        "section": "Mechanics",
                        "concept": "Newton's Laws",
                        "source": "Textbook A",
                        "resolution": {
                            "information": 0.3,
                            "concept": 0.3,
                            "calculation": 0.4,
                            "difficultyIn10": 6
                        },
                        "tags": [
                            "Newton",
                            "Laws",
                            "Mechanics"
                        ]
                    }
                }
            ]
        },
        {
            "id": "SB.PEE.2.3.Q3",
            "statistics": {
                "attempts": 0,
                "hintsAccessed": 0,
                "solved": 0,
                "successRate": 0,
                "idealAverageTime": 10,
                "averageTimeTaken": 0,
                "medianTime": 0,
                "timeStdDev": 5,
                "firstAttemptSuccessRate": 0,
                "commonIncorrectAnswers": [
                    {
                        "answer": "False",
                        "count": 30
                    }
                ]
            },
            "type": "subjective",
            "exerciseName": "Subjective Questions",
            "questionText": "A point source of light \\( O \\) is placed at the center of curvature of a hemispherical perfectly reflecting surface with a radius of curvature \\( R \\). Find the force on the hemisphere due to the light falling on it if the source emits a power \\( P \\).",
            "detailedSolution": "The energy emitted by the source per unit time, i.e., \\( P \\), falls on an area \\( 4\\pi R^2 \\) at a distance \\( R \\) in unit time. Thus, the energy falling per unit area per unit time is  \\(\\qquad \\frac{P}{4\\pi R^2} \\)  Consider a small area \\( dA \\) at the point \\( Q \\) of the hemisphere as shown in the figure.  The energy falling per unit time on it is  \\(\\qquad \\frac{P dA}{4 \\pi R^2} \\)  The corresponding momentum incident on this area per unit time is  \\(\\qquad \\frac{P dA}{4 \\pi R^2 c} \\)  As the light is reflected back, the change in momentum per unit time, i.e., the force on \\( dA \\), is  \\(\\qquad dF = \\frac{2 P dA}{4 \\pi R^2 c} \\)  Suppose the radius \\( OQ \\) through the area \\( dA \\) makes an angle \\( \\theta \\) with the symmetry axis \\( OY \\). The force on \\( dA \\) is along this radius. By symmetry, the resultant force on the hemisphere is along \\( OY \\). The component of \\( dF \\) along \\( OY \\) is  \\(\\qquad dF \\cos \\theta = \\frac{2 P dA}{4 \\pi R^2 c} \\cos \\theta \\)  If we project the area \\( dA \\) on the plane containing the rim, the projection is \\( dA \\cos \\theta \\). Thus, the component of \\( dF \\) along \\( OY \\) is  \\(\\qquad dF \\cos \\theta = \\frac{2 P}{4 \\pi R^2 c} \\left( \\text{Projection of } dA \\right) \\)  The net force along \\( OY \\) is  \\(\\qquad F = \\frac{2 P}{4 \\pi R^2 c} \\left( \\sum \\text{Projection of } dA \\right) \\)  When all the small areas \\( dA \\) are projected, we get the area enclosed by the rim, which is \\( \\pi R^2 \\). Thus,  \\(\\qquad F = \\frac{\\left( \\frac{2 P}{4 \\pi R^2 c} \\right) \\left( \\pi R^2 \\right)} = \\frac{P}{2 c} \\)",
            "solutionSteps": [
                "Identify Energy Density",
                "Calculate Energy Falling on Small Area \\(dA\\)",
                "Determine Momentum Incident on \\(dA\\)",
                "Calculate Force on \\(dA\\) Due to Reflection",
                "Resolve Force Along Symmetry Axis",
                "Project \\(dA\\) on Plane Containing the Rim",
                "Sum of Projected Areas",
                "Calculate Net Force"
            ],
            "hint": "Calculate the energy falling on the hemisphere per unit time and focus on a small area \\(dA\\). For perfectly reflected light, the force on \\(dA\\) relates to twice the incident momentum. Resolve this force along the symmetry axis  by projecting \\(dA\\), then sum the components to find the net force.",
            "answer": "40",
            "conceptStatistics": {
                "chapter": "Physics",
                "section": "Optics",
                "concept": "Radiation Pressure and Force",
                "source": "Illustration 18",
                "resolution": {
                    "information": 0.2,
                    "concept": 0.5,
                    "calculation": 0.3,
                    "difficultyIn10": 7
                },
                "tags": [
                    "Radiation Pressure",
                    "Optics",
                    "Reflection",
                    "Force"
                ]
            }
        }
    ]
}
```

Ensure all question entries follow this structure, covering the necessary fields with accurate data and verifications. Following are details of Exercises in which these questions will be used:
# Exercise 1
## True false questions [20 Questions]
    - Directly based on concepts/informations
    - Based on direct relationship of one quantity on other
    - Try not to keep it directly based on information
## One word answers [20 Questions]
    - Directly based on concepts/informations
    - Based on direct relationship of one quantity on other
    - Try not to keep it directly based on information
## Single option correct [20 Questions]
    - Directly based on concepts/informations
    - Based on direct relationship of one quantity on other
    - Try not to keep it directly based on information

# Exercise 2
## Single Option Correct [30 questions]
    - Numerical based questions
    - Graph based questions
    - Concept application based questions
    - Formula using
## Numerical correct [20 questions]
    - Answer should be an integer
    - Questions like, by what factor will that change, if this is changed by this amount etc.
    - Find the value of this quantity in SI unit etc.

# Exercise 3
## Paragraph Based Questions [10 paragraphs, 2 pr 3 questions in each paragraphs]
    - Long questions/case studies
    - Modifications with given paragraph questions in image format
    - Hints to be added by GPT
    - Step wise detailed solution to be written by GPT refering to the given solution in image format
## Multiple options may be correct [20 Questions]
    - Application of concepts to high level
    - Asking about different aspects of given situation
    - Questions which might have different possible answers

# Exercise 4
## Only subjective Questions [20 Questions]
    - All questions uploaded in image format.
    - Detailed hint, solution to be written by GPT
    - Also give structure of solution, after hint and before detailed solution


NOW, IF YOU HAVE ANYTHING TO ASK THEN ASK ME. START MAKING QUESTIONS AFTER MY INSTRUCTIONS ONLY.