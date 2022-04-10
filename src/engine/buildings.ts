
import { Scene, SceneLoader } from "@babylonjs/core";

export default class Buildings {
    public _scene: Scene;
    public _buildings: any[] = []

    constructor (scene: Scene, mesh: string[]) {
        this._scene = scene
        mesh && this.loadBuildings(mesh)
    }
    // 加载模型(组)
    public async loadBuildings (mesh: string[]) {
        if(mesh.length < 3) {
            throw new Error('Invalid mesh info, please contact the IT support.')
        }
        // 导入场景模型 
        SceneLoader.ImportMesh(mesh[0], mesh[1], mesh[2], this._scene, (meshes) => {
            this._buildings = meshes
            for(let i=0; i< meshes.length; i++) {
                meshes[i].checkCollisions = true
            }
        });
        await this._scene.whenReadyAsync()
    }
    // 获取模型(组)
    public getBuildings (): any[] {
        return this._buildings
    }
}