import { createCanvas } from './utils/dom'
import World from './engine/world'
import Camera from './engine/camera'
import Buildings from './engine/buildings'

class app{

  private _canvas: HTMLCanvasElement;
  private _world: any;
  private _builds: any;
  private _camera: any;
  private _players: any;

  constructor() {
    this._canvas = createCanvas();
    // API...
    this._world = new World() // 构建世界
    this._world._init(this._canvas).then(() => {
    this._builds = new Buildings(this._world.getScence(), ["", "resource/models/democity/", "simplepoly-city-low-poly-assets.babylon"])
    this._camera = new Camera(this._world.getScence(), this._canvas)
    })
  }
}

new app()

