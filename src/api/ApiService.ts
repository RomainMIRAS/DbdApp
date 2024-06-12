

import { Perk } from '../model/CharacterSide/Perk';
import { Character} from '../model/CharacterSide/Character';
import $, { get } from "jquery";
import { AbstractBuild } from '../model/Build/AbstractBuild';
import { Item } from '../model/CharacterSide/Item';
import { Addon } from '../model/CharacterSide/Addon';

export class ApiService{
    private apiURL: string = "https://dbd.tricky.lol/api/";

    public characterMap: Map<string, Character>;
    private perkMap: Map<string, Perk>;
    private itemMap: Map<string, Item>;
    private addonMap: Map<string, Addon>;
    private buildMap: Map<string, AbstractBuild>;

    private static _instance: ApiService;
  
    private constructor() {
        this.characterMap = new Map<string, Character>();
        this.perkMap = new Map<string, Perk>();
        this.itemMap = new Map<string, Item>();
        this.addonMap = new Map<string, Addon>();
        this.buildMap = new Map<string, AbstractBuild>();
    }

    public initApiService(){ 
        try {
            this.initCharacterMap();
            this.initPerkMap();
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
            url: this.apiURL + "characters",
            type: "GET",
            success: (response) => {
                try {
                    this.parseCharacters(response);
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
            url: this.apiURL + "perks",
            type: "GET",
            success: (response) => {
                try {
                    this.parsePerks(response);
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
     * Parsing Response from API of API Tricky DBD
     * @param response 
     */
    protected parseCharacters(response: JSON){
        console.log(response);
        for (let i in response){
            let character = response[i];

            //Construction de la map tunnables
            let tunables = new Map<string, number>();
            for (let j in character.tunables){
                tunables.set(j, character.tunables[j]);
            }

            // Création du character
            let newCharacter = new Character(
                i,
                character.id,
                character.name,
                character.role,
                character.difficulty,
                character.gender,
                character.height,
                character.bio,
                character.story,
                tunables,
                character.item,
                character.outfit,
                character.dlc,
                character.image
            );

            this.characterMap.set(i, newCharacter);
        }
    }

    protected parsePerks(response: JSON){
        for (let i in response){
            let perk = response[i];

            // Description base on tunnable
            let description = perk.description;
            if (perk.tunables !== null){
                for (let j in perk.tunables){
                    if (perk.tunables[j].length == 1){
                        description = description.replace("{" + j + "}", perk.tunables[j]);
                    } else if (perk.tunables[j].length == 3){
                        description = description.replace("{" + j + "}", perk.tunables[j][0] + "/" + perk.tunables[j][1] + "/" + perk.tunables[j][2]);
                    }
                }
            }
            
            let newPerk = new Perk(
                i,
                perk.categories,
                perk.name,
                description,
                perk.role,
                perk.character,
                perk.teachable,
                perk.image
            );
            this.perkMap.set(i, newPerk);
            
            //Add this perk to the character link if character not null
            // Otherwise, it's a global perk
            if (perk.character !== null){
                let character = this.characterMap.get(perk.character);
                if (character !== undefined){
                    character.addPerk(newPerk);
                }
            }
        }
    }

    public getCharacterMap(): Map<string, Character> {
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


