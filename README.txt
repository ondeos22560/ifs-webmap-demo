WEBMAP INITIATIVE FLEUVE SENEGAL — DEMONSTRATEUR
=================================================

1. Ouvrir index.html dans Chrome, Edge ou Firefox.
2. Une connexion Internet est nécessaire pour charger Leaflet et les fonds OpenStreetMap / OpenTopoMap.
3. Les projets 2021-2026 et les géométries Admin 2 sont des DONNEES DE DEMONSTRATION FICTIVES.
4. Le bouton « Importer un CSV » lit un fichier côté navigateur et l'ajoute temporairement à la session.
   Exemple fourni : sample_projects.csv
5. Aucun serveur ni base de données n'est nécessaire pour cette maquette.

Fonctions incluses
------------------
- Carte Leaflet responsive
- 4 pays / Admin 1 / Admin 2 de démonstration
- Filtres croisés : territoire, organisation, thématique, bailleur, partenaire, état, période
- Recalcul dynamique de la carte, des indicateurs, graphiques et listes
- 5 indicateurs cartographiques
- Liste de projets et fiche projet détaillée
- Couche historique 2010-2020 illustrée
- Deux fonds de carte
- Import CSV local + fichier modèle
- Présentation compatible iframe

Pour une version de production
-------------------------------
- Remplacer les géométries simplifiées par les limites administratives officielles validées.
- Stocker les projets dans une base (PostgreSQL/PostGIS ou solution plus légère selon hébergement).
- Créer un véritable module d'administration/import avec validation et journal d'erreurs.
- Ajouter authentification pour l'administration, sauvegardes, logs et procédure de restauration.
- Valider charte graphique, accessibilité, RGPD, SEO, sécurité et performances.
- Prévoir la couche historique réelle issue du Traverse n°50.
