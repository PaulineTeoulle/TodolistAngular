# PWA - TP3 - Todolist Angular

# Installation du projet

## Cloner le projet 
`
   git clone https://github.com/PaulineTeoulle/TodolistAngular.git
   cd TodolistAngular
`
## Installation des dépendances: 
`
  npm install
`
## Serveur de développement

Pour lancer le projet 
 `ng serve` ou `npm start`
 
Le projet sera disponible à l'adresse suivante :  <http://localhost:4200/>

# Fonctionnalités implémentées

- Copie du site todomvc (https://todomvc.com/examples/vanillajs/) 
 >  Ajouter item, Modifier item, Supprimer item, Cocher item, Filtres : Tous, Actifs, Completés
 
- Effacer tout 
 > Ajout d'une icone de poubelle dans le footer. 
 > Cliquer sur l'icone permet de supprimer tous les items de la liste. 

- Supprimer cochés
 > Ajout d'un bouton "Supprimer cochés" dans le footer. 
 > Cliquer sur l'icone permet de supprimer tous les items cochés de la liste.

- Undo / Redo
> Ajout d'une icone de flèche vers la gauche et d'une icone de flèche vers la droite dans le footer. 
> Cliquer sur les icones permet d'annuler l'action précédente ou de refaire l'action.

- Edition du nom de la liste
 > Double-cliquer sur le nom de la liste permet de modifier le nom de celle-ci et appuyer sur la touche "Entrée" permet de sauvegarder ce changement. 

- Reconnaissance Vocale
 > Ajout d'une icone de microphone. 
 > Cliquer sur l'icone déclenche la reconnaissance vocale et ajoute à la liste le texte entendu par l'ordinateur.

- Ajout d'image pour la liste
  > Ajout d'un bouton pour choisir un fichier. 
  > Ajout de l'image choisie à la liste.

- Génération de QR Code
>  Ajout d'un QR Code généré automatiquement représentant la liste au format JSON. 
>  (Attention, l'ajout d'image pour la liste génère un QR Code assez complexe, il est préférable de le tester sans image)

- Ajout de couleur pour un item (ColorPicker) 
 > Ajout d'une couleur aléatoire lors de l'ajout d'un item dans un cercle de couleur.
 > Cliquer sur le cercle de couleur puis sur le rectangle de couleur (colorPicker) pour modifier la couleur de l'item. L'autofocus off ou la touche "Entrée" permet de         sauvegarder.

# Problèmes rencontrés
- CSS Responsive non implémenté (difficultés au niveau de la structure et du css déjà donné, j'ai eu du mal à adapter ce que je voulais faire donc j'ai préféré me focaliser sur les fonctionnalités)
- Upload d'image (difficultés au niveau du choix de conception : stockage dans le service ou dans le composant / stockage dans le localstorage ou dans le dossier assets, problèmes de sécurité des URL avec DomSanitizationService)
- Reconnaissance vocale (difficulté lors de l'implémentation : setup des paramètres, récupération des données, etc...).

# Avis Personnel

La prise en main d'Angular a été un peu compliquée au début.
L'application pourrait être très largement améliorée (CSS Responsive et interfaces plus "user friendly", ajout de fonctionnalités...).

# Sources utilisées 
- Speech Recognition (https://hassantariqblog.wordpress.com/2016/12/04/angular2-web-speech-api-speech-recognition-in-angular2/)
- angularx-qrcode (https://www.npmjs.com/package/angularx-qrcode)
