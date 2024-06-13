

import { Perk } from '../model/CharacterSide/Perk';
import { Character, Role} from '../model/CharacterSide/Character';
import $, { ajax, get } from "jquery";
import { Build } from '../model/CharacterSide/Build';
import { Item } from '../model/CharacterSide/Item';
import { Addon } from '../model/CharacterSide/Addon';
import Papa from 'papaparse';
import { Offering } from '../model/Offering';

export class ApiService{
    private baseUrlAPI: string = "https://dbd-info.com";

    public characterMap: Map<number, Character>;
    private perkMap: Map<string, Perk>;
    private itemMap: Map<string, Item>;
    private addonMap: Map<string, Addon>;
    private offeringMap: Map<string, Offering>;
    private buildMap: Map<string, Build>;

    private static _instance: ApiService;
  
    private constructor() {
        this.characterMap = new Map<number, Character>();
        this.perkMap = new Map<string, Perk>();
        this.itemMap = new Map<string, Item>();
        this.addonMap = new Map<string, Addon>();
        this.buildMap = new Map<string, Build>();
        this.offeringMap = new Map<string, Offering>();
    }

    public initApiService(){ 
        try {
            this.initCharacterMap();
            this.initPerkMap();
            this.initItemMap();
            this.initAddonMap();
            this.initOfferingMap();
            // this.initOtzdarvaBuild();
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

    protected initItemMap(){
        $.ajax({
            async: false,
            url: this.baseUrlAPI + "/api/items",
            type: "GET",
            success: (response) => {
                try {
                    if (response.success) {
                        this.parseItems(response.data);
                    } else {
                        console.error("Failed to fetch items: " + response.message);
                    }
                } catch (error) {
                    console.error("Failed to fetch items: " + error);
                }
            },
            error: (response) => {
                console.error("Failed to fetch items");
            }
        });
    }

    protected initAddonMap(){
        $.ajax({
            async: false,
            url: this.baseUrlAPI + "/api/addons?bloodweb=true",
            type: "GET",
            success: (response) => {
                try {
                    if (response.success) {
                        this.parseAddons(response.data);
                    } else {
                        console.error("Failed to fetch addons: " + response.message);
                    }
                } catch (error) {
                    console.error("Failed to fetch addons: " + error);
                }
            },
            error: (response) => {
                console.error("Failed to fetch addons");
            }
        });
    }

    protected initOfferingMap(){
        $.ajax({
            async: false,
            url: this.baseUrlAPI + "/api/offerings?available=available",
            type: "GET",
            success: (response) => {
                try {
                    if (response.success) {
                        this.parseOfferings(response.data);
                    } else {
                        console.error("Failed to fetch offerings: " + response.message);
                    }
                } catch (error) {
                    console.error("Failed to fetch offerings: " + error);
                }
            },
            error: (response) => {
                console.error("Failed to fetch offerings");
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

    protected parseItems(response: JSON){
        for (let i in response){
            let item = response[i];

            let newAddon = new Item(
                i,
                item.RequiredAbility,
                item.Role,
                item.Rarity,
                item.Type,
                item.ItemType,
                item.Name,
                item.Description,
                this.baseUrlAPI + item.IconFilePathList
            );
            this.itemMap.set(i, newAddon);
        }
    }

    protected parseAddons(response: JSON){
        for (let i in response){
            let addon = response[i];
            if (!addon.Bloodweb) continue;
            let newAddon = new Addon(
                i,
                addon.Type,
                addon.ItemType,
                addon.ParentItem,
                addon.KillerAbility,
                addon.Name,
                addon.Description,
                addon.Role,
                addon.Rarity,
                addon.CanBeUsedAfterEvent,
                addon.Bloodweb,
                this.baseUrlAPI + addon.Image
            );
            this.addonMap.set(i, newAddon);
        }
    }

    protected parseOfferings(response: JSON){
        for (let i in response){
            let offering = response[i];

            let newOffering = new Offering(
                i,
                offering.Type,
                offering.StatusEffects,
                offering.Tags,
                offering.Available,
                offering.Name,
                offering.Description,
                offering.Role,
                offering.Rarity,
                this.baseUrlAPI + offering.Image
            );
            this.offeringMap.set(i, newOffering);
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
                                thisBefore.parseOtzdarvaBuildCharacter(Role.KILLER, result, i, 1);
                            }
                            // Parse all survivors
                            for (let i = 10; result[i][10]; i += 13) {
                                thisBefore.parseOtzdarvaBuildCharacter(Role.SURVIVOR, result, i, 10);
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
            if (role === Role.KILLER) {
                var character : Character = this.findCharacter(data[row][col]);
                var build : Build = new Build(buildName, role);
                build.setCharacter(character);
            } else if (role === Role.SURVIVOR) {
                var build : Build = new Build(buildName,role);
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

    /**
     * Get the build from the API
     * API ENDPOINT: /api/builds/{pageNumber}?role={role}
     * Optional query character=null&category=null&version=null&rating=null&searchInput=null
     * @param role 
     */
    public getBuildFromApi(role: Role, pageNumber: number, character: string, category: string, version: string, rating: string, searchInput: string): Set<Build>{
        let url = this.baseUrlAPI + "/api/builds/" + pageNumber + "?role=" + role;
        if (character !== null){
            url += "&character=" + character;
        }
        if (category !== null){
            url += "&category=" + category;
        }
        if (version !== null){
            url += "&version=" + version;
        }
        if (rating !== null){
            url += "&rating=" + rating;
        }
        if (searchInput !== null){
            url += "&searchInput=" + searchInput;
        }
        let buildSet = new Set<Build>();
        $.ajax({
            async: false,
            url: url,
            type: "GET",
            success: (response) => {
                try {
                    if (response.success) {
                        buildSet = this.parseBuildsFromApi(response.data,role);
                    } else {
                        console.error("Failed to fetch builds: " + response.message);
                    }
                } catch (error) {
                    console.error("Failed to fetch builds: " + error);
                }
            },
            error: (response) => {
                console.error("Failed to fetch builds");
            }
        });
        return buildSet;
    }

    protected parseBuildsFromApi(response: JSON,role: Role): Set<Build>{
        let builds = response["builds"];

        let buildSet = new Set<Build>();
        for (let i in builds){
            let build = builds[i];
            let buildObject = new Build(build["title"],role);
            buildObject.addPerk(this.perkMap.get(build["perk1"]));
            buildObject.addPerk(this.perkMap.get(build["perk2"]));
            buildObject.addPerk(this.perkMap.get(build["perk3"]));
            buildObject.addPerk(this.perkMap.get(build["perk4"]));
            buildObject.addAddon(this.addonMap.get(build["addon1"]));
            buildObject.addAddon(this.addonMap.get(build["addon2"]));
            buildObject.setAverageRating(build["averageRating"]);
            buildObject.setRatingCount(build["ratingCount"]);
            buildObject.setItemPower(this.itemMap.get(build["itemPower"]));
            buildObject.setCharacter(this.characterMap.get(parseInt(build["character"])));
            buildSet.add(buildObject);
        }
        return buildSet;
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

    public getOfferingMap(): Map<string, Offering> {
        return this.offeringMap;
    }

    public getBuildMap(): Map<string, Build> {
        return this.buildMap;
    }
    
}


