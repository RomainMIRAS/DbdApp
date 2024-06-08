import { OWWindow } from "@overwolf/overwolf-api-ts";
import $ from "jquery";

// A base class for the app's foreground windows.
// Sets the modal and drag behaviors, which are shared accross the desktop and in-game windows.
export class AppWindow {
  protected currWindow: OWWindow;
  protected mainWindow: OWWindow;
  protected maximized: boolean = false;

  constructor(windowName) {
    this.mainWindow = new OWWindow('background');
    this.currWindow = new OWWindow(windowName);

    this.setDrag($('#header')[0]);
    
    $('#closeButton').on('click', () => {
      this.mainWindow.close();    
    });

    $('#minimizeButton').on('click', () => {
      this.mainWindow.minimize();
      });

    $('#maximizeButton').on('click', () => {
      if (!this.maximized) {
        this.currWindow.maximize();
      } else {
        this.currWindow.restore();
      }

      this.maximized = !this.maximized;
    });

  }

  public closeWindow() {
    this.mainWindow.close();
  }

  public async restore() {
    await this.currWindow.restore();
  }

  public async minimize() {
    await this.currWindow.minimize();
  }

  public async maximize() {
    await this.currWindow.maximize();
  }

  public async getWindowState() {
    return await this.currWindow.getWindowState();
  }

  private async setDrag(elem: HTMLElement) {
    this.currWindow.dragMove(elem);
  }
}
