# Open World Lego

## Description
Dead by Daylight is a popular multiplayer horror game. The proposed companion app aims to enhance the player experience by providing valuable in-game information and recommendations.

## Concept
- Provide access to match history for players.
- Enable in-game build imports with recommended builds.
- Display rankings of perks for easy reference. ( In second place if needed )


## Documentations

The documentation and the specification about the project can be found at the following link :

- [Documentatation and specification](https://docs.google.com/document/d/1pPUCyc_JfwYzJ2Bm7Ex-iM70dYkMCbuGdER47RNrFRI/edit?usp=sharing)
  
## Diagram of branches
```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base', 'gitGraph': {'showBranches': true}} }%%
gitGraph
   commit id:"c0"
   commit id:"c1"
   branch dev
   checkout dev
   commit id:"c2"
   branch featureName
   commit tag:"Adding a new feature" id:"c3"
   checkout dev
   branch dev_backup
   checkout featureName
   commit id:"c4"
   checkout dev
   merge featureName tag:"Merge request required"
   checkout main
   merge dev tag:"version 1"
   checkout dev
   commit id:"c5"
   branch bugBugName
   commit tag:"Fixing bug" id:"c6"
   commit id:"c7"
   checkout dev
   merge bugBugName tag:"Merge request required"
   commit id:"c8"
   checkout dev_backup
   merge dev
   checkout main
   merge dev tag:"version 2"
   commit id:"c9"
   
```
## Support
- Techninal Project : https://docs.google.com/document/d/1pPUCyc_JfwYzJ2Bm7Ex-iM70dYkMCbuGdER47RNrFRI/edit?usp=sharing

## Contact
- Project manager : romain.miras@gmail.com
- Git manager : romain.miras@gmail.com

## Authors
- Romain MIRAS @RomainMIRAS
- InspecteurCF @InspecteurCF