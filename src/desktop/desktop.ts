import { AppWindow } from "../AppWindow";
import { kWindowNames } from "../consts";
import { ApiBehavior } from "../api/ApiBehavior";

// A class for the desktop window.
export class DesktopWindow extends AppWindow {
    constructor() {
        super(kWindowNames.desktop);
        alert('DesktopWindow constructor');
        this.getAPIBehavior();
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
