
import { Character } from './Character';

export class Perk {
    icon: string;
    name: string;
    description: string;
    personnage: Character;

    constructor(name: string,icon: string, description: string, personnage: Character) {
        this.icon = icon;
        this.name = name;
        this.description = description;
        this.personnage = personnage;
    }
}