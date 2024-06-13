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

    public getIcon() {
        return this.icon;
    }

    public getName() {
        return this.name;
    }

    public getDescription() {
        return this.description;
    }

    public getTier() {
        return this.tier;
    }

    public getCharacter() {
        return this.character;
    }

    public setTier(tier: number) {
        this.tier = tier;
    }
}