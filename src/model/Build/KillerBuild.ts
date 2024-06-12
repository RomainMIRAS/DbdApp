import { Addon } from "../CharacterSide/Addon";
import { Item } from "../CharacterSide/Item";
import { Perk } from "../CharacterSide/Perk";
import { AbstractBuild } from "./AbstractBuild";

export class KillerBuild extends AbstractBuild{
    character: string; // Can only have 1 character - name of the character
    
    constructor(character: string ) {
        super();
        this.character = character;
        this.perks = [];
        this.addons = [];
        this.buildName = null;
    }

    // Adds a build name to the killer build
    public addBuildName(buildName: string): void {
        this.buildName = buildName;
    }


    // Adds a perk to the killer build
    public addPerk(perk: Perk): void {
        if (this.perks.length < 4) {
            this.perks.push(perk);
        }
    }

    // Removes a perk from the killer build
    public removePerk(perk: Perk): void {
        this.perks = this.perks.filter((p) => p.getName() !== perk.getName());
    }

    // Adds an addon to the killer build
    public addAddon(addon: Addon): void {
        if (this.addons.length < 2) {
            this.addons.push(addon);
        }
    }

    // Removes an addon from the killer build
    public removeAddon(addon: Addon): void {
        this.addons = this.addons.filter((a) => a.getName() !== addon.getName());
    }

    // Returns a string of the killer build
    public toString(): string {
        let str = "Killer Build: \n";
        str += "Character: " + this.character + "\n";
        str += "Perks: \n";
        this.perks.forEach((perk) => {
            str += perk.getName() + "\n";
        });
        str += "Addons: \n";
        this.addons.forEach((addon) => {
            str += addon.getName() + "\n";
        });
        return str;
    }

    // Returns the character of the killer build
    public getCharacter(): string {
        return this.character;
    }

    // Returns the item of the killer build
    public getItem(): Item {
        throw new Error("Should not be called");
    }
    
}