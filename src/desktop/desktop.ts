import { AppWindow } from "../AppWindow";
import { ApiService } from "../api/ApiService";
import { kWindowNames } from "../consts";
import $ from "jquery";
import { Role } from "../model/CharacterSide/Character";

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

    private removeClass(): void {
      const tab = document.getElementById("character-table-body") as HTMLTableSectionElement
      for (const row of tab.rows) {
        for (const cell of row.cells) {
            const img = cell.querySelector("img")
            img.classList.remove("clicked")
        }
      }
    }

    private loadContent(contentId: string): void {
    let choice = "";
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
                    <div id="character-table-container">
                      <table id="character-table">
                        <tbody id="character-table-body">
                        </tbody>
                      </table>
                    </div>
                    <div id="info-container">
                      <div id="info-header">
                        <h1 id="title-info-container"></h1>
                      </div>
                      <div id="all-info">
                        <h1 class="subtitle-info">Unique perks : </h1>
                        <table id="table-info-container">
                          <tr>
                            <td id="image-td1" class="image-container"><img id="table-info-container-h1" class="perkbackground" src="" alt="" width="100" height="100"><span></span></td>
                            <td id="table-info-container-d1"></td>
                          </tr>
                          <tr>
                            <td id="image-td2" class="image-container"><img id="table-info-container-h2" class="perkbackground" src="" alt="" width="100" height="100"><span></span></td>
                            <td id="table-info-container-d2"></td>
                          </tr>
                          <tr>
                            <td id="image-td3" class="image-container"><img id="table-info-container-h3" class="perkbackground" src="" alt="" width="100" height="100"><span></span></td>
                            <td id="table-info-container-d3"></td>
                          </tr>
                        </table>
                        <h1 class="subtitle-info">Power : </h1>
                      </div>
                    </div>
              `;
              choice="killers"
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
      if (choice=="killers") {
        DesktopWindow.instance().loadKiller();
      }
    }

    private loadKiller() {
      const test = ApiService.instance().getCharacterMap()
      for (let [key,] of test) {
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
        if (value.getRole()==Role.KILLER) {
          if (counter % 2 === 0) {
            currentRow = document.createElement("tr");
            characterTableBody.appendChild(currentRow);
          }
          const iconCell = document.createElement("td");
      
          const img = document.createElement("img");
          img.src = value.getIconPath();
          img.alt = `icon`;
          img.width = 200;  
          img.height = 200; 
          //img.classList.add();
      
 
          img.addEventListener("click", function () {
            const title=document.getElementById("title-info-container")
            title.textContent = value.getName();

            const perk = value.getPerks()

            const imgperk1 = document.getElementById("table-info-container-h1")
            imgperk1.setAttribute("src",perk[0].getImage())
            const descperk1 = document.getElementById("table-info-container-d1")
            descperk1.innerHTML = perk[0].getDescription()
            const span1 = document.querySelector("#image-td1 span");
            span1.textContent = perk[0].getName()

            const imgperk2 = document.getElementById("table-info-container-h2")
            imgperk2.setAttribute("src",perk[1].getImage())
            const descperk2 = document.getElementById("table-info-container-d2")
            descperk2.innerHTML =perk[1].getDescription()
            const span2 = document.querySelector("#image-td2 span");
            span2.textContent = perk[1].getName()

            const imgperk3 = document.getElementById("table-info-container-h3")
            imgperk3.setAttribute("src",perk[2].getImage())
            const descperk3 = document.getElementById("table-info-container-d3")
            descperk3.innerHTML = perk[2].getDescription()
            const span3 = document.querySelector("#image-td3 span");
            span3.textContent = perk[2].getName()

            DesktopWindow.instance().removeClass();
            img.classList.toggle("clicked");

          });
          iconCell.appendChild(img);
          currentRow.appendChild(iconCell);
          counter++;
        }    
        const tab = document.getElementById("character-table-body")
        const firstImage = tab.querySelector("tr:first-of-type td:first-of-type img");
        if (firstImage instanceof HTMLImageElement) {
          firstImage.click();
        }
    }
  }
  
    public async run() {
        DesktopWindow.instance().initEventHandlers();
        //DesktopWindow.instance().loadKiller();
      }
    }
  
DesktopWindow.instance().run();
