import { ApiService } from "../../api/ApiService";
import { Character, Role } from "./Character";

export enum ItemType {
    MAP = "Map",
    KEY = "Key",
    FLASHLIGHT = "Flashlight",
    MEDKIT = "Medkit",
    TOOLBOX = "Toolbox",
    FIRECRACKER = "Firecracker"
}

export enum Type {
    ITEM = "Item",
    POWER = "Power"
}

export class Item {
    private id: string;
    private requiredAbility: string;
    private role: Role;
    private rarity: string;
    private type: Type;
    private itemType: ItemType;
    private name: string;
    private description: string;
    private iconFilePathList: string;
  
    constructor(
      id: string,
      requiredAbility: string,
      role: Role,
      rarity: string,
      type: Type,
      itemType: ItemType,
      name: string,
      description: string,
      iconFilePathList: string
    ) {
      this.id = id;
      this.requiredAbility = requiredAbility;
      this.role = role;
      this.rarity = rarity;
      this.type = type;
      this.itemType = itemType;
      this.name = name;
      this.description = description;
      this.iconFilePathList = iconFilePathList;
    }

    public getId(): string {
        return this.id;
    }
  
    // Méthodes pour obtenir les propriétés
    public getRequiredAbility(): string {
      return this.requiredAbility;
    }
  
    public getRole(): string {
      return this.role;
    }
  
    public getRarity(): string {
      return this.rarity;
    }
  
    public getType(): Type {
      return this.type;
    }
  
    public getItemType(): string {
      return this.itemType;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public getDescription(): string {
      return this.description;
    }
  
    public getIconFilePathList(): string {
      return this.iconFilePathList;
    }

    /**
     * @description Get the killer who can use this item only if the item is a killer item
     */
    public getKiller() : Character | null{
        if(this.type === Type.POWER){
            for (const character of ApiService.instance().getCharacterMap().values()){
                if(character.getRole() === Role.KILLER && character.getItem() === this.id){
                    return character;
                }
            }
        }
        return null;
    }
  }
  