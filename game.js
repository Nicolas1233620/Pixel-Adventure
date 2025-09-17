let platforms
function createPlatform(scene,x,y,width,height){
    let platform = scene.add.tileSprite(x,y,width,height,"platform").setOrigin(0,0)
    platforms.add(platform)
    return platform
}
class GameScene extends Phaser.Scene{
    preload(){
        this.load.image("bg","Free/Background/Blue.png")
        this.load.image("platform","Free/Traps/Blocks/Idle.png")
    }
    create(){
        let width = this.sys.game.config.width
        let height = this.sys.game.config.height
        let bg = this.add.tileSprite(0,0,width,height,"bg").setOrigin(0,0)
        platforms = this.physics.add.staticGroup()
        createPlatform(this,100,200,500,22)
    }
    update(){}
}
let config = {
    type: Phaser.AUTO,
    height: 900,
    width: 1900,
    scene:GameScene
}
let game = new Phaser.Game(config)