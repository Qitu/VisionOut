import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";

import { Engine, Scene, Vector3, Color4, UniversalCamera, HemisphericLight, EngineFactory, MeshBuilder } from "@babylonjs/core";


class app{
  private _canvas: HTMLCanvasElement;
  private _scene!: Scene;
  private _engine!: Engine;

  constructor() {
    this._canvas = this._createCanvas();
    this._init();
  }

  public getScence(): Scene {
    return this._scene
  }

  // 初始化引擎
  private async _init(): Promise<void> {
    this._engine = (await EngineFactory.CreateAsync(this._canvas, undefined)) as Engine
    this._scene = new Scene(this._engine)
    this._enableDebuger()
    await this._render()
  }

  // 设置页面画布 Canvas
  private _createCanvas(w = "100%", h = "100%"): HTMLCanvasElement {
    document.documentElement.style["overflow"] = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    this._canvas = document.createElement("canvas");
    this._canvas.style.width = w;
    this._canvas.style.height = h;
    this._canvas.id = "gameCanvas";
    document.body.appendChild(this._canvas);
    return this._canvas;
  }

  // 引擎渲染函数
  private async _render(): Promise<void> {
    await this.createScene();
    setTimeout(() => {
      
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
    }, 2000);
    window.addEventListener('resize', () => {
        this._engine.resize();
    });
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


  private async createScene() {
    // 监听3D点击事件
    window.addEventListener("click", () => {
      var pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);
      console.log(pickResult)
    });

    // 场景颜色
    this._scene.clearColor = new Color4(0, 0, 0, 1);

    // 添加一个相机，并绑定鼠标事件
    const camera = new UniversalCamera(
      "Camera",
      new Vector3(0, 17, 5),
      this._scene
    );
    camera.attachControl(this._canvas, true);
    camera.speed = 0.2
    this._scene.gravity = new Vector3(0, -9.81, 0);
    camera.applyGravity = true;
    camera.ellipsoid = new Vector3(1, 1, 1);

    // 灯光
    new HemisphericLight(
      "light1",
      new Vector3(0, 0, 0),
      this._scene
    );

    const myGround = MeshBuilder.CreateGround(
      "myGround",
      { width: 150, height: 150, subdivisions: 4 },
      this._scene
    );
    myGround.position = new Vector3(2, -1, 0);
    myGround.checkCollisions = true;

    await this._scene.whenReadyAsync();
  }

}
new app()

