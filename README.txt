WEBMAP INITIATIVE FLEUVE SENEGAL — DEMONSTRATEUR TDR V7
=========================================================

Cette version renforce l’ergonomie et la compatibilité avec du matériel ancien / écrans 4:3.

Principales évolutions V7 :
- polices et champs de formulaire agrandis ;
- filtres actifs mis en évidence par une légère couleur ;
- rappel des filtres actifs sous forme de pastilles supprimables individuellement ;
- bouton Réinitialiser replacé dans le bloc Filtres ;
- filtres complémentaires repliables pour limiter le défilement ;
- fonds de carte accessibles en permanence via un bouton, mais panneau fermé par défaut ;
- choix d’un fond => fermeture automatique du panneau ;
- bouton Vue générale clairement identifié ;
- options cartographiques regroupées dans un panneau repliable ;
- import Excel .xlsx / .xls et CSV ; Excel est recommandé ;
- modèle Excel fourni avec feuilles PROJETS, LISTES et AIDE et listes de validation ;
- contrôle du fichier avant import (colonnes, territoire, état, dates, nombres, doublons) ;
- mode 4:3 : synthèse escamotable pour préserver la largeur de carte ;
- mode petit écran : filtres et synthèse deviennent des panneaux ouvrables ;
- versionnage anti-cache des fichiers JS/CSS (?v=6.0).

Données :
- frontières Admin 0 réelles issues de Natural Earth ;
- Admin 1 / Admin 2 et projets restent fictifs/simplifiés dans cette maquette.

Déploiement GitHub Pages :
1. Décompresser le ZIP.
2. Remplacer les fichiers du dépôt GitHub par ceux-ci.
3. Commit changes.
4. Attendre le déploiement GitHub Pages.
5. Le versionnage v=6.0 réduit les problèmes de cache ; Ctrl+Shift+R reste utile si nécessaire.

V7 : ajout du réseau hydrographique (service public HydroSHEDS/FAO via ArcGIS avec secours local), emprise indicative du bassin, correction des boutons de popup.
