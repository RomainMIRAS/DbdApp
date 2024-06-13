import { ApiService } from "../../api/ApiService";
import { Item } from "./Item";
import { Perk } from "./Perk";

export enum Role {
    SURVIVOR = "Survivor",
    KILLER = "Killer",
  }

class Character {

    // Enumération des rôles possibles avec un type enum

    // Propriétés de la classe
    private id : string; // Number for the id of the character
    private idName: string; // Name of the character in the database
    private name: string; // Display name of the character
    private role: Role;
    private difficulty: string;
    private gender: string;
    private bio: string;
    private story: string;
    private tunables: Map<string, number>; // Liste of all specific caracteristics for a killer
    private item: string; // Name of the power of the killer ( String like Item_Slasher_{name of the power} )
    private dlc: string; // Name of the dlc
    private iconPath: string;
    private backgroundPath: string;
    private perks: Perk[]; // Liste des perks associés
  
    constructor(
      id: string,
      idName: string,
      name: string,
      role: Role,
      difficulty: string,
      gender: string,
      bio: string,
      story: string,
      item: string,
      dlc: string,
      iconPath: string,
      backgroundPath: string
    ) {
      this.id = id;
      this.idName = idName;
      this.name = name;
      this.role = role;
      this.difficulty = difficulty;
      this.gender = gender;
      this.bio = bio;
      this.story = story;
      this.item = item;
      this.dlc = dlc;
      this.iconPath = iconPath;
      this.backgroundPath = backgroundPath;
      this.perks = [];
    }
  
    // Méthodes pour obtenir les propriétés
    public getId(): string {
      return this.id;
    }
    public getIdName(): string {
      return this.idName;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public getRole(): string {
      return this.role;
    }
  
    public getDifficulty(): string {
      return this.difficulty;
    }
  
    public getGender(): string {
      return this.gender;
    }
  
    public getBio(): string {
      return this.bio;
    }
  
    public getStory(): string {
      return this.story;
    }
    
    public getItem(): any {
      return this.item;
    }
  
    public getDlc(): string {
      return this.dlc;
    }
  
    public getIconPath(): string {
      return this.iconPath;
    }

    public getBackgroundPath(): string {
      return this.backgroundPath;
    }

    public addPerk(perk: Perk): void {
        this.perks.push(perk);
    }
  
    public getPerks(): Perk[] {
      return this.perks;
    }

    /**
     * DO NOT USE THIS METHOD
     * @returns the power of the killer
     */
    public getItemPower(): Item {
      return ApiService.instance().getItemMap().get(this.item);
    }
  }
  
  export { Character };
  