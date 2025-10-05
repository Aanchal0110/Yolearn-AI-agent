{
  "nodes": [
    {
      "parameters": {
        "path": "supabase-user-login",
        "options": {}
      },
      "id": "d85c5654-5ece-4f59-98d4-e8b5f4cd389b",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [
        -820,
        20
      ],
      "webhookId": "7eb3da21-e42c-4275-8a7a-92021ae0cad8"
    },
    {
      "parameters": {
        "requestMethod": "POST",
        "url": "https://{{ $env.SUPABASE_PROJECT_REF }}.supabase.co/rest/v1/users?user_id=eq.{{ $json.user_id }}",
        "options": {}
      },
      "id": "53acc88a-f8c8-437e-8f03-ec116d12a048",
      "name": "Check User",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [
        -600,
        20
      ]
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{ $json.length }}",
              "operation": "equal"
            }
          ]
        }
      },
      "id": "c825aa32-6d50-4060-86e8-0f405b9c8d1d",
      "name": "User Exists?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -380,
        20
      ]
    },
    {
      "parameters": {
        "requestMethod": "POST",
        "url": "=https://wvrpxzxjcivqztmdxpln.supabase.co/rest/v1/users\n",
        "jsonParameters": true,
        "options": {},
        "bodyParametersJson": "=\"{\n      \\\"name\\\": \\\"{{$json[\\\"name\\\"]}}\\\",\n      \\\"email\\\": \\\"{{$json[\\\"email\\\"]}}\\\",\n      \\\"username\\\": \\\"{{$json[\\\"username\\\"]}}\\\",\n      \\\"password_hash\\\": \\\"{{$json[\\\"password_hash\\\"]}}\\\"\n    }\"",
        "headerParametersJson": "=\"{\n      \\\"apikey\\\": \\\"{{$env.SUPABASE_SERVICE_ROLE_KEY}}\\\",\n      \\\"Authorization\\\": \\\"Bearer {{$env.SUPABASE_SERVICE_ROLE_KEY}}\\\",\n      \\\"Content-Type\\\": \\\"application/json\\\",\n      \\\"Prefer\\\": \\\"return=representation\\\"\n    }\""
      },
      "id": "b9d73b52-880b-4c22-9597-07434937497b",
      "name": "Insert User",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [
        -140,
        -80
      ]
    },
    {
      "parameters": {
        "url": "https://{{ $env.SUPABASE_PROJECT_REF }}.supabase.co/rest/v1/users?user_id=eq.{{ $json.user_id }}",
        "jsonParameters": true,
        "options": {}
      },
      "id": "33530909-1975-4b9f-883d-153287830950",
      "name": "Update User",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [
        -140,
        120
      ]
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "0f4cfa00-00f0-4c9b-a4bf-051cca78cba3",
      "name": "Send Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        100,
        20
      ]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Check User",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Check User": {
      "main": [
        [
          {
            "node": "User Exists?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "User Exists?": {
      "main": [
        [
          {
            "node": "Insert User",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Update User",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Insert User": {
      "main": [
        [
          {
            "node": "Send Response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Update User": {
      "main": [
        [
          {
            "node": "Send Response",
            "type": "main",
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