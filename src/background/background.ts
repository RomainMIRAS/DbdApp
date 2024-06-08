import {
  OWGames,
  OWGameListener,
  OWWindow
} from '@overwolf/overwolf-api-ts';

import { kWindowNames } from "../consts";

import RunningGameInfo = overwolf.games.RunningGameInfo;
import AppLaunchTriggeredEvent = overwolf.extensions.AppLaunchTriggeredEvent;
import { AppWindow } from '../AppWindow';
import { DesktopWindow } from '../desktop/desktop';
import { InGame } from '../in_game/in_game';


// The background controller holds all of the app's background logic - hence its name. it has
// many possible use cases, for example sharing data between windows, or, in our case,
// managing which window is currently presented to the user. To that end, it holds a dictionary
// of the windows available in the app.
// Our background controller implements the Singleton design pattern, since only one
// instance of it should exist.
export class BackgroundController {
  private static _instance: BackgroundController;
  private _windows: Record<string, AppWindow> = {};
  private _gameListener: OWGameListener;

  private constructor() {
    console.log('BackgroundController constructor');  
    // Populating the background controller's window dictionary
    this._windows[kWindowNames.DesktopWindow] = DesktopWindow.instance();
    this._windows[kWindowNames.inGame] = InGame.instance();

    // When a a supported game game is started or is ended, toggle the app's windows
    this._gameListener = new OWGameListener({
      onGameStarted: this.toggleWindows.bind(this),
      onGameEnded: this.toggleWindows.bind(this)
    });

    overwolf.extensions.onAppLaunchTriggered.addListener(
      e => this.onAppLaunchTriggered(e)
    );
  };

  // Implementing the Singleton design pattern
  public static instance(): BackgroundController {
    if (!BackgroundController._instance) {
      BackgroundController._instance = new BackgroundController();
    }

    return BackgroundController._instance;
  }

  // When running the app, start listening to games' status and decide which window should
  // be launched first, based on whether a supported game is currently running
  public async run() {
    this._gameListener.start();

    const currWindowName = (await this.isSupportedGameRunning())
      ? kWindowNames.inGame
      : kWindowNames.DesktopWindow;

    this._windows[currWindowName].restore();
  }

  private async onAppLaunchTriggered(e: AppLaunchTriggeredEvent) {
    console.log('onAppLaunchTriggered():', e);

    if (!e || e.origin.includes('gamelaunchevent')) {
      return;
    }

    if (await this.isSupportedGameRunning()) {
      this._windows[kWindowNames.DesktopWindow].closeWindow();
      this._windows[kWindowNames.inGame].restore();
    } else {
      this._windows[kWindowNames.DesktopWindow].restore();
      this._windows[kWindowNames.inGame].closeWindow();
    }
  }

  private toggleWindows(info: RunningGameInfo) {
    if (!info || !this.isDeadByDaylight(info)) {
      return;
    }

    if (info.isRunning) {
      this._windows[kWindowNames.DesktopWindow].closeWindow();
      this._windows[kWindowNames.inGame].restore();
    } else {
      this._windows[kWindowNames.DesktopWindow].restore();
      this._windows[kWindowNames.inGame].closeWindow();
    }
  }

  private async isSupportedGameRunning(): Promise<boolean> {
    const info = await OWGames.getRunningGameInfo();

    return info && info.isRunning && this.isDeadByDaylight(info);
  }

  // Identify whether the RunningGameInfo object is Dead by Daylight ( 108684 or 108681 )
  private isDeadByDaylight(info: RunningGameInfo) {
    return info && (info.id === 108684 || info.id === 108681);
  }
}

BackgroundController.instance().run();
