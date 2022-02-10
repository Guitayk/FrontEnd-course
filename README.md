# FR - Administration
Ce projet de gestion d'administration a pour objectif de nous former sur le framework Angular.

Réalisé par Valentin Lorand et Guillaume Malherbe (étudiant ESIR3 - SI). 

Lien vers le répertoire GitHub : [https://github.com/Guitayk/FrontEnd-course]()

## :house: Structure du projet
```bash
|-fr-administration-back : Partie backend du projet
|-fr-administration-front : Partie frontend du projet
|-images : Illustrations
```

## :rocket: Démarrer le projet

**Lancement du backend**
```bash
cd fr-administration-back
npm install
npm start
```

**Lancement du frontend**
```bash
cd fr-administration-front
npm install
npm start
```
## :microscope: Tester l'application Angular

**Tests unitaires**
```bash
cd fr-administration-front
npm test
```

Nous avons orienté nos tests end-to-end sur les formulaires notamment celui de connexion et ceux qui permettent de rechercher et de gérer les utilisateurs de l'application.
**Tests end-to-end avec cypress**
```bash
cd fr-administration-front
npm install -d
npm run cypress
```

## :one: Partie Backend
Le backend de ce projet est développé sous NestJS en Javascript.
Une implémentation déjà faite nous a été fournie. Pour contourner quelques erreurs d'implémentation, nous avons été amené à apporter quelques modifications ci-dessous listées :

- Modification de la suppression d'un membre d'une association (passage par query au lieu du body) + uniformisation du code lignes 83-84.
- Récupération des rôles d'un utilisateur
- Pour la récupération des procès-verbaux, passage des paramètre en query au lieu du body + ajout d'une sécurité si absence d'un paramètre.

## :two: Partie Frontend
Le frontend est développé sous Angular 13.1.
L'implémentation a entièrement été réalisée par nos soins, nous allons détailler le fonctionnement de celui-ci.

**Structure globale des pages**

![images/structure_globale.png](images/structure_globale.png)

Pour accéder aux différentes pages, il est nécessaire d'être connecté à l'application.
Pour se connecter il faut saisir l'id d'un utilisateur ainsi que son mot de passe associé. Ce n'est pas réellement un bonne pratique il faudrait que l'on puisse se connecter à l'aide d'un nom d'utilisateur mais le backend et la stucture de la base de données en place ne nous permet pas de changer cela.

Une fois connecté on accède à plusieurs fonctionnalités (elles sont listées sur la page d'accueil) :

- Accéder à son profil et mettre à jour ses informations.
- Lister les utilisateurs.
- Lister les associations.
- Modifier  les membres d'une association.
- Supprimer une association.
- Supprimer un utilisateur.
- Rechercher un utilisateur ou une association.
- Ajouter un utilisateur.
- Ajouter une association.
- Lister les rôles d'un utilisateur.

On peut accéder à l'ensemble des pages et des modales à travers des routes.

**Liste des routes disponibles**

:lock: -> Page uniquement accessible lorsqu'on est connecté.

- '' : Page de connexion
- '/login' : Page de connexion
- '/account' : Page de compte :lock:
- '/account/edit' : Modification des données du compte :lock:
- '/home' : Page d'accueil :lock:
- '/users' : Liste des utilisateurs :lock:
- '/users/create': Création d'un utilisateur :lock:
- '/users/:id': Visualiser un utilisateur :lock:
- '/associations': Liste des associations :lock:
- '/associations/create': Création d'une association :lock:
- '/associations/:name': Modifier une association :lock:

## Choix de conception et remarques 

Nous avons fait le choix de mettre les composants des modales dans le fichier des composants des pages associés. Angular génère suffisament de répertoires, nous avons jugé peu utile d'en ajouter sachant que les fichiers ne font pas plus de 300 lignes.

L'ensemble des services qui font le lien avec le backend sont centralisés dans le répertoire `services`.
Pour chaque objet que nous manipulons, nous avons une classe associée. On peut les retrouver dans le repertoire `dto`(Data To Object).

Nous avons également mis un garde fou qui "bloque" l'accès aux pages lorsque l'utilisateur n'est pas connecté. Etant donné que cela est géré du côté client ce n'est en rien une sécurité. Il faut vérifier au niveau du backend que l'utilisateur possède bien un token d'identification si on veut vraiment que ça soit un système sécurité.

Une autre vulnérabilité concerne les tokens, en effet, lorsqu'un utilisateur se connecte, on enregistre un token en dur qui représente l'id de l'utilisateur qui est connecté. Une personne malveillante pourrait changer l'id sauvegardé afin d'usurper l'identité d'un autre utilisateur.

Pour les rendus visuels nous avons utilisé une bibliothèque Material Angular avec le thème `Indigo & Pink`. Les tableaux, boutons, champs de texte, sélecteurs et modales sont mis en forme à l'aide de cette bibliothèque.

Concernant les illustrations, nous avons utilisé https://icones8.fr/ qui offre un grand nombre d'icones qui permettent de dynamiser les pages. En contrepartie, le site web demande d'être référencé au niveau du footer des pages.

Concernant la recherche via les filtres, nous avons mis en place des délais pour limiter le nombre de requêtes au serveur. Sans délai, à chaque ajout ou suppression de caractère, une requête est émise vers le backend. Cela multiplie énormement les requêtes qui peuvent surcharger le serveur. Avec du délai, on attends quelques millisecondes avant d'envoyer la requête. Si on observe que l'utilisateur continue de modifier le filtre, on attends qu'il ait finit avant de filtrer.