import { Perk } from "./Perk";
import { Addon } from "./Addon";

export enum CharacterType {
    Survivor = "Survivor",
    Killer = "Killer",
}

export class Character {

    protected name: string;
    protected icon: string;
    protected type: CharacterType;
    protected perks: Perk[];
    protected addons: Addon[];

    constructor(name: string, icon: string, type: CharacterType) {
        this.name = name;
        this.icon = icon;
        this.type = type;
        this.perks = [];
        this.addons = [];
    }

    public addPerk(perk: Perk) {
        this.perks.push(perk);
    }

    public addAddon(addon: Addon) {
        this.addons.push(addon);
    }

    public getPerks() {
        return this.perks;
    }

    public getAddons() {
        return this.addons;
    }

    public getIcon() {
        return this.icon;
    }

    public getName() {
        return this.name;
    }
}