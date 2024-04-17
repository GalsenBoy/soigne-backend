export const avisMocks = [
    {
        id: "eb15fd74-7f80-48a2-9469-4f0a975154aa",
        created_at: "2024-04-16T12:58:36.124Z",
        description: "Test",
        medecin: {
            "id": "d6009a65-aa5f-4853-91e1-8ef7328dc72c",
            "lastName": "Cissokho",
            "firstName": "Pierre",
            "specialite": "imagerie",
            "matricule": "RARPOP"
        },
        user: {
            "id": "c55a0eeb-b874-425f-afb7-bb863b092ba6",
            "firstName": "user",
            "lastName": "user",
            "email": "user@gmail.com",
            "password": "$2b$10$wivavuwb1JFMm6DFDHR8/O3w07x2oceFpxLxEX3APjYl0s5JaGNBm",
            "zipCode": "12 linandes",
            "role": "user"
        },
        sejour: {
            "id": "0becf503-f333-4084-afdc-bcae848fb61e",
            "dateEntree": "2024-04-16",
            "dateSortie": "2024-04-19",
            "motif": "Mal de tête",
            "specialite": "urgences"
        },
        "prescription": {
            "id": "c493bf4c-943b-4c0a-ba6b-21ec1477f644",
            "date": "2024-04-16T12:58:36.000Z",
            "medecament": [
                {
                    "id": "42eb7eab-0714-4cbd-afaf-69bc4ebc5403",
                    "medicament": "Test",
                    "posologie": "Test"
                },
                {
                    "id": "ae166907-47d1-43d6-8166-e399cb279621",
                    "medicament": "Test",
                    "posologie": "Test"
                }
            ]
        }
    },
    {
        "id": "ee302715-faba-47a6-93dc-48452b5fb2df",
        "created_at": "2024-04-16T12:58:02.145Z",
        "description": "Pas très urgent",
        "medecin": {
            "id": "d6009a65-aa5f-4853-91e1-8ef7328dc72c",
            "lastName": "Cissokho",
            "firstName": "Pierre",
            "specialite": "imagerie",
            "matricule": "RARPOP"
        },
        "user": {
            "id": "c55a0eeb-b874-425f-afb7-bb863b092ba6",
            "firstName": "user",
            "lastName": "user",
            "email": "user@gmail.com",
            "password": "$2b$10$wivavuwb1JFMm6DFDHR8/O3w07x2oceFpxLxEX3APjYl0s5JaGNBm",
            "zipCode": "12 linandes",
            "role": "user"
        },
        "sejour": {
            "id": "0becf503-f333-4084-afdc-bcae848fb61e",
            "dateEntree": "2024-04-16",
            "dateSortie": "2024-04-19",
            "motif": "Mal de tête",
            "specialite": "urgences"
        },
        "prescription": {
            "id": "b617d77e-7d0b-4ace-acf0-118a14240514",
            "date": "2024-04-16T12:58:02.000Z",
            "medecament": [
                {
                    "id": "41348b85-82c7-4595-90f5-64aa3ab03124",
                    "medicament": "Doliprane ",
                    "posologie": "3 fois par jour"
                },
                {
                    "id": "e64e57c2-8fe0-4b82-90a8-acd1f5a7b4bb",
                    "medicament": "Doliprane ",
                    "posologie": "3 fois par jour"
                }
            ]
        }
    }
]