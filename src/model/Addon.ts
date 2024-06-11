// Objet Addon
import { Character } from './Character';

export class Addon {
    protected icon: string;
    protected name: string;
    protected description: string;
    protected tier: number;
    protected character: Character;

    constructor(icon: string, name: string, description: string, character: Character) {
        this.icon = icon;
        this.name = name;
        this.description = description;
        this.character = character;
    }
}