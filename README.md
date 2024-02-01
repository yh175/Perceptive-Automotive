# Perceptive Automotive

### Cas d'utilisation
<img src="./UML/use-case.vpd.jpg" alt="Use Case Diagram" height="400" />

## Architecture de l'infrastructure embarquée
<img src="./images/sensor_info.webp" alt="Architecture embarquée" height="400" />

## Architecture de l'infrastructure SaaS
<img src="./images/client-serveur-bdd.jpeg" alt="Architecture client-serveur-bdd" height="250" />

### Diagramme de séquence
<img src="./UML/jwt-sequence-diagram.png" alt="Diagramme de séquence SaaS" height="250" />

## Architecture logicelle

### Architecture en couches 3-tiers
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Overview_of_a_three-tier_application_vectorVersion.svg/1024px-Overview_of_a_three-tier_application_vectorVersion.svg.png" alt="Architecture 3-tiers" height="350" />

## Installation du simulateur Carla

* Installer miniconda: https://docs.conda.io/projects/miniconda/en/latest/
* Créer un environnement virtuel: `conda create --name carla python=3.8`
* Activer cet environnement: `conda activate carla`
* Installer les packages: `pip install -r Embarqué\ -\ Automotive/requirements.txt`
* Installer le serveur Carla: https://github.com/carla-simulator/carla/releases (dézipper puis lancer l'executable). Les clients pourront y accéder via localhost:2000.

### Generate dataset
```bash
python generate_traffic.py -n 100 -w 50
python manual_control.py
```
* Appuyer sur la touche 'R' pour enregistrer le comportoment de l'expert
