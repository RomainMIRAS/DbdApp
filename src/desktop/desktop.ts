import { AppWindow } from "../AppWindow";
import { ApiService } from "../api/ApiService";
import { kWindowNames } from "../consts";
import $ from "jquery";
import { CharacterType } from "../model/Character";

class DesktopWindow extends AppWindow {
    private static _instance: DesktopWindow;
  
    private constructor() {
      super(kWindowNames.DesktopWindow);
    }
  
    public static instance() {
      if (!this._instance) {
        this._instance = new DesktopWindow();
      }
  
      return this._instance;
    }

    private initEventHandlers(): void {
      $(".nav-link").on("click", (event) => {
          event.preventDefault();
          const contentId = $(event.currentTarget).data("content");
          this.loadContent(contentId);
      });
    }

    private loadContent(contentId: string): void {
      let content = "";
      switch (contentId) {
          case "profil":
              content = `
                  <h1>Profil Page</h1>
                  <p>Welcome to the Profil page.</p>
              `;
              break;
          case "killers":
              content = `
                  <h1>Killers Page</h1>
                  <p>Here is the list of killers.</p>
              `;
              break;
          case "survivors":
              content = `
                  <h1>Survivors Page</h1>
                  <p>Here is the list of survivors.</p>
              `;
              break;
          case "patchnote":
              content = `
                  <h1>Patchnote Page</h1>
                  <p>Read the latest patchnotes here.</p>
              `;
              break;
          case "bozo":
              content = `
                  <h1>Bozo Page</h1>
                  <p>Welcome to the Bozo page.</p>
              `;
              break;
          case "le":
              content = `
                  <h1>Le Page</h1>
                  <p>Welcome to the Le page.</p>
              `;
              break;
          case "clown":
              content = `
                  <h1>Clown Page</h1>
                  <p>Welcome to the Clown page.</p>
              `;
              break;
          default:
              content = `
                  <h1>The Entity's Eye</h1>
                  <p>
                    The Entity's Eye is a sample app that listens to real-time game events
                    and displays them in a transparent window. This app is built with
                    Electron and uses the Overwolf Game Events Provider to listen to game
                    events.
                  </p>
              `;
              break;
      }
      $("#main-content").html(content);
    }
  
    public async run() {
      const test = ApiService.instance().getCharacterMap()
      for (let [key, value] of test) {
        if (key === undefined) {
          test.delete(key);
        }
      }
      console.log(test)
      const characterTableBody = document.getElementById("character-table-body");
      const infoContainer = document.getElementById("info-container");
      let currentRow;
      let counter = 0;
    
      for (const [, value] of test.entries()) {
        if (counter % 2 === 0) {
          // Créez une nouvelle ligne toutes les deux itérations
          currentRow = document.createElement("tr");
          characterTableBody.appendChild(currentRow);
        }
      
        // Créer une cellule pour l'icône de chaque personnage
        const iconCell = document.createElement("td");
      
        // Créer l'image pour l'icône
        const img = document.createElement("img");
        img.src = value.getIcon();
        img.alt = `icon`;
        img.width = 150;  
        img.height = 150; 
      
        // Ajouter un événement de clic à l'image pour afficher les informations
        img.addEventListener("click", function () {
          // Afficher les informations du personnage dans le conteneur d'informations
          infoContainer.textContent = value.getName();
        });
      
        // Ajouter l'image à la cellule d'icône
        iconCell.appendChild(img);
      
        // Ajouter la cellule d'icône à la ligne
        currentRow.appendChild(iconCell);

        counter++;
      }
    
      DesktopWindow.instance().initEventHandlers();
    }
  }
  
DesktopWindow.instance().run();
