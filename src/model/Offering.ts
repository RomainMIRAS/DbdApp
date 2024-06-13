export enum OfferingType {
    LUCK = "Luck",
    WORLD = "World",
    POINTS = "Points",
    ATMOSPHERE = "Atmosphere",
    PROTECTION = "Protection",
    KILLING = "Killing",
    HOOK = "Hook",
    LIGHTNING = "Lightning",
    CHEST = "Chest",
    PROCEDURAL_GENERATION = "ProceduralGeneration",
}

export class Offering {
    private id: string;
    private type: OfferingType;
    private statusEffects: string[];
    private tags: string[];
    private available: string;
    private name: string;
    private description: string;
    private role: string;
    private rarity: string;
    private image: string;
  
    constructor(
        id: string,
      type: OfferingType,
      statusEffects: string[],
      tags: string[],
      available: string,
      name: string,
      description: string,
      role: string,
      rarity: string,
      image: string
    ) {
        this.id = id;
      this.type = type;
      this.statusEffects = statusEffects;
      this.tags = tags;
      this.available = available;
      this.name = name;
      this.description = description;
      this.role = role;
      this.rarity = rarity;
      this.image = image;
    }
  
    // Méthodes pour obtenir les propriétés
    public getId(): string {
        return this.id;
    }
    
    public getType(): OfferingType {
      return this.type;
    }
  
    public getStatusEffects(): string[] {
      return this.statusEffects;
    }
  
    public getTags(): string[] {
      return this.tags;
    }
  
    public getAvailable(): string {
      return this.available;
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
  
    public getRarity(): string {
      return this.rarity;
    }
  
    public getImage(): string {
      return this.image;
    }
  }
  