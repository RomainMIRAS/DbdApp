import { Addon } from "../CharacterSide/Addon";
import { Character } from "../CharacterSide/Character";
import { Item } from "../CharacterSide/Item";
import { Perk } from "../CharacterSide/Perk";
import { AbstractBuild } from "./AbstractBuild";

export class SurvivorBuild extends AbstractBuild{
    item: Item; // Can only have 1 item - name of the item
    
    constructor(buildName: string ) {
        super();
        this.buildName = buildName;
        this.perks = [];
        this.addons = [];
        this.item = null;
    }

    // Adds a item to the survivor build
    public addItem(item: Item): void {
        if (this.item === null) {
            this.item = item;
        }
    }

    // Adds a perk to the survivor build
    public addPerk(perk: Perk): void {
        if (this.perks.length < 4) {
            this.perks.push(perk);
        }
    }

    // Removes a perk from the survivor build
    public removePerk(perk: Perk): void {
        this.perks = this.perks.filter((p) => p.getName() !== perk.getName());
    }

    // Adds an addon to the survivor build
    public addAddon(addon: Addon): void {
        if (this.addons.length < 2) {
            this.addons.push(addon);
        }
    }

    // Removes an addon from the survivor build
    public removeAddon(addon: Addon): void {
        this.addons = this.addons.filter((a) => a.getName() !== addon.getName());
    }

    // Returns a string of the survivor build
    // TODO CHANGE THIS
    public toString(): string {
        let str = "survivor Build: \n";
        str += "Build Name: " + this.buildName + "\n";
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

    // Returns the item of the survivor build
    public getItem(): Item {
        return this.item;
    }

    // Returns the character of the survivor build
    public getCharacter(): Character {
        return null;
    }
}