import { Addon } from "./Addon";
import { Character, Role } from "./Character";
import { Item } from "./Item";
import { Perk } from "./Perk";

export class Build{
    protected perks: Perk[]; // Array of max 4 perks
    protected addons: Addon[]; // Array of max 2 addons
    protected buildName: string; // Optional build name
    protected role : Role;
    //protected offering : Offering;// Optional offering
    protected itemPower : Item;
    protected averageRating : number;
    protected ratingCount : number;
    protected character : Character;

    constructor(buildName: string, role: Role){
        this.perks = [];
        this.addons = [];
        this.buildName = buildName;
    }

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

    public getRole(){
        return this.role;
    }

    public getAverageRating(){
        return this.averageRating;
    }

    public getRatingCount(){
        return this.ratingCount;
    }

    public getItemPower(){
        return this.itemPower;
    }

    public setItemPower(item: Item){
        this.itemPower = item;
    }

    public setAverageRating(rating: number){
        this.averageRating = rating;
    }

    public setRatingCount(count: number){
        this.ratingCount = count;
    }

    public setCharacter(character: Character){
        this.character = character;
    }

    public getPerkCount(){
        return this.perks.length;
    }

    public getAddonCount(){
        return this.addons.length;
    }

}