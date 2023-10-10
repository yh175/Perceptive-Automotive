# Perceptive Automotive

## Modélisation

### Use case
<img src="./UML/use-case.png" alt="Use Case Diagram" />

## Architecture de l'infrastructure
<img src="./images/client-serveur-bdd.jpeg" alt="Architecture client-serveur-bdd" />

## Architecture logicelle

### Architecture en couches 3-tiers
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Overview_of_a_three-tier_application_vectorVersion.svg/1024px-Overview_of_a_three-tier_application_vectorVersion.svg.png" alt="Architecture 3-tiers" />

## Installation du simulateur Carla

* Installer miniconda: https://docs.conda.io/projects/miniconda/en/latest/
* Créer un environnement virtuel: **conda create --name carla python=3.8**
* Activer cet environnement: **conda activate carla**
* Installer les packages: **pip install -r Embarqué\ -\ Automotive/requirements.txt**
* Installer le serveur Carla: https://github.com/carla-simulator/carla/releases (dézipper puis lancer l'executable). Les clients pourront y accéder via localhost:2000.