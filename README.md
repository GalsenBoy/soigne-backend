# Soigne-moi Backend

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Backend robuste pour l'application de gestion hospitalière "Soigne-moi", conçu pour gérer les données des patients, des médecins, des séjours et des prescriptions.

## Caractéristiques principales

*   **API RESTful:** Fournit des endpoints sécurisés pour la création, la lecture, la mise à jour et la suppression des données.
*   **Authentification JWT:** Sécurise l'accès aux ressources en vérifiant l'identité des utilisateurs.
*   **Architecture modulaire (NestJS):**  Organisation claire et maintenable du code.
*   **TypeORM:** Facilite la gestion des données et l'interaction avec la base de données MySQL.

## Installation

1.  **Cloner le dépôt:**

```bash
git clone https://github.com/GalsenBoy/soigne-backend.git
```

2.  **Installer les dépendances:**

```bash
cd soigne-backend
npm install
```

3.  **Configurer l'environnement:**

*   Créez un fichier `.env` à la racine du projet.
*   Renseignez les variables d'environnement nécessaires (voir `.env.example`).

4.  **Lancer la base de données:**

*   Assurez-vous d'avoir MySQL installé et configuré.
*   Utilisez phpMyAdmin ou un outil similaire pour créer une base de données nommée `e-sante`.
*   Vous trouverez le fichier SQL à la racine du projet. Ce fichier contient les instructions pour créer les tables et les relations nécessaires dans votre base de données. Pour l'exécuter, utilisez un outil de ligne de commande MySQL ou importez-le dans phpMyAdmin.

5.  **Lancer le serveur de développement:**

```bash
npm run start:dev
```

## Utilisation

L'API sera accessible à l'adresse `http://localhost:3000`. Consultez la documentation de l'API pour connaître les endpoints disponibles et leur utilisation.

## Structure du projet

```text
soigne-backend/
├── src/
│   ├── auth/          (Gestion de l'authentification)
│   ├── users/         (Gestion des utilisateurs)
│   ├── sejours/       (Gestion des séjours)
│   ├── prescriptions/ (Gestion des prescriptions)
│   ├── avis/          (Gestion des avis)
│   ├── ...            (Autres modules)
├── .env.example       (Exemple de fichier de configuration)
└── README.md
```

## Contribution

Les contributions sont les bienvenues! Veuillez suivre ces étapes:

1.  Forker le dépôt.
2.  Créer une branche pour votre fonctionnalité: `git checkout -b ma-nouvelle-fonctionnalite`
3.  Commiter vos changements: `git commit -m 'Ajouter ma nouvelle fonctionnalité'`
4.  Pousser la branche: `git push origin ma-nouvelle-fonctionnalite`
5.  Ouvrir une pull request.

## Licence

Ce projet est sous licence [MIT](LICENSE).

## Contact

Pour toute question, vous pouvez ouvrir une issue sur GitHub.
