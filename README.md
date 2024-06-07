# The Entity's Eye

## Description
Dead by Daylight is a popular multiplayer horror game. The proposed companion app aims to enhance the player experience by providing valuable in-game information and recommendations.

## Concept
- Provide access to match history for players.
- Enable in-game build imports with recommended builds.
- Display rankings of perks for easy reference. ( In second place if needed )

## Documentations

The documentation and the specification about the project can be found at the following link :

- [Documentatation and specification](https://docs.google.com/document/d/1pPUCyc_JfwYzJ2Bm7Ex-iM70dYkMCbuGdER47RNrFRI/edit?usp=sharing)

## Setting up
In order to run the app, you must first complete several steps:
1. Download and install [NodeJS](https://nodejs.org/).
After installing, run the following commands in a terminal of your choice:
```
node -v
npm -v
```
If they run successfully, proceed to the next steps.

2. Download and install the [Overwolf desktop client](https://download.overwolf.com/install/Download).

3. Download the repository as a zip file and extract it.

4. In your terminal, run the following commands:
```
cd <insert path to your extracted 'ts' folder here>
npm install
npm run build
```

5. Open the Overwolf desktop client settings (by right-clicking the client and selecting
"Support" or by clicking on the wrench icon in the dock and going to the "Support" tab).

6. Click on "Development options".

7. In the opened window, click on "Load unpacked extension" and select the `ts/dist/` folder.
This will add the app to your dock.

8. Click on the app's icon in your dock.

## Building an .opk for distribution
When you run run ```npm run build``` in your terminal, an .opk is created in releases/ directory

## Changing the version number quickly
We have included a webpack plugin that can change the .opk version quickly with just a command line argument. Simply add ```--env setVersion=1.0.1``` to your build command.
Example:
```
npm run build --env setVersion=1.0.1
```

This will change the app version both in package.json and app's manifest.json
  
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
