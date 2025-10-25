let platforms
let player
let bananas
let coins = 0
let coinsText
let spikes
function createSpikes(scene, x, y, width, height, texture) {
    const spike = scene.add
    .tileSprite( x, y, width, height, texture)
    .setOrigin(0,0)
    .setScale(2)
    spikes.add(spike);
}
function collectBananas(player,banana) {
    banana.disableBody(true,true)
    coins++
    coinsText.setText(`coins:${coins}`)
}
function createBananas(x, y, texture) {
    let banana = bananas.create(x, y, texture)
    banana.anims.play("bananas",true)
}
function createPlatform(scene, x, y, width, height, texture) {
    const platform = scene.add
      .tileSprite(x, y, width, height, texture)
      .setOrigin(0, 0)
      .setScale(2)
    platforms.add(platform);
    return platform;
  }
class GameScene extends Phaser.Scene{
    preload(){
        this.load.image("bg","Free/Background/Blue.png")
        this.load.image("ground","Free/Terrain/block1.png")
        this.load.spritesheet("idle","Free/Main Characters/Mask Dude/Idle (32x32).png",{
            frameWidth:32,
            frameHeight:32,
        })
        
        this.load.spritesheet("run","Free/Main Characters/Mask Dude/Run (32x32).png",{
            frameHeight:32,
            frameWidth:32
        })
        this.load.spritesheet("jump","Free/Main Characters/Mask Dude/Jump (32x32).png",{
            frameHeight:32,
            frameWidth:32
        })
        this.load.image("platform","Free/Terrain/one_terrain.png")
        this.load.spritesheet("bananas","Free/Items/Fruits/Bananas.png",{
            frameHeight:32,
            frameWidth:32,
        })
        this.load.image("spikes","Free/Traps/Spikes/Idle.png")
    }
    create(){
        let width = this.sys.game.config.width
        let height = this.sys.game.config.height
        let bg = this.add.tileSprite(0,0,width,height,"bg").setOrigin(0,0)

        platforms = this.physics.add.staticGroup();
        createPlatform(this, 0, height - 46*2 , width, 46, 'ground')
        createPlatform(this, 200, 685 , 150 , 5 , "platform")
        createPlatform(this, 700, 550 , 150 , 5 , "platform")
        createPlatform(this, 350, 375 , 150 , 5 , "platform")
        createPlatform(this, 775, 200 , 150 , 5 , "platform")
        createPlatform(this, 1400,300 ,150 ,5 , "platform")
        createPlatform(this, 200, 685 , 150 , 5 , "platform")

        bananas = this.physics.add.group();
        spikes = this.physics.add.group();
        createSpikes(this, 240, 245, 32, 16, "spikes")


        player = this.physics.add.sprite(100,700,"idle")
        player.setScale(2)
        player.setCollideWorldBounds(true)

        this.physics.add.collider(player,platforms)
        this.physics.add.collider(bananas,platforms)
        this.physics.add.collider(spikes,platforms)

        this.physics.add.overlap(player,bananas, collectBananas , null , this)
        this.physics.add.overlap(player,spikes, this.collectSpikes,null,this)

        this.anims.create({
            key:"idle",
            frames:this.anims.generateFrameNumbers("idle",{start:0,end:10}),
            repeat:-1
        })
        this.anims.create({
            key:"jump",
            frames:this.anims.generateFrameNumbers("jump",{start:0,end:0}),
            repeat:0
        })
        this.anims.create({
            key:"run",
            frames:this.anims.generateFrameNumbers("run",{start:0,end:11}),
            repeat:-1
        })
        this.anims.create({
            key:"bananas",
            frames:this.anims.generateFrameNumbers("bananas",{start:0,end:16}),
            repeat:-1
        })
        createBananas(400, 640 , "bananas")
        createBananas(750, 525 , "bananas")
        createBananas(400, 350 , "bananas")
        createBananas(950, 140 , "bananas")
        createBananas(1650, 250 , "bananas")

        player.anims.play("idle",true)
        coinsText = this.add.text(16 ,16 , "Coins:0", {
            fontSize: "24px",
            fill: "black"
        })
    }
    collectSpikes(){
        this.scene.restart()
        coins = 0
    }
    update(){
        let keys = this.input.keyboard.addKeys({
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            jump:Phaser.Input.Keyboard.KeyCodes.SPACE,
        })
        if (keys.left.isDown&&player.body.touching.down) {
            player.anims.play("run",true)
            player.setVelocityX(-160)
            player.flipX=true
            
        }else if(keys.right.isDown&&player.body.touching.down){
            player.anims.play("run",true)
            player.setVelocityX(160)
            player.flipX=false
        }else if (!player.body.touching.down) {
            player.anims.play("jump",true)
        }
        else{
            player.anims.play("idle",true)
            player.setVelocityX(0)
        }
        if (keys.jump.isDown&&player.body.touching.down){
            player.setVelocityY(-330)
        }
    }   
}
let config = {
    type: Phaser.AUTO,
    height: 900,
    width: 1900,
    scene:GameScene,
    physics: {
        default:"arcade",
        arcade:{
            gravity:{y:300},
            debug:true
        }
    }
}
let game = new Phaser.Game(config)