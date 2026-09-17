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


V8 - ERGONOMIE ET CONDITIONS REELLES D'UTILISATION
- Suppression du fond "OSM France".
- Panneaux Filtres / Synthese repliables et redimensionnables a la souris sur ecran large.
- Double-clic sur une poignee de panneau : retour a la largeur par defaut.
- Bouton plein ecran avec sortie plein ecran sans recourir a F11.
- Mode Jour / Nuit memorise dans le navigateur ; le mode nuit utilise un fond sombre.
- Alerte discrete en cas de mode hors ligne, connexion 2G / economie de donnees ou erreurs repetitives de tuiles.
- Les donnees IFS, filtres et indicateurs continuent a fonctionner meme si le fond cartographique est lent ou indisponible.


V9 - Selection cartographique
- suppression de la pastille permanente Bassin du Fleuve Senegal - 4 pays
- mode nuit independant du fond de carte
- suppression du fond sombre CARTO necessitant une cle API
- clic sur une unite Admin 2 : surbrillance animee, popup courte et detail dans le panneau droit
- clic sur un projet : detail dans le panneau droit, puis Voir sur la carte avec animation de reperage
- popup libre Vue terrain / Google Maps conservee pour les clics hors polygones

V11 : clic simple sur une unite Admin 2 = synchronisation des filtres + panneau droit + animation ; double-clic = popup ; boutons de repli repositionnes sur les separateurs.

V11 : clic simple sur Admin 2 = consultation du panneau droit sans modifier les filtres. Les listes de filtres sont facettees et tout changement de filtre ramene automatiquement le panneau droit a la vue d ensemble filtree.


V13 — TEST DONNEES REELLES GUINEE
- 4 projets reels issus de la presentation du 4e atelier Initiative Fleuve Senegal (Labe, 13-14 novembre 2024).
- Couvertures par prefecture reproduites d'apres les cartes publiees : PGIRN-PBF, MBOP/PNMB, PGIRN-MFD, Femmes Pro-Forets.
- Limites ADM2 de Guinee chargees dynamiquement depuis GeoBoundaries (source WFP/OCHA, licence CC BY 3.0 IGO). Si indisponible : geometries de secours.
- Les projets des autres pays restent fictifs et servent uniquement a tester le demonstrateur.
- Source IFS : https://www.groupe-initiatives.org/IMG/pdf/cartographies_des_projets_en_cours_dans_le_hbfs-v4.pdf

V14 — REFERENTIEL ADMINISTRATIF + IMPORT PROJET x ADMIN2
- Correction majeure V13 : le chargement des limites ADM2 réelles de Guinée est maintenant exécuté au démarrage (il était placé par erreur dans le flux d'import).
- Les limites sont chargées depuis geoBoundaries gbOpen GIN ADM2 (source WFP/OCHA, année représentée 2017).
- Si le référentiel distant est indisponible, les rectangles fictifs de Guinée sont masqués plutôt que présentés comme des limites réelles.
- Modèle d'import clarifié : aucune géométrie dans Excel/CSV ; une ligne = un projet x une unité Admin2.
- Un même ID projet peut être répété sur plusieurs Admin2 ; l'application reconstitue une fiche projet unique et sa couverture multi-territoires.
- Le modèle Excel et le CSV d'exemple illustrent ce mécanisme.
