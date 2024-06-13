

import { Perk } from '../model/CharacterSide/Perk';
import { Character} from '../model/CharacterSide/Character';
import $, { get } from "jquery";
import { AbstractBuild } from '../model/Build/AbstractBuild';
import { Item } from '../model/CharacterSide/Item';
import { Addon } from '../model/CharacterSide/Addon';
import Papa from 'papaparse';
import { KillerBuild } from '../model/Build/KillerBuild';
import { SurvivorBuild } from '../model/Build/SurvivorBuild';

export class ApiService{
    private baseUrlAPI: string = "https://dbd-info.com";

    public characterMap: Map<number, Character>;
    private perkMap: Map<string, Perk>;
    private itemMap: Map<string, Item>;
    private addonMap: Map<string, Addon>;
    private buildMap: Map<string, AbstractBuild>;

    private static _instance: ApiService;
  
    private constructor() {
        this.characterMap = new Map<number, Character>();
        this.perkMap = new Map<string, Perk>();
        this.itemMap = new Map<string, Item>();
        this.addonMap = new Map<string, Addon>();
        this.buildMap = new Map<string, AbstractBuild>();
    }

    public initApiService(){ 
        try {
            this.initCharacterMap();
            this.initPerkMap();
            this.initOtzdarvaBuild();
        } catch (error) {
            console.error("Failed to initialize ApiService: " + error);
        }
    }
  
    public static instance() {
      if (!this._instance) {
        this._instance = new ApiService();
        this._instance.initApiService();
      }
  
      return this._instance;
    }

    // Main function
    protected initCharacterMap(){
        $.ajax({
            async: false,
            url: this.baseUrlAPI + "/api/characters",
            type: "GET",
            success: (response) => {
                try {
                    if (response.success) {
                        this.parseCharacters(response.data);
                    } else {
                        console.error("Failed to fetch characters: " + response.message);
                    }
                } catch (error) {
                    console.error("Failed to fetch perks: " + error);
                }
            },
            error: (response) => {
                console.error("Failed to fetch perks");
            }
        });
    }

    protected initPerkMap(){
        $.ajax({
            async: false,
            url: this.baseUrlAPI + "/api/perks",
            type: "GET",
            success: (response) => {
                try {
                    if (response.success) {
                        this.parsePerks(response.data);
                    } else {
                        console.error("Failed to fetch perks: " + response.message);
                    }
                } catch (error) {
                    console.error("Failed to fetch perks: " + error);
                }
            },
            error: (response) => {
                console.error("Failed to fetch perks");
            }
        });
    }

    /**
     * Parsing Response from API of DBD-INFO
     * @param response 
     */
    protected parseCharacters(response: JSON){
        for (let i in response){
            let character = response[i];


            // Création du character
            let newCharacter = new Character(
                i,
                character.Id,
                character.Name,
                character.Role,
                character.Difficulty,
                character.Gender,
                character.Biography,
                character.BackStory,
                character.ParentItem,
                character.Dlc,
                this.baseUrlAPI + character.IconFilePath,
                this.baseUrlAPI + character.BackgroundImagePath
            );
            // conversion de la string en number
            this.characterMap.set(parseInt(i), newCharacter);
        }
    }

    protected parsePerks(response: JSON){
        for (let i in response){
            let perk = response[i];

            // Description base on tunnable
            let description = perk.Description;
/*             if (perk.Tunables !== null){
                for (let j in perk.Tunables){
                    if (perk.Tunables[j].length == 1){
                        description = description.replace("{" + j + "}", perk.Tunables[j]);
                    } else if (perk.Tunables[j].length == 3){
                        description = description.replace("{" + j + "}", perk.Tunables[j][0] + "/" + perk.Tunables[j][1] + "/" + perk.Tunables[j][2]);
                    }
                }
            } */
            
            let newPerk = new Perk(
                i,
                perk.Categories,
                perk.Name,
                description,
                perk.Role,
                perk.Character,
                perk.TeachableLevel,
                this.baseUrlAPI + perk.IconFilePathList
            );
            this.perkMap.set(i, newPerk);
            
            //Add this perk to the character link if character not null
            // Otherwise, it's a global perk
            if (perk.Character !== null){
                let character = this.characterMap.get(perk.Character);
                if (character !== undefined){
                    character.addPerk(newPerk);
                }
            }
        }
    }

