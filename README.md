# FR - Administration
Ce projet de gestion d'administration a pour objectif de nous former sur le framework Angular.

Réalisé par Valentin Lorand et Guillaume Malherbe (étudiant ESIR3 - SI). 

Lien vers le répertoire GitHub : ()[https://github.com/Guitayk/FrontEnd-course]

## Structure du projet
```
|-fr-administration-back : Partie backend du projet
|-fr-administration-front : Partie frontend du projet
|-images : Schémas du projet
```

## :rocket: Démarrer le projet

Lancement du backend :

```bash
cd fr-administration-back
npm install
npm start
```

Lancement du frontend :

```bash
cd fr-administration-front
npm install
npm start
```

## Partie Backend
Le backend de ce projet est développé sous NestJS en Javascript.
Une implémentation terminée nous a été fournie, mais pour contourner quelques erreurs d'implémentation, nous avons été amené à aporter quelques modifications ci-dessous listées :

- Modification de la suppression d'un membre d'une association (passage par query au lieu du body) + uniformisation du code lignes 83-84.
- Récupération des rôles d'un utilisateur
- Pour la récupération des procès-verbaux, passage des paramètre en query au lieu du body + ajout d'une sécurité si absence d'un paramètre.

## Partie Fronted
Le frontend est développé sous Angular 13.1.
L'implémentation a entièrement été réalisée par nous, nous allons détailler le fonctionnement de celui-ci.