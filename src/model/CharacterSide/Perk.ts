import { Role } from "./Character";

class Perk {
    // Propriétés de la classe
    private id: string;
    private categories: string[];
    private name: string;
    private description: string;
    private role: Role;
    private characterId: string;
    private teachable: number;
    private image: string;
  
    constructor(
      id: string,
      categories: string[],
      name: string,
      description: string,
      role: Role,
      characterId: string,
      teachable: number,
      image: string
    ) {
        this.id = id;
      this.categories = categories;
      this.name = name;
      this.description = description;
      this.role = role;
      this.characterId = characterId;
      this.teachable = teachable;
      this.image = image;
    }

    // Méthodes pour obtenir les propriétés
    public getId(): string {
        return this.id;
      }

    public getCategories(): string[] {
      return this.categories;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public getDescription(): string {
      return this.description;
    }
  
    public getRole(): string {
      return this.role;
    }
  
    public getCharacterId(): string {
      return this.characterId;
    }
  
    public getTeachable(): number {
      return this.teachable;
    }
  
    public getImage(): string {
      return this.image;
    }
  }
  
  export { Perk };
  