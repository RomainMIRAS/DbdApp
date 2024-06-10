
import { Character } from './Character';

export class Perk {
    icon: string;
    nom: string;
    description: string;
    personnage: Character;

    constructor(nom: string,icon: string, description: string, personnage: Character) {
        this.icon = icon;
        this.nom = nom;
        this.description = description;
        this.personnage = personnage;
    }
}