    public initOtzdarvaBuild(){
        const url = "https://docs.google.com/spreadsheets/d/1uk0OnioNZgLly_Y9pZ1o0p3qYS9-mpknkv3DlkXAxGA/export?format=csv&gid=1886110215";
        var thisBefore = this;
        $.ajax({
            async: false,
            url: url,
            type: "GET",
            success: (response) => {
                // Parse csv file
                    Papa.parse(response, {
                        complete: function (result) {
                            // console.log(result);
                            result = result.data;
                            let ret = Object.create(null);

                            // Parse all killers
                            for (let i = 10; i < result.length; i += 13) {
                                thisBefore.parseOtzdarvaBuildCharacter("killer", result, i, 1);
                            }
                            // Parse all survivors
                            for (let i = 10; result[i][10]; i += 13) {
                                thisBefore.parseOtzdarvaBuildCharacter("survivor", result, i, 10);
                            }
                        }
                    });
            },
            error: (response) => {
                console.error("Failed to fetch Otzdarva build");
            }
        });
    }

    // Function that parses each individual killer
    // Role: "survivor" or "killer"
    // Data: parsed csv file as 2D array
    // Row, col: indexes of killer's name
    // All other values are retrieved based on offsets from the name
    protected parseOtzdarvaBuildCharacter(role: string, data: any[][], row: number, col: number) {
        // Loop over columns (builds)
        for (let i = 1; i < 8; i += 2) {
            let buildName = data[row + 2][col + i];
            if (role === "killer") {
                var character : Character = this.findCharacter(data[row][col]);
                var build : AbstractBuild = new KillerBuild(buildName, character);
            } else if (role === "survivor") {
                var build : AbstractBuild = new SurvivorBuild(buildName);
            }
            // Loop over rows (perks)
            for (let j = 4; j < 8; j++) {
                // Allow multiple entries per perk (alternatives)
                let buildPerk = data[row + j][col + i].split("/");
                let perkObject: any = {};

                // Each perk of the build can have multiple entries, first valid one is taken as the 'main', others are 'alternatives'
                for (let perkStr of buildPerk) {
                    let perk = this.findPerk(role, perkStr);
                    if (perk) {
                        perkObject.perk = perk;
                        perkObject.level = j - 3;
                    } else {
                        // console.log("Perk not found: " + perkStr);
                    }
                }

                // If perk was successfully found
                if (perkObject.perk) build.addPerk(perkObject);
            }
            if (role === "killer") {
                if (character === null) {
                    console.error("Character not found: " + data[row][col]);
                    continue;
                }
                let characterName = character.getName();
                this.buildMap.set(characterName + " - " + buildName, build);
            } else if (role === "survivor") {
                this.buildMap.set(buildName, build);
            }
        }
    }

    // Function that finds a perk based on its name
    // Role: "survivor" or "killer"
    // PerkName: name of the perk to find
    protected findPerk(role: string, perkName: string) {
        for (let perk of this.perkMap.values()) {
            if (perk.getName().replace(/ /g, "").toLowerCase() === perkName.replace(/ /g, "").toLowerCase() && perk.getRole() === role) {
                return perk;
            }
        }
        return null;
    }

    protected findCharacter(characterName: string){
        for (let character of this.characterMap.values()){
            if (character.getName().replace(/ /g, "").replace("ō","o").toLowerCase() === characterName.replace(/ /g, "").toLowerCase()){
                return character;
            }
        }
        return null;
    }

    public getCharacterMap(): Map<number, Character> {
        return this.characterMap;
    }

    public getPerkMap(): Map<string, Perk> {
        return this.perkMap;
    }

    public getItemMap(): Map<string, Item> {
        return this.itemMap;
    }

    public getAddonMap(): Map<string, Addon> {
        return this.addonMap;
    }

    public getBuildMap(): Map<string, AbstractBuild> {
        return this.buildMap;
    }
    
}


