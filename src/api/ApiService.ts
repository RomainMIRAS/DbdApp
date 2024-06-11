

import { Perk } from '../model/Perk';
import { Character} from '../model/Character';
import { CharacterType } from '../model/Character';
import $ from "jquery";
import { AbstractBuild } from '../model/Build/AbstractBuild';
import { Item } from '../model/Item';
import { Addon } from '../model/Addon';

export class ApiService{
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
/*             for (let [key, value] of this.characterMap) {
                if (value.getType() === CharacterType.Killer) {
                    initAddonsForCharacter(value.getName());
                }
            } */
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

    // Parse perks from the wikipedia perk tables
    protected parseCharacter(url: string, characterType: CharacterType): void {
        // Calling with $.ajax instead of fetch because fetch doesn't work with the deadbydaylight wiki
        $.ajax({
            async: false,
            url: url,
            type: "GET",
            headers: { "Content-Type": "text/html" },
            success: (response) => {
                this.parseCharacterFromHTML(response, characterType);
            },
            error: (response) => {
                console.error("Failed to fetch perks from " + url);
            }
        });
    }

    // Parse perks from HTML
    protected parseCharacterFromHTML(html: string, characterType: CharacterType): void {
        // Parse HTML into DOM
        const document  = new DOMParser().parseFromString(html, "text/html");
        // First element is apparently thead (jsdom is wack)
        // Grab all rows in table
        const perks = [...document.querySelector("tbody").children].slice(1)
            .map((x) => {
                // Remove mini icons next to links
                x.children[2].querySelectorAll("span[style*=padding]")
                    .forEach((y) => y.remove());
                // Remap each row into object
                return {
                    perkImage: x.querySelectorAll("a")[0].href.replace(/\/revision\/latest.+/, ""),
                    perkName: x.querySelectorAll("a")[1].title,
                    // Description is URI encoded for simplicity
                    description: encodeURI(x.children[2].innerHTML.replaceAll("/wiki/", "https://deadbydaylight.fandom.com/wiki/")),
                    character: x.children[3].querySelectorAll("a")[0]?.title,
                    characterImage: x.children[3].querySelectorAll("a")[1]?.href.replace(/\/revision\/latest.+/, "")
                }
            });
        // Sort so binary search can be used
        perks.sort(function (a, b) { return a.perkName.localeCompare(b.perkName, 'en') });

        // Add perks to character map
        perks.forEach((perk) => {
            const character = this.characterMap.get(perk.character);
            if (character) {
                let perkToAdd = new Perk(perk.perkName, perk.perkImage, perk.description, character);
                character.addPerk(perkToAdd);
                this.perkMap.set(perk.perkName, perkToAdd);
            } else {
                const newCharacter = new Character(perk.character, perk.characterImage, characterType);
                let perkToAdd = new Perk(perk.perkName, perk.perkImage, perk.description, newCharacter);
                newCharacter.addPerk(perkToAdd);
                this.characterMap.set(perk.character, newCharacter);
                this.perkMap.set(perk.perkName, perkToAdd);
            }
        });
    }

    // Main function
    protected initCharacterMap(){
        // Grab webpage
        this.parseCharacter("https://deadbydaylight.fandom.com/wiki/Killer_Perks", CharacterType.Killer);
        this.parseCharacter("https://deadbydaylight.fandom.com/wiki/Survivor_Perks", CharacterType.Survivor);
    }

    // Parse addons from the wikipedia addon tables
    // Where table is like : <table class="wikitable" data-index-number="3">
    protected parseAddonsFromHTML(html: string, characterName: string): void {
        // Parse HTML into DOM
        const document  = new DOMParser().parseFromString(html, "text/html");
        // First element is apparently thead (jsdom is wack)
        // Grab all rows in table
        const addons = [...document.querySelector("tbody").children].slice(1)
            .map((x) => {
                // Remove mini icons next to links
                x.children[2].querySelectorAll("span[style*=padding]")
                    .forEach((y) => y.remove());
                // Remap each row into object
                return {
                    addonImage: x.querySelectorAll("a")[0].href.replace(/\/revision\/latest.+/, ""),
                    addonName: x.querySelectorAll("a")[1].title,
                    // Description is URI encoded for simplicity
                    description: encodeURI(x.children[2].innerHTML.replaceAll("/wiki/", "https://deadbydaylight.fandom.com/wiki/")),
                    character: characterName,
                    characterImage: x.children[3].querySelectorAll("a")[0]?.href.replace(/\/revision\/latest.+/, "")
                }
            });
        // Sort so binary search can be used
        addons.sort(function (a, b) { return a.addonName.localeCompare(b.addonName, 'en') });

        // Add addons to character map
        addons.forEach((addon) => {
            const character = this.characterMap.get(addon.character);
            if (character) {
                let addonToAdd = new Addon(addon.addonName, addon.addonImage, addon.description, character);
                character.addAddon(addonToAdd);
                this.addonMap.set(addon.addonName, addonToAdd);
            } else {
                const newCharacter = new Character(addon.character, addon.characterImage, CharacterType.Killer);
                let addonToAdd = new Addon(addon.addonName, addon.addonImage, addon.description, newCharacter);
                newCharacter.addAddon(addonToAdd);
                this.characterMap.set(addon.character, newCharacter);
                this.addonMap.set(addon.addonName, addonToAdd);
            }
        });
    }

    protected initAddonsForCharacter(characterName: string): void {
        // Calling with $.ajax instead of fetch because fetch doesn't work with the deadbydaylight wiki
        $.ajax({
            async: false,
            url: "https://deadbydaylight.fandom.com/wiki/" + characterName.replace(/ /g, "_"),
            type: "GET",
            headers: { "Content-Type": "text/html" },
            success: (response) => {
                this.parseAddonsFromHTML(response, characterName);
            },
            error: (response) => {
                console.error("Failed to fetch addons from " + characterName);
            }
        });
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


