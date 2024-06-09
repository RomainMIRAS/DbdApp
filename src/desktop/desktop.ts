import { AppWindow } from "../AppWindow";
import { ApiDeadWiki } from "../api/ApiDeadWiki";
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
      console.log(ApiDeadWiki.instance().getDataMap());
    }
  }
  
DesktopWindow.instance().run();
