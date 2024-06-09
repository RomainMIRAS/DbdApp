// Objet Addon
import { Character } from './Character';

export class Addon {
    icon: string;
    name: string;
    description: string;
    tier: number;
    character: Character;

    constructor(icon: string, name: string, description: string, tier: number, character: Character) {
        this.icon = icon;
        this.name = name;
        this.description = description;
        this.tier = tier;
        this.character = character;
    }
}