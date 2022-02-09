# FrAdministrationFront

**Fork : https://github.com/stephaniechallita/FrontEnd-course**
**Projet JXT : https://github.com/stephaniechallita/WebServer-course**

Pour la partie TP du module programmation frontend web, nous développerons un frontend d'une application web, basé sur le framework `Angular`.
`Angular` est écrit en Typescript et permet un grand nombre d'automatisations et procure un ensemble d'outils qui rend le développement d'un frontend agréable et simple.

## Pré-requis

Il vous faut [installer `NodeJS`](https://nodejs.org/en/download/) pour pouvoir installer et utiliser `Angular`.
Suivez la procédure en fonction de votre système d'exploitation.

L'IDE à utiliser est [VisualCode Studio](https://code.visualstudio.com/). Une fois installé, vous pouvez le lancer depuis
un terminal en vous plaçant dans le répertoire de votre projet et en tapant la commande : 

```shell
code .
```

Afin de tester le frontend, il faudra ouvrir un navigateur web. Vous pouvez utiliser la fonction `console.log(message);` pour afficher des messages, qui seront visibles dans la console de votre navigateur.
Suivant le navigateur que vous utilisez, l'accès à cette console peut différer : voir plus d'info [ici](https://balsamiq.com/support/faqs/browserconsole/).

## Modalités d'évaluation

Le projet sera réalisé en binôme. Il sera rendu sous la forme d'un projet privé sur le GitLab de l'ESIR/ISTIC. En plus du code source, vous devez fournir un rapport détaillant vos choix de conception de votre front. La présence de schémas explicatifs des liens entre vos composants sera appréciée. N'oubliez pas de compléter votre fichier README à la racine du projet GitLab. Vous devrez inviter vos évaluateurs au projet GitLab et lui envoyer l'adresse du projet par mail au plus tard **le vendredi 18/02/2021 à minuit**. La soutenance aura lieu le **21/02/2021**. Veuillez respecter l'ordre de passage qui sera disponible prochainement sur moodle. 

Les critères d'évaluations seront les suivants : 
- Soutenance de présentation du projet et compréhension des notions.
- Découpage de votre application en différents éléments Angular (composant, service, etc.).
- Gestion de votre dépôt git (nombre de commits et message, régularité et répartition des commits, etc.).
- Réalisation de tests.
- Design et ergonomie du site. 

Un design simple et efficace du site vous est demandé. L'utilisateur doit pouvoir naviguer facilement entre les différents composants sans avoir la présence de couleurs trop agressives ou être dérangé par un nombre conséquent de pop-up. Des points bonus peuvent être obtenus pour un design(ou ergonomie) plus évolué. 


## Projet

Comme dans [le module JXT](https://github.com/stephaniechallita/WebServer-course), le projet portera sur la numérisation de la gestion des associations par les services publics. 

Le backend réalisé dans le module de JXT vous permet de gérer les informations des associations et des utilisateurs, c'est-à-dire des personnes rattachées à une association. 

A la fin du projet de JXT, vous pouviez :
- gérer les utilisateurs : création, récupération, listing, mise à jour et suppression.
- gérer les associations : création, récupération, listing, mise à jour et suppression.

Dans le projet de JXC, vous allez réaliser le frontend de cette application web. 

Vous allez proposer un frontend sous **Angular** permettant de : 
- s'authentifier en tant qu'utilisateur,
- gérer un utilisateur : création, mise à jour et suppression,
- gérer une association : création, mise à jour et suppression,
- lister les utilisateur et les associations,
- rechercher un utilisateur ou une association.

La mise en place du projet et la procédure de communication avec le backend seront décrites au fur et à mesure du projet. Vous allez ensuite être libre de proposer et développer les différentes fonctionnalités votre application web. 
 
N'oubliez pas de regarder [le sujet du projet de JXT](https://github.com/stephaniechallita/WebServer-course), cela vous permettra de vous souvenir des différents `endpoints` créés dans l'application web. Mais aussi de vous souvenir des données d'un utilisateur et d'une association. 

Au cours du projet, vous avez la possibilité d'inclure des bibliothèques dans votre projet. N'oubliez pas de les lister en tant que dépendance de votre projet et de l'indiquer dans le fichier README.md.  


## Création d'un nouveau projet Angular (frontend en typescript) :

```sh
$ ng new fr-administration-front
? Do you want to enforce stricter type checking and stricter bundle budgets in the workspace?
  This setting helps improve maintainability and catch bugs ahead of time.
  For more information, see https://angular.io/strict (y/N)
  y
  y
  SCSS
```

S'il y a une erreur liée à `jasmine`, il suffit de lancer la commande : `npm install -g npm@6`, puis de refaire la génération avec la commande ci-dessus.

Vous êtes libre de choisir le type de feuille de style de votre projet (CSS, SCSS, Sass ou Less).

Maintenant, on peut lancer le front : 

```sh
$ ng serve --open
```

avec l'option `--open`, un browser se lancera et se connectera au front (par défault l'url est : `http://localhost:4200`).


## Exercice 1 : Liste d'objets avec Angular-Materials

Dans cet exercice, nous allons créer une page dédiée à une liste d'utilisateurs (`user`) en utilisant `Materials`.
Materials est une bibliothèque qui fournit un ensemble de composants Angular.

### Création d'un composant Angular

Pour créer un nouveau composant, on utilise la commande suivante :

```sh
$ ng g component users-list
CREATE src/app/users-list/users-list.component.scss (0 bytes)
CREATE src/app/users-list/users-list.component.html (25 bytes)
CREATE src/app/users-list/users-list.component.spec.ts (648 bytes)
CREATE src/app/users-list/users-list.component.ts (291 bytes)
UPDATE src/app/app.module.ts (647 bytes)
```

Ici, Angular nous génère plusieurs fichiers dans le répertoire `src/app/users-list` dont 
- `src/app/users-list/users-list.component.html` qui va contenir la structure du composant Angular ;
- `src/app/users-list/users-list.component.ts` qui va contenir le comportement du composant Angular.

L'un ne va pas sans l'autre.

Remarquez que Angular a aussi mis à jour le fichier `src/app/app.module.ts` avec un nouvel import.

### Routing

On va maintenant ajouter une nouvelle route pour associer une URL à notre nouveau composant Angular :

Dans `src/app/app-routing.module.ts` :

```diff
const routes: Routes = [
+  {
+    path: '',
+    component: UsersListComponent,
+  },
];
```

### Première édition

Éditez `app.component.html` pour qu'il ne contienne que la dernière ligne : `<router-outlet></router-outlet>`
On devrait voir que "users-list works!" maintenant sur une page blanche.
	
### Ajout de Angular Materials
 
Nous allons installer [`Materials`](https://material.angular.io/guide/getting-started):

```sh
$ ng add @angular/material
Installing packages for tooling via npm.
Installed packages for tooling via npm.
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]
? Set up global Angular Material typography styles? No
? Set up browser animations for Angular Material? Yes
UPDATE package.json (1281 bytes)
✔ Packages installed successfully.
UPDATE src/app/app.module.ts (756 bytes)
UPDATE angular.json (4005 bytes)
UPDATE src/index.html (566 bytes)
UPDATE src/styles.scss (181 bytes)
```

### Ajout d'un module Material
 
Dans `src/app/app.module.ts`, ajouter le `MatTableModule` aux imports :
 
```diff
+import {MatTableModule} from '@angular/material/table'; 
...
imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
+    MatTableModule
],
...
```
S'il y a un problème, relancez le frontend avec `ng serve --open`.
 
### Création de la classe User et d'un tableau contenant des enregistrements

Pour simuler un backend, nous allons créer, en dur dans le front, un tableau avec des instances de `user`.
Ajoutez dans le fichier `src/app/users-list/users-list.component.ts` le code suivant : 
 
```ts
export class User {
  constructor(
    public id: number,
    public lastname: string,
    public firstname: string,
    public age: number,
  ) {}
}
const users: User[] = [
  new User(0, 'Doe', 'John', 23),
  new User(1, 'Doe', 'Jane', 32),
]
```

### Ajout du tableau

On va ajouter un composant `mat-table` dans `src/app/users-list/users-list.component.html`:


```html 
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

    <ng-container matColumnDef="id">
      <th mat-header-cell *matHeaderCellDef> id </th>
      <td mat-cell *matCellDef="let user"> {{user.id}} </td>
    </ng-container>

    <ng-container matColumnDef="lastname">
      <th mat-header-cell *matHeaderCellDef> Lastname </th>
      <td mat-cell *matCellDef="let user"> {{user.lastname}} </td>
    </ng-container>
  
    <ng-container matColumnDef="firstname">
      <th mat-header-cell *matHeaderCellDef> Firstname </th>
      <td mat-cell *matCellDef="let user"> {{user.firstname}} </td>
    </ng-container>
  
    <ng-container matColumnDef="age">
      <th mat-header-cell *matHeaderCellDef> Age </th>
      <td mat-cell *matCellDef="let user"> {{user.age}} </td>
    </ng-container>
  
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
```

et dans `src/app/users-list/users-list.component.ts`

```diff
export class UsersListComponent implements OnInit {
+  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
+  dataSource = users;
  ...
```
  
un peu de css pour que ça fasse joli dans `src/app/users-list/users-list.component.scss` :

```css
table {
    margin: 10%;
    width: 75%;
}
```

Avec la Table de Materials, il y a plein de features cool à explorer : sorting, click log, etc. Voir plus d'info [ici](https://material.angular.io/components/table/overview).

## Exercice 2 : page de login, et première communication avec le backend

### Création d'un nouveau composant pour le login.
 
Créez un nouveau composant pour le login :

```sh
ng g component login 
```
 
### Mise à jour des routes
 
On va maintenant ajouter et modifier les routes de notre frontend. 
Ici, on veut que le chemin par defaut nous mène vers le nouveau composant `login`, tandis que l'url `/users` nous redirige vers le component précèdemment créé.

Toujours dans le fichier `src/app/app-routing.module.ts` :

```diff
const routes: Routes = [
+  {
+    path: '',
+    component: LoginComponent,
+  },
  {
+    path: 'users',
    component: UsersListComponent,
  },
];
```

### Création de la page de login

Pour créer la page de login, on va procèder par étape et ajouter des fonctionnalités petit à petit.

#### Création des deux champs du login

On va ajouter deux champs input avec leur label dans `src/app/login/login.component.html`:

```html
<div>
  <label for="username">Email</label>
  <input type="text" id="username" placeholder="username" />
  <label for="password">Password</label>
  <input type="password" id="password" placeholder="password" />
  <a><button>Login</button></a>
</div>
```

#### Logique derrière le click

On va maintenant ajouter de la logique sur le click du button login :

```diff
+ <a (click)="login()"><button>Login</button></a>
```

Ici, la directive `(click)="` va associer l'évènement du click sur le button, à une fonction.
Pour rappel, le fichier HTML donne la structure, et le fichier typescript donne la logique.
Il faut donc implémenter la fonction `login()` dans notre fichier `src/app/login/login.component.ts` pour que cela fonctionne.
  
```ts
login(): void {
    console.log('click on login !')
}
```
  
Cliquez sur le button et observer dans la console (click droit inspect -> console) que le message s'affiche correctement.

#### Récupération des données des champs

On veut maintenant lire les données saisies par l'utilisateur dans les champs de la page login.

Dans les fichiers typescript des composants Angular, on a accès à la page HTML grâce à la variable globale `document`.
On peut ainsi manipuler la page HTML depuis notre fichier TS.
Plus particulièrement, on peut récupérer des éléments via leur id (au sens HTML/CSS) avec la fonction `getElementById(str)`.

Pour récupérer les informations, il suffit alors de faire :

```diff
login(): void {
-   console.log('click on login !')
+   const email: string = (document.getElementById('username') as HTMLInputElement).value;
+   const password: string = (document.getElementById('password') as HTMLInputElement).value;
+   console.log(email, password);
  }
```

On pourra alors observer dans la console les valeurs saisies par l'utilisateur.

#### Mise en place de la communication avec le backend

Récupérez l'archive `backend.zip`, décompressez-la et lancez le backend avec la commande suivante :

```sh
$ node dist/main.js
[Nest] 862716   - 10/22/2021, 6:25:42 PM   [NestFactory] Starting Nest application...
[Nest] 862716   - 10/22/2021, 6:25:42 PM   [InstanceLoader] AppModule dependencies initialized +175ms
[Nest] 862716   - 10/22/2021, 6:25:42 PM   [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 862716   - 10/22/2021, 6:25:42 PM   [InstanceLoader] PassportModule dependencies initialized +0ms
[Nest] 862716   - 10/22/2021, 6:25:42 PM   [InstanceLoader] JwtModule dependencies initialized +0ms
[Nest] 862716   - 10/22/2021, 6:25:42 PM   [InstanceLoader] AuthModule dependencies initialized +2ms
[Nest] 862716   - 10/22/2021, 6:25:42 PM   [InstanceLoader] TypeOrmCoreModule dependencies initialized +78ms
...
```

Si des erreurs se produisent, vérifier si vous avez SQLite3 d'installé (`npm install sqlite3 `). 

Le backend est en train de tourner.
  
On va maintenant ajouter à notre front, la capacité d'envoyer des requêtes.
Pour cela, ajoutez le module `HttpClientModule` dans les `imports` du fichier `src/app/app.module.ts`:

```diff
imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
+    HttpClientModule,
],
```

Dance ce module, la classe `HttpClient` nous offre des fonctions pour faire diverses requêtes sur notre backend: `get()`, `post()`, `put()`, `delete()`.
En fait, elle nous offre toutes les méthodes de requêtes dont on a besoin pour développer un service fullstack (front + back) REST.

#### Modification de la liste des utilisateurs

Pour commencer en douceur la communication, on va récupérer la liste des utilisateurs depuis le backend plutôt que d'utiliser une liste en dur dans le frontend.

Injecter le service `HttpClient` dans le composant de la liste (`src/app/users-list/users-list.component.ts`) :

```ts
constructor(
    private http: HttpClient
) {}
```

On va maintenant modifier la fonction `ngOnInit` de notre `UsersListComponent`.
Cette fonction est appelée au moment où le composant est initialisé.

```
const resquest: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
resquest.toPromise().then(response => this.dataSource = response.body);
```

Vous pouvez réaliser une souscription à l'observable `resquest` à la place des promesses.

Relancez le front, et connectez-vous à l'URL `https://localhost:4200/users`.

On peut maintenant supprimer le tableau `users` du front (car maintenant on le récupère depuis le backend).

```diff
-export class User {
-  constructor(
-    public id: number,
-    public lastname: string,
-    public firstname: string,
-    public age: number,
-  ) {}
-}
-const users: User[] = [
-  new User(0, 'Doe', 'John', 23),
-  new User(1, 'Doe', 'Jane', 32),
-]
...
- dataSource = users;
+ dataSource = [];
```

#### Requête auprès du backend pour le login

On va maintenant modifier la fonction `login()` de `src/app/login/login.component.ts` afin de faire une requête `POST` sur le backend.

On utilise ici l'api-helper, qui évite de gérer les requêtes dans les differents components. Récupérez le fichier `api-helper.service.ts` et copiez-le dans un nouveau dossier `src/app/services`.

```diff
+constructor(
+      private api: ApiHelperService
+) {}
login(): void {
  const username: string = (document.getElementById('username') as HTMLInputElement).value;
  const password: string = (document.getElementById('password') as HTMLInputElement).value;
+  this.api.post({endpoint: '/auth/login', data: { username, password },}).then(response => console.log(response));
}
```

Retournez sur l'addresse `http://localhost:4200`, et renseignez les informations suivantes : `username = 1` et `password = password`, puis cliquez sur le bouton login.
Dans la console, vous devriez observer quelque chose comme cela :

```json
Object { access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6MSwiaWF0IjoxNjM1MzcxODUyLCJleHAiOjE2MzUzNzE5MTJ9.5GO-V4LXYdYzEZrqADODykldKKaXCpsQ-prEQjrahHM" }
```

Qui est le JWT retourné par le backend en cas de login réussi.

#### Sauvegarde du JWT et interceptors

On veut maintenant que, une fois authentifié, notre frontend sauvegarde le token et l'envoie dans toutes les requêtes suivantes.
Pour ce faire, nous allons utiliser un `interceptor`, qui va intercepter toutes les requêtes pour y ajouter le token automatiquement, et ainsi sa gestion sera transparente pour le développement.

Créez le fichier `src/app/services/token-storage.service.ts` et y mettre :

```ts
import { Injectable } from '@angular/core';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public clear(): void {
    localStorage.clear();
  }
  public save(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY );
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
  }
  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }
  public isLogged(): boolean {
    return (Boolean)(localStorage.getItem(IS_LOGGED_IN));
  }
}
```

Les navigateurs web permettent de stocker des données côtés navigateur. L'API WebStorage permet de stocker des données sous la forme clé/valeur. Ces données peuvent être récupérées facilement. Deux types de structures sont possibles :  
`localStorage` et `sessionStorage`. La différence entre ces deux structures concerne la persistance des données. `localStorage` que nous allons utiliser dans le projet mémorise les données sans limite de durée du vie. Elle ne sont pas éffacée lors de la fermeture d'un onglet ou du navigateur.

Les navigateurs web permettent de visualiser les différents espaces de stockage accessible. Ouvrez les outils de développement de votre navigateur, puis déplacez-vous à l'onglet `stockage`. Vous y trouverez tous les espaces de stockage de votre navigateur ainsi que les couples de données stockés. Recherchez les informations enregistrées par la classe `TokenStorageService`. Vous pouvez supprimer manuellement les informations stockées dans le `localStorage`. 

Modifiez le fichier `src/app/login/login.component.ts` pour enregistrer le JWT dans le `TokenStorageService` :

```diff
constructor(
    private api: ApiHelperService,
+    private tokenStorageService: TokenStorageService,
  ) {}
  ngOnInit() {
  }
  login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({endpoint: '/auth/login', data: { username, password },})
-      .then(response => console.log(response));
+      .then(response => this.tokenStorageService.save(response.access_token));
  }
```

Créez le fichier `src/app/interceptors/token.interceptor.ts`:

```ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
@Injectable({
  providedIn: 'root',
})
export class TokenHttpInterceptor implements HttpInterceptor {
  constructor(
    private service: TokenStorageService
  ) {}
  // C'est dans la fonction intercept qu'on implémente la logique
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // On récupère le token depuis le TokenStorageService
    const token = this.service.getToken();
    // s'il n'est pas initialisé, on envoie la requête telle qu'elle est
    if (!token) { 
      return next.handle(request);
    }
    // Si non, on va injecter le token dedans :
    const updatedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    // et envoyer la requête avec le token
    return next.handle(updatedRequest).pipe(
      tap(
        (event) => {},
        (error) => {}
      )
    );
  }
}
```

et modifiez `src/app/app.module.ts` :

```diff
+import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort';
+import { TokenHttpInterceptor } from './interceptors/token.interceptor';
 @NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [
+    {
+      provide: HTTP_INTERCEPTORS,
+      useClass: TokenHttpInterceptor,
+      multi: true,
+    },
  ],
  bootstrap: [AppComponent]
 })
```

Maintenant, à chaque requête HTTP, le token de l'utilisateur sera attaché automatiquement. 
Lorsqu'un token expire, cela génère généralement un code `401 Unauthorized`. Cela nous donne une indication afin de savoir si l'utilisateur doit s'authentifier pour obtenir un nouveau token.  

```diff
  //et envoyer la requête avec le token
  return next.handle(updatedRequest).pipe(
    tap(
      (event) => {},
      (error) => {
+        if(error instanceof HttpErrorResponse){
+          if (error.status === 401){
+            //Redirection pour que l'utilisateur se reconnecte
+            this.router.navigateByUrl('/login');
+          }
+        }
      }
    )
  );
```

Vous allez maintenant compléter la méthode `login` de la classe `LoginComponent`. Une fois l'utilisateur authentifié, la fonction `isLogged()` du service `token-storage` retourne `true`. Dans ce cas, une redirection sera effectuée pour que l'utilisateur soit redirigé vers l'URL `/users` (`UsersListComponent`). A l'inverse si l'utilisateur n'est pas connecté, indiquer à l'utilisateur que le couple login/mot de passe est incorrect. 

Testez de nouveau la connexion avec les deux indentifiants suivant : 
- `username = 1` et `password = password`
- `username = 2` et `password = hello`

Et observer les résultats dans la console, le stockage et le navigateur. 
Pour rappel, vous pouvez supprimer manuellement les informations du localstorage. 

#### Mise en place de Guard

Vous allez tester l'accès au composant `UserListComposant` pour une personne connecté et une personne non connecté (route `/users`). 

Que remarquez-vous ? 

Nous voulons que l'accès à la route `/users` soit seulement autorisé aux utilisateurs authentifiés. Nous allons créer une `guard` `auth` et l'associer à la route `users`.  
Les guards ne doivent pas être considérés comme un mécanisme de sécurité. Ils doivent servir à améliorer l'expérience utilisateur en évitant l'accès à des routes qui ne fonctionneraient pas car l'accès au données serait rejeté par le backend. 

Une guard va être un service dont la classe TS va implémenter une des interfaces suivantes : 
- `CanActivate` (vérification pour visiter une route)
- `CanDeactivate` (vérfication pour quitter une route)
- `CanActivateChild` (vérification pour visiter les routes enfants)
- `CanLoad` (vérification pour visiter une route d'un module défini avec un lazy loading).

Créer la guard avec la commande suivante : `ng generate guard guards/auth --implements CanActivate`. 

Le contenu du fichier `auth.gard.ts` est le suivant : 

```
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
```

La méthode `canActivate` retourne toujours `true`. Elle ne fait pour l'instant aucun contrôle. `ActivatedRouteSnapshot` va permettre de récupérer les paramètres envoyés pour la route et `RouterStateSnapshot` permet par exemple de récupérer l'URL de la route. 

Nous allons maintenant lier la guard à la route `/users`. Modifiez le fichier `app-routing.module.ts`. 

```diff
+import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersListComponent,
+    canActivate: [AuthGuard]
  },
  {path: '', redirectTo:'login', pathMatch:'full'}
];
```

Nous avons indiqué à la route concernée que son activation dépend de la guard `AuthGard`. Il est possible de mettre plusieurs guards à une seule route. Elles sont toutes vérifiées et la route ne sera active que si elle renvoient toutes la valeur `true`. 

Nous allons maintenant indiquer dans la méthode `canActivate` de la guard `AuthGard` dans quel cas la route `/users` peut être active. 

Modifiez le fichier `auth.gard.ts` en injectant le service `TokenStorageService` : 

```diff
export class AuthGuard implements CanActivate {

+  constructor(
+    private router: Router,
+    private service: TokenStorageService
+  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
+      if(this.service.isLogged()){
+        console.log("AuthGard : true");
+        return true;
+      }
+      else {
+        console.log("AuthGard : false");
+        this.router.navigateByUrl('/login');
+        return false;
+      }
  }
  
}
```

Testez de nouveau l'accès à la route `/users` en étant authentifié et sans l'être. Si l'utilisateur n'est pas identifié, il doit être redirigé vers le formulaire de login. 


## Exercice 3 : barre de navigation et déconnexion

### Création du composant nav

Vous allez créer un composant `NavComponent` pour représenter la barre de navigation : `ng generate component nav`.

Dans un premier temps, la barre de navigation n'aura aucun item. Vous allez devoir les ajouter au fur et à mesure du déroulement du projet. 

La barre de navigation ne va pas s'afficher sur la page de login. Elle s'affichera uniquement sur les pages où l'utilisateur est connecté. Pour le début de l'exercice, nous allons insérer le composant dans le fichier `users-list.component.html` lié au composant `UsersListComponent`. 

### Création du bouton logout

Dans le fichier `nav.component.html`, ajouter un bouton permettant à l'utilisateur de se déconnecter. 

```html
<div>
  <button>Logout</button>
</div>
```

Vous pouvez ajouter une donnée booléenne `isLogged` dans la classe `NavComponent` et l'initialiser via le service `TokenStorageService`. Cette donnée booléenne peut être utiliser avec la directive `ngIf` dans la balise `button` pour afficher le bouton que si l'utilisateur est connecté. 

### Logique derrière le click

Ajoutez un évènement lié au clic de la souris sur le bouton. La méthode `logout`, à ajouter dans la classe `NavComponent`, devra être appelée. 

```ts
logout(): void {
    console.log("click on logout !");
}
```

Vérifiez que le message s'affiche dans la console après l'action sur le bouton. 

Lorsqu'un utilisateur se déconnecte, nous allons supprimer les informations stockées dans le `localstorage` du navigateur et rediriger l'utilisateur sur la page de login. 

Modifiez la fonction précédente : 

```diff
logout(): void {
    console.log("click on logout !");
+    this.service.clear();
+    this.route.navigateByUrl("/login");
}
```

Testez cette nouvelle fonctionnalité : l'utilisateur doit être déconnecté, redirigé vers la page de login et les éléments du `localstorage` supprimés. 


## Exercice 4 : Réalisation du projet

A cette étape, nous avons vu comment réaliser des requêtes avec le backend et comment s'authentifier (avec un token et la mise en place d'une guarde). Ce principe sera à reprendre pour toutes les prochaines fonctionnalités demandées.

Vous pouvez modifier les routes et les liens entre les différents composants que vous venez de réaliser dans les exercices précédents. 

L'application web proposera une page de login comme décrite dans l'exercice 2. Vous pouvez modifier le design de votre formulaire. 

Une fois identifié, l'utilisateur pourra :
- Accéder à son profil et mettre à jour ses informations. 
- Lister les utilisateurs.
- Lister les associations.
- Rechercher un utilisateur ou une association par son Id ou son nom. 
- Accéder à la fiche d'un utilisateur ou d'une association.
- Supprimer une association ou un utilisateur.
- Ajouter un utilisateur.
- Modifier une association.
- Ajouter une association (en bonus).

Attention, la création d'une association est à réaliser en [plusieurs étapes](https://github.com/stephaniechallita/WebServer-course/blob/master/developpement.md). 

N'oubliez pas d'écrire différents tests pour votre application web (différents de ceux générés par défaut via Angular CLI).