{
  "nodes": [
    {
      "parameters": {
        "public": true,
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.1,
      "position": [
        -1440,
        340
      ],
      "id": "ced76c44-dbd7-4fed-9222-f6b01401807d",
      "name": "When chat message received",
      "webhookId": "250eb06b-049f-4d0b-a299-1af238292432"
    },
    {
      "parameters": {
        "hasOutputParser": true,
        "options": {
          "systemMessage": "=You are a physics tutor for a 9th-grade ICSE student.\nALWAYS START WITH a short introduction followed by ASKING A CONCEPTUAL QUESTION. ASK ONLY EIGHT PHYSICS QUESTIONS — NO MORE.\n\nYour job is to:\n\nPhysics Questions Scope:\nThe chapters in the textbook are:\n\nMeasurements and Experimentation\n\nMotion in One Dimension\n\nLaws of Motion\n\nPressure in Fluids and Atmospheric Pressure\n\nUpthrust in Fluids, Archimedes' Principle and Floatation\n\nHeat and Energy\n\nReflection of Light\n\nPropagation of Sound Waves\n\nCurrent Electricity\n\nMagnetism\n\nGuidelines for Physics Questions:\n\nStart with simple conceptual questions from the chapters above.\n\nAsk one question at a time and wait for the student to respond.\n\nAssess each response:\n\nIf correct, increase the difficulty slightly or move to a new topic.\n\nIf incorrect, explain simply and move on to the next question of same topic (but stick to 8 questions ONLY).\n\nEnsure a logical progression across topics; avoid random jumps.\n\nTry to cover as many chapters as possible across the 8 questions.\n\nUse human-readable formulas, e.g., \"Speed = Distance / Time\".\n\nAfter completing all 8 questions, assess the student's proficiency as one of:\n\nBeginner\n\nIntermediate\n\nAdvanced\n\nAfter Physics Questions, ask these 5 questions (one by one) about learning style:\n\nDo you remember things better when you see diagrams or videos, or when you hear someone explain it?\n\nWhen you’re studying, do you like to write notes and draw, or do you prefer to listen and talk about it?\n\nDo you find it easier to understand when you do a hands-on experiment, or when you read step-by-step instructions?\n\nDo you enjoy learning through games or physical activity, or do you prefer quiet reading and reflection?\n\nWhen you don’t understand something, what helps you more:\na) Looking at pictures or animations\nb) Listening to a teacher or video explanation\nc) Trying it out yourself\n\nBased on answers to the learning style questions, identify the most suitable learning style:\n\nVisual\n\nAuditory\n\nKinesthetic\n\nThen respond with the following JSON format:\n\n{\n  \"Proficiency level\": \"Beginner\"\n  \"Learning Style\": \"Visual\"\n}\n(Replace \"Beginner\" with \"Intermediate\" or \"Advanced\" based on performance.)\n(Replace \"Visual\" with \"Auditory\" or \"Kinesthetic\" based on responses.)"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.8,
      "position": [
        -1140,
        340
      ],
      "id": "5124e05d-278b-47a9-a4fc-14b9140ea8a7",
      "name": "AI Agent",
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "mode": "list",
          "value": "gpt-4o-mini"
        },
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "position": [
        -1140,
        540
      ],
      "id": "30cafbd2-15d6-4e2e-895d-7d9e706ce3b3",
      "name": "OpenAI Chat Model1",
      "credentials": {
        "openAiApi": {
          "id": "6pBPZklWNVr8TqBV",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "contextWindowLength": 8
      },
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "position": [
        -840,
        560
      ],
      "id": "9637fd64-9f71-41d8-a47f-d4c401340d02",
      "name": "Simple Memory"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "b5dd7299-1c6c-4f67-9ac4-f998a88e0f01",
              "leftValue": "={{ $json.output }}",
              "rightValue": "\"Proficiency level\":",
              "operator": {
                "type": "string",
                "operation": "contains"
              }
            }
          ],
          "combinator": "or"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -780,
        340
      ],
      "id": "10500769-ed19-441a-bdff-b4eb9a019919",
      "name": "If"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "09320fd9-76dc-446e-98f8-d6e457f09998",
              "name": "output",
              "value": "={{ $json.message || $json.content || $json.text || $json.output || $json.response || $json.result }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -460,
        520
      ],
      "id": "4b7060cd-537f-4829-9e9d-beb96dd996a7",
      "name": "Edit Fields"
    },
    {
      "parameters": {
        "jsCode": "const outputText = items[0].json.output;\n\n// Match the JSON fields\nconst proficiencyMatch = outputText.match(/\"Proficiency level\"\\s*:\\s*\"(\\w+)\"/);\nconst learningStyleMatch = outputText.match(/\"Learning Style\"\\s*:\\s*\"(\\w+)\"/);\n\nif (proficiencyMatch && proficiencyMatch[1] && learningStyleMatch && learningStyleMatch[1]) {\n  return [{\n    json: {\n      \"Proficiency level\": proficiencyMatch[1],\n      \"Learning Style\": learningStyleMatch[1]\n    }\n  }];\n} else {\n  return [{\n    json: {\n      error: \"Required fields not found\",\n      raw: outputText\n    }\n  }];\n}\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -460,
        160
      ],
      "id": "bc4b33c2-2a94-4f3e-8bfb-d224db930b86",
      "name": "Code"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json[\"Proficiency level\"] }}",
        "options": {
          "systemMessage": "=You are a friendly and knowledgeable physics academic advisor for a 9th-grade ICSE student.\nNOTE: [DO NOT ADD ASTERISKS IN YOUR OUTPUT].\n\nThe student has just completed an adaptive proficiency assessment and has been classified as either Beginner, Intermediate, or Advanced. Additionally, you have information about their preferred learning style (Visual, Auditory, or Kinesthetic).\n\nYour task is to create a well-formatted, attractive, and email-ready message for the student that:\n\nStarts with a warm and motivational greeting.\n\nClearly states the Proficiency Level.\n\nPresents a visually structured and engaging study plan, including:\n\nWeekly learning goals for 4–6 weeks.\n\nSmart allocation of time to all 10 chapters, in a bullet or sectioned format.\n\nRevision checkpoints and reinforcement strategies.\n\nStudy methods (e.g., videos, quizzes, mind maps) suitable for their level and based on their learning style (Visual, Auditory, or Kinesthetic).\n\nVisual learners: Suggest methods like diagrams, videos, and infographics.\n\nAuditory learners: Suggest methods like listening to podcasts, explanations, and discussions.\n\nKinesthetic learners: Suggest methods like experiments, hands-on activities, and interactive tools.\n\nSuggestions and learning tips tailored to their proficiency level and learning style.\n\nA motivation section at the end to encourage continued progress.\n\nEnsure the message is:\n\nWell-structured with headings, subheadings, bullet points, and clear spacing.\n\nEasy to read and email-ready.\n\nFormal, friendly, and encouraging in tone.\n\nThe student’s proficiency level is: {{ $json[\"Proficiency level\"] }}\nThe student's learning style is: {{ $json[\"Learning Style\"] }}\n\nDear Student,\n\nWarm regards,\nEdu All."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.9,
      "position": [
        -200,
        160
      ],
      "id": "0bcfe81c-0bb7-4b4e-a1d7-210ba007f6d8",
      "name": "AI Agent1"
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "mode": "list",
          "value": "gpt-4o-mini"
        },
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "position": [
        -200,
        340
      ],
      "id": "df348b35-b22b-4f18-8412-e5411b702c99",
      "name": "OpenAI Chat Model2",
      "credentials": {
        "openAiApi": {
          "id": "6pBPZklWNVr8TqBV",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "sendTo": "=trevor@voxxeltek.com",
        "subject": "Your Personalized ICSE Physics Study Plan",
        "emailType": "text",
        "message": "={{$json[\"output\"]}}",
        "options": {}
      },
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2.1,
      "position": [
        180,
        160
      ],
      "id": "312a321f-7cca-41e3-8690-35da4d6f8346",
      "name": "Send a message",
      "webhookId": "532f5141-6833-426c-ba63-b8325c9e1cf5",
      "alwaysOutputData": true,
      "credentials": {
        "gmailOAuth2": {
          "id": "v1uKOSJlBEyWRbM1",
          "name": "Gmail account"
        }
      }
    }
  ],
  "connections": {
    "When chat message received": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model1": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Simple Memory": {
      "ai_memory": [
        [
          {
            "node": "AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          },
          {
            "node": "Code",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Code": {
      "main": [
        [
          {
            "node": "AI Agent1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent1": {
      "main": [
        [
          {
            "node": "Send a message",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model2": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent1",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "4eaa5119ca413e966b03c9273fe9deed86decec86f464f7b831496041899683e"
  }
}