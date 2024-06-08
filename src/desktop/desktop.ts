import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";
import { ApiBehavior } from "../api/ApiBehavior";
import { BackgroundController } from "../background/background";

// A class for the desktop window.
export class DesktopWindow extends AppWindow {
    private static _instance: DesktopWindow;

    private constructor() {
        super(kWindowNames.DesktopWindow);
    }

    // Implementing the Singleton design pattern
    public static instance(): DesktopWindow {
        if (!DesktopWindow._instance) {
            DesktopWindow._instance = new DesktopWindow();
        }

        return DesktopWindow._instance;
    }

    public async getWindowState() {
        return await this.currWindow.getWindowState();
    }

    public async getAPIBehavior() {
        let promise = ApiBehavior.get("/characters");
        promise.then((response) => {
            console.log(response);
        }, (error) => {
            console.error(error);
        }
        );
    }
}
