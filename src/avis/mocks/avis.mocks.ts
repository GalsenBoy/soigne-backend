export const avisMocks = [
    {
        id: 'db255d63-43a8-4d02-adda-57c792cd63af',
        created_at: new Date('2024-04-16T13:01:00.041Z'),
        description: 'Pas grave',
        medecin: {
            id: 'd6009a65-aa5f-4853-91e1-8ef7328dc72c',
            lastName: 'Cissokho',
            firstName: 'Pierre',
            specialite: 'imagerie',
            matricule: 'RARPOP',
        },
        user: {
            id: 'c55a0eeb-b874-425f-afb7-bb863b092ba6',
            firstName: 'user',
            lastName: 'user',
            email: 'user@gmail.com',
            password: '$2b$10$wivavuwb1JFMm6DFDHR8/O3w07x2oceFpxLxEX3APjYl0s5JaGNBm',
            zipCode: '12 linandes',
            role: 'user',
        },
        sejour: {
            id: '0becf503-f333-4084-afdc-bcae848fb61e',
            dateEntree: new Date('2024-04-16'),
            dateSortie: new Date('2024-04-19'),
            motif: 'Mal de tête',
            specialite: 'urgences',
        },
        prescription: {
            id: 'f657d866-f760-4aec-adec-fadeb5276244',
            date: new Date('2024-04-16T13:00:59.000Z'),
            medecament: [
                { id: '26d90b7a-3242-4004-9f61-8d6f2432f9de', medicament: 'Doliprane ', posologie: '3 fois par jour' },
                { id: '375267a0-1818-4828-8325-c4a3a9206b96', medicament: 'Aspirine', posologie: '2 x' },
                { id: '5110377a-55c5-493e-a90f-d1e8f8f11e25', medicament: 'Doliprane ', posologie: '3 fois par jour' },
                { id: 'c6844179-3fb5-45d9-b35e-49f5ac51dbd0', medicament: 'Aspirine', posologie: '2 x' },
            ],
        },
    },

]