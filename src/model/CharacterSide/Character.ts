import { Perk } from "./Perk";

export enum Role {
    SURVIVOR = "survivor",
    KILLER = "killer",
  }

class Character {

    // Enumération des rôles possibles avec un type enum

    // Propriétés de la classe
    private id : string;
    private idName: string;
    private name: string;
    private role: Role;
    private difficulty: string;
    private gender: string;
    private height: string;
    private bio: string;
    private story: string;
    private tunables: Map<string, number>; // Liste of all specific caracteristics for a killer
    private item: string; // Name of the power of the killer ( String like Item_Slasher_{name of the power} )
    private outfit: string[];
    private dlc: string; // Name of the dlc
    private image: string;
    private perks: Perk[]; // Liste des perks associés
  
    constructor(
      id: string,
      idName: string,
      name: string,
      role: Role,
      difficulty: string,
      gender: string,
      height: string,
      bio: string,
      story: string,
      tunables: Map<string, number>,
      item: string,
      outfit: string[],
      dlc: string,
      image: string
    ) {
      this.id = id;
      this.idName = idName;
      this.name = name;
      this.role = role;
      this.difficulty = difficulty;
      this.gender = gender;
      this.height = height;
      this.bio = bio;
      this.story = story;
      this.tunables = tunables;
      this.item = item;
      this.outfit = outfit;
      this.dlc = dlc;
      this.image = image;
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
  
    public getHeight(): string {
      return this.height;
    }
  
    public getBio(): string {
      return this.bio;
    }
  
    public getStory(): string {
      return this.story;
    }
  
    /**
     * 
     * @returns Map<string, number> : Liste des caractéristiques spécifiques pour un tueur
     */
    public getTunables(): Map<string, number>{
      return this.tunables;
    }
  
    public getItem(): any {
      return this.item;
    }
  
    public getOutfit(): string[] {
      return this.outfit;
    }
  
    public getDlc(): string {
      return this.dlc;
    }
  
    public getImage(): string {
      return this.image;
    }

    public addPerk(perk: Perk): void {
        this.perks.push(perk);
    }
  
    public getPerks(): Perk[] {
      return this.perks;
    }
  }
  
  export { Character };
  