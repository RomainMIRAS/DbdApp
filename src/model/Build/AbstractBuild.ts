import { Addon } from "../CharacterSide/Addon";
import { Item } from "../CharacterSide/Item";
import { Perk } from "../CharacterSide/Perk";

export abstract class AbstractBuild{
    protected perks: Perk[]; // Array of max 4 perks
    protected addons: Addon[]; // Array of max 2 addons
    protected buildName: string; // Optional build name

    public addPerk(perk: Perk): void {
        if (this.perks.length < 4) {
            this.perks.push(perk);
        }
    }

    public removePerk(perk: Perk): void {
        this.perks = this.perks.filter((p) => p.getName() !== perk.getName());
    }

    public addAddon(addon: Addon): void{
        if (this.addons.length < 2) {
            this.addons.push(addon);
        }
    }

    public removeAddon(addon: Addon): void{
        this.addons = this.addons.filter((a) => a.getName() !== addon.getName());
    }

    public addBuildName(buildName: string): void{
        this.buildName = buildName;
    }

    public getPerks(): Perk[]{
        return this.perks;
    }

    public getAddons(): Addon[]{
        return this.addons;
    }

    public getBuildName(){
        return this.buildName;
    }

    public abstract toString(): string;

    public abstract getCharacter(): string;

    public abstract getItem(): Item;
}