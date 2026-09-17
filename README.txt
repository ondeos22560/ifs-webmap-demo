WEBMAP INITIATIVE FLEUVE SENEGAL - DEMONSTRATEUR V2
====================================================

Version V2 : améliorations UX demandées lors du test.

Nouveautés principales
- bouton de mise à jour CSV placé en haut du panneau de filtres ;
- filtres complémentaires repliables pour limiter le scroll ;
- contrôle du CSV avant import : colonnes, champs vides, territoire, statut, années, bénéficiaires, doublons possibles ;
- import impossible tant que des erreurs bloquantes sont présentes ;
- téléchargement d'un modèle CSV ;
- zoom automatique après sélection d'un pays, d'une région, d'une unité Admin 2 ou d'un autre filtre de données ;
- frontières nationales renforcées au-dessus du fond de carte ;
- libellés pays ;
- 6 fonds de carte : Plan OSM, Clair, Voyager, Humanitaire, Relief, Satellite ;
- badge indiquant l'emprise courante de la carte.

IMPORTANT
- Les projets 2021-2026 et les Admin 2 restent des DONNEES DE DEMONSTRATION FICTIVES.
- Les limites nationales utilisées pour l'habillage sont simplifiées (Natural Earth 1:110m).
- Pour la production, utiliser les limites administratives officielles/validées du projet.
- L'import CSV de cette maquette ajoute les données uniquement dans la session du navigateur. Une version de production devra écrire dans un stockage persistant.

Publication GitHub Pages
Remplacer dans le dépôt les fichiers index.html, app.js, style.css, sample_projects.csv et README.txt. La même URL GitHub Pages sera ensuite redéployée automatiquement.
