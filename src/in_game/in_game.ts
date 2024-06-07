import {
  OWHotkeys
} from "@overwolf/overwolf-api-ts";

import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";
import WindowState = overwolf.windows.WindowStateEx;

// The in-game window is the window displayed while a supported game is running.
// In our case, our in-game window has no logic - it only displays static data.
// Therefore, only the generic AppWindow class is called.
class InGame extends AppWindow {
  private _hotkeys: OWHotkeys;
  private static _instance: InGame;

  private constructor() {
    super("in_game");
  }

  public static instance(): InGame {
    if (!InGame._instance) {
      InGame._instance = new InGame();
    }

    return InGame._instance;
  }

  // The in-game window has no logic, so this method is empty
  public async run() {
    
  }

  
}

InGame.instance().run();
