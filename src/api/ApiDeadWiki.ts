

import { Perk } from '../model/Perk';
import { Character} from '../model/Character';
import { CharacterType } from '../model/Character';

export class ApiDeadWiki{
    private characterMap: Map<string, Character> = new Map<string, Character>();

    private static _instance: ApiDeadWiki;
  
    private constructor() {
        ApiDeadWiki.initDataMap();
    }
  
    public static instance() {
      if (!this._instance) {
        this._instance = new ApiDeadWiki();
      }
  
      return this._instance;
    }

    // Parse perks from the wikipedia perk tables
    protected static async parsePerks(url: string, characterType: CharacterType): Promise<void> {

        // function overwolf.web.sendHttpRequest(url: string, method: overwolf.web.enums.HttpRequestMethods, headers: overwolf.web.FetchHeader[], data: string, callback: overwolf.CallbackFunction<overwolf.web.SendHttpRequestResult>): void
        overwolf.web.sendHttpRequest(url, overwolf.web.enums.HttpRequestMethods.GET, [{ "key": "Content-Type", "value": "txt/html" }], "", (response) => {
            console.log(response);
            if (response.success && response.statusCode === 200) {
                this.parsePerksFromHTML(response.data, characterType);
            } else {
                console.error("Failed to fetch perks from " + url);
            }
        });
    }

    // Parse perks from HTML
    protected static parsePerksFromHTML(html: string, characterType: CharacterType): void {
        const document  = DOMParser.prototype.parseFromString(html, "text/html");
        // First element is apparently thead (jsdom is wack)
        // Grab all rows in table
        const perks = [...document.querySelector("tbody").children].slice(1)
            .map((x) => {
                // Remove mini icons next to links
                x.children[2].querySelectorAll("span[style*=padding]")
                    .forEach((y) => y.remove());
                // Remap each row into object
                return {
                    perkImage: x.querySelectorAll("a")[0].href.replace(/\/revision\/latest.+/, ""),
                    perkName: x.querySelectorAll("a")[1].title,
                    // Description is URI encoded for simplicity
                    description: encodeURI(x.children[2].innerHTML.replaceAll("/wiki/", "https://deadbydaylight.fandom.com/wiki/")),
                    character: x.children[3].querySelectorAll("a")[0]?.title,
                    characterImage: x.children[3].querySelectorAll("a")[1]?.href.replace(/\/revision\/latest.+/, "")
                }
            });
        // Sort so binary search can be used
        perks.sort(function (a, b) { return a.perkName.localeCompare(b.perkName, 'en') });

        // Add perks to character map
        perks.forEach((perk) => {
            const character = this._instance.characterMap.get(perk.character);
            if (character) {
                character.addPerk(new Perk(perk.perkName, perk.perkImage, perk.description,character));
            } else {
                const newCharacter = new Character(perk.character, perk.characterImage, characterType);
                newCharacter.addPerk(new Perk(perk.perkName, perk.perkImage, perk.description, newCharacter));
                this._instance.characterMap.set(perk.character, newCharacter);
            }
        });
    }

    // Main function
    protected static async initDataMap(){
        // Grab webpage
        this.parsePerks("https://deadbydaylight.fandom.com/wiki/Killer_Perks", CharacterType.Killer);
        this.parsePerks("https://deadbydaylight.fandom.com/wiki/Survivor_Perks", CharacterType.Survivor);
    }

    public getDataMap(): Map<string, Character> {
        return this.characterMap;
    }

}


