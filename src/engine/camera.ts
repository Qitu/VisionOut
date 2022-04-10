
import { Scene, Vector3, VirtualJoysticksCamera } from "@babylonjs/core";

export default class Camera {
    private _scene: Scene;

    constructor (sence: Scene, canvas: HTMLCanvasElement) {
        this._scene = sence
        this.createCamera(canvas)
    }
    /** 创建相机 */
    public createCamera(canvas: HTMLCanvasElement) {
        const camera = new VirtualJoysticksCamera("VJC", new Vector3(0, 17, 5), this._scene);
        camera.attachControl(canvas, true);
        camera.speed = 0.2
        camera.applyGravity = true;
        camera.ellipsoid = new Vector3(1, 1.5, 1);
        camera.ellipsoidOffset = new Vector3(0, 1.5, 0);
        camera.checkCollisions = true;
        return camera
    }
}