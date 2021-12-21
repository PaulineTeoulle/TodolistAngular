# PWA - TP3 - Todolist Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

# Fonctionnalités implémentées

- Copie du site todomvc (https://todomvc.com/examples/vanillajs/) - Ajouter item, Modifier item, Supprimer item, Cocher item, Filtres : Tous, Actifs, Completés
- Effacer tout
- Supprimer cochés
- Undo / Redo
- Edition du nom de la liste
- Reconnaissance Vocale
- Version Responsive
- Image pour la liste
- Génération de QR Code
- Ajout de couleur pour un item (ColorPicker)

# Problèmes rencontrés
- Upload d'image (problème au niveau du choix de conception : stockage dans le service ou dans le composant / stockage dans le localstorage ou dans le dossier assets, problèmes de sécurité des URL avec DomSanitizationService)
- Reconnaissance vocale ()

# Sources utilisées 
- Speech Recognition (https://hassantariqblog.wordpress.com/2016/12/04/angular2-web-speech-api-speech-recognition-in-angular2/)
- angularx-qrcode (https://www.npmjs.com/package/angularx-qrcode)
