import { AppWindow } from "../AppWindow";
import { ApiService } from "../api/ApiService";
import { kWindowNames } from "../consts";

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
  
    public async run() {
      ApiService.instance().getCharacterMap().forEach((characterMap) => {
        console.log(characterMap);
      });

      ApiService.instance().getPerkMap().forEach((perkMap) => {
        console.log(perkMap);
      });
    }
  }
  
DesktopWindow.instance().run();
