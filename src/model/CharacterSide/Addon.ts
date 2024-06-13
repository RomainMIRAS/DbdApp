import { ApiService } from "../../api/ApiService";
import { Character, Role } from "./Character";
import { Item, ItemType } from "./Item";

export enum Rarity {
    ARTIFACT = "Artifact",
    SPECIAL_EVENT = "SpecialEvent",
    LEGENDARY = "Legendary",
    ULTRA_RARE = "UltraRare",
    VERY_RARE = "VeryRare",
    RARE = "Rare",
    UNCOMMON = "Uncommon",
    COMMON = "Common",
}

export class Addon {
    private id: string;
    private type: string;
    private itemType: ItemType;
    private parentItem: string[]; // Array of the list of the parent item id
    private killerAbility: string;
    private name: string;
    private description: string;
    private role: Role;
    private rarity: string;
    private canBeUsedAfterEvent: boolean;
    private bloodweb: boolean;
    private image: string;
  
    constructor(
        id: string,
      type: string,
      itemType: ItemType,
      parentItem: string[],
      killerAbility: string,
      name: string,
      description: string,
      role: Role,
      rarity: string,
      canBeUsedAfterEvent: boolean,
      bloodweb: boolean,
      image: string
    ) {
        this.id = id;
      this.type = type;
      this.itemType = itemType;
      this.parentItem = parentItem;
      this.killerAbility = killerAbility;
      this.name = name;
      this.description = description;
      this.role = role;
      this.rarity = rarity;
      this.canBeUsedAfterEvent = canBeUsedAfterEvent;
      this.bloodweb = bloodweb;
      this.image = image;
    }

    // Méthodes pour obtenir les propriétés
    public getId(): string {
        return this.id;
    }
  
    public getType(): string {
      return this.type;
    }
  
    public getItemType(): ItemType {
      return this.itemType;
    }
  
    public getParentItem(): string[] {
      return this.parentItem;
    }
  
    public getKillerAbility(): string {
      return this.killerAbility;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public getDescription(): string {
      return this.description;
    }
  
    public getRole(): Role {
      return this.role;
    }
  
    public getRarity(): string {
      return this.rarity;
    }
  
    public getCanBeUsedAfterEvent(): boolean {
      return this.canBeUsedAfterEvent;
    }
  
    public getBloodweb(): boolean {
      return this.bloodweb;
    }
  
    public getImage(): string {
      return this.image;
    }

    public getItemPower(): Item {
        if (this.role === Role.KILLER) {
            return ApiService.instance().getItemMap().get(this.parentItem[0]);
        } else {
            return null;
        }
    }

    public getKillerLink(): Character {
        if (this.role === Role.KILLER) {
            return this.getItemPower().getKiller();
        } else {
            return null;
        }
    }
  }
  