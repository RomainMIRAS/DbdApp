

import { Perk } from '../model/Perk';
import { Character} from '../model/Character';
import { CharacterType } from '../model/Character';
import $ from "jquery";
import { AbstractBuild } from '../model/Build/AbstractBuild';
import { Item } from '../model/Item';
import { Addon } from '../model/Addon';

export class ApiService{
    private characterMap: Map<string, Character> = new Map<string, Character>();
    private perkMap: Map<string, Perk> = new Map<string, Perk>();
    private itemMap: Map<string, Item> = new Map<string, Item>();
    private addonMap: Map<string, Addon> = new Map<string, Addon>();
    private buildMap: Map<string, AbstractBuild> = new Map<string, AbstractBuild>();

    private static _instance: ApiService;
  
    private constructor() {
        ApiService.initCharacterMap();
        console.log("ApiService initialized");
    }
  
    public static instance() {
      if (!this._instance) {
        this._instance = new ApiService();
      }
  
      return this._instance;
    }

    // Parse perks from the wikipedia perk tables
    protected static async parseCharacter(url: string, characterType: CharacterType): Promise<void> {
        // Calling with $.ajax instead of fetch because fetch doesn't work with the deadbydaylight wiki
        $.ajax({
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
    protected static parseCharacterFromHTML(html: string, characterType: CharacterType): void {
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
            const character = this._instance.characterMap.get(perk.character);
            if (character) {
                let perkToAdd = new Perk(perk.perkName, perk.perkImage, perk.description, character);
                character.addPerk(perkToAdd);
                this._instance.perkMap.set(perk.perkName, perkToAdd);
            } else {
                const newCharacter = new Character(perk.character, perk.characterImage, characterType);
                let perkToAdd = new Perk(perk.perkName, perk.perkImage, perk.description, newCharacter);
                newCharacter.addPerk(perkToAdd);
                this._instance.characterMap.set(perk.character, newCharacter);
                this._instance.perkMap.set(perk.perkName, perkToAdd);
            }
        });
    }

    // Main function
    protected static async initCharacterMap(){
        // Grab webpage
        this.parseCharacter("https://deadbydaylight.fandom.com/wiki/Killer_Perks", CharacterType.Killer);
        this.parseCharacter("https://deadbydaylight.fandom.com/wiki/Survivor_Perks", CharacterType.Survivor);
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


