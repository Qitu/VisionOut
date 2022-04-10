import "@babylonjs/core/Debug/debugLayer"
// import "@babylonjs/inspector"
// import "@babylonjs/loaders/glTF"
import { Engine, Scene, Vector3, HemisphericLight, Sound, MeshBuilder, EngineFactory } from "@babylonjs/core";
import { SkyMaterial } from '@babylonjs/materials'

const config = {
    gravity: new Vector3(0, -9.81, 0),
    collisionable: true,
    width: 500,
    length: 500,
    height: 300,
}

/**
 * 渲染整个世界
 * 监听各种客户端事件
 */
export default class world {
    public _scene: Scene | any;
    private _engine!: Engine;

    constructor () {
    }
    public getScence(): Scene {
        return this._scene
    }

    public async _init(canvas: HTMLCanvasElement) {
        this._engine = (await EngineFactory.CreateAsync(canvas, undefined)) as Engine
        this._scene = new Scene(this._engine)
        // 世界重力
        this._scene.gravity = config.gravity;
        // 开启碰撞检测
        this._scene.collisionsEnabled = config.collisionable;
        // 环境渲染
        const skybox = MeshBuilder.CreateBox("skyBox", { size: 500}, this._scene);
        const skyMaterial = new SkyMaterial("sky", this._scene);
        // skyMaterial.backFaceCulling = false;
        // skyMaterial.turbidity = 20;
        // skyMaterial.inclination = 0.5;
        skyMaterial.useSunPosition = true;
        skyMaterial.sunPosition = new Vector3(0, 100, 0);
        skybox.material = skyMaterial;
        // 基础灯光
        new HemisphericLight(
            "baseLight",
            new Vector3(0, config.height + 100, 0),
            this._scene
        );
        // 调试能力
        this._enableDebuger()
        await this._render()
    }

    // 调试模式 Shift+Ctrl+Alt+I
    private async _enableDebuger() {
        window.addEventListener("keydown", (ev) => {
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                } else {
                    this._scene.debugLayer.show();
                }
            }
        });
    }

    // 引擎渲染函数
    private async _render(): Promise<void> {
        await this.createScene();
        setTimeout(() => {
            this._engine.runRenderLoop(() => {
                this._scene.render();
            });
        }, 500);
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

    // 环境内部细节初始化
    private async createScene() {
        // 监听3D点击事件
        window.addEventListener("click", () => {
            var pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
            console.log(pickResult)
        });
    }

}