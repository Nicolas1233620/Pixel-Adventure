import { db } from "../app/firebase.js"
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
let platforms
let player
let bananas
let coins = 0
let coinsText
let spikes
let localAllItems = JSON.parse(localStorage.getItem("allItems"))
let speed
let jump
let user = JSON.parse(localStorage.getItem("user"))
if (user) {
    const docRef = doc(db, "allItems", user.uid);
    const docSnap = await getDoc(docRef);
    speed = docSnap.data() ? docSnap.data().speed : 160
    jump = docSnap.data() ? docSnap.data().jump : 330
} else {
    speed = localAllItems ? localAllItems.speed : 160
    jump = localAllItems ? localAllItems.jump : 330
}
function createSpikes(scene, x, y, width, height, texture) {
    const spike = scene.add
        .tileSprite(x, y, width, height, texture)
        .setOrigin(0, 0)
        .setScale(2)
    spikes.add(spike);
}
function collectBananas(player, banana) {
    banana.disableBody(true, true)
    coins++
    coinsText.setText(`coins:${coins}`)
}
function createBananas(x, y, texture) {
    let banana = bananas.create(x, y, texture)
    banana.anims.play("bananas", true)
}
function createPlatform(scene, x, y, width, height, texture) {
    const platform = scene.add
        .tileSprite(x, y, width, height, texture)
        .setOrigin(0, 0)
        .setScale(2)
    platforms.add(platform);
    return platform;
}
class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2")
    }
    preload() { }
    create() { }
    update() { }
}
class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1")
    }
    preload() {
        this.load.image("bg", "Free/Background/Blue.png")
        this.load.image("ground", "Free/Terrain/block1.png")
        this.load.spritesheet("idle", "Free/Main Characters/Mask Dude/Idle (32x32).png", {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.spritesheet("run", "Free/Main Characters/Mask Dude/Run (32x32).png", {
            frameHeight: 32,
            frameWidth: 32,
        })
        this.load.spritesheet("jump", "Free/Main Characters/Mask Dude/Jump (32x32).png", {
            frameHeight: 32,
            frameWidth: 32,
        })
        this.load.image("platform", "Free/Terrain/one_terrain.png")
        this.load.spritesheet("bananas", "Free/Items/Fruits/Bananas.png", {
            frameHeight: 32,
            frameWidth: 32,
        })
        this.load.image("spikes", "Free/Traps/Spikes/Idle.png")
        this.load.spritesheet("end_sprite", "Free/Items/Checkpoints/End/End (Pressed) (64x64).png", {
            frameWidth: 64,
            frameHeight: 64,
        })
    }
    create() {
        let width = this.sys.game.config.width
        let height = this.sys.game.config.height
        let bg = this.add.tileSprite(0, 0, width, height, "bg").setOrigin(0, 0)

        let end = this.physics.add.sprite(300, 300, "end_sprite");


        platforms = this.physics.add.staticGroup();
        createPlatform(this, 0, height - 46 * 2, width, 46, 'ground')
        createPlatform(this, 185, 685, 150, 5, "platform")
        createPlatform(this, 700, 550, 150, 5, "platform")
        createPlatform(this, 350, 375, 150, 5, "platform")
        createPlatform(this, 775, 200, 150, 5, "platform")
        createPlatform(this, 1400, 300, 150, 5, "platform")
        createPlatform(this, 200, 685, 150, 5, "platform")

        bananas = this.physics.add.group();
        spikes = this.physics.add.group();
        createSpikes(this, 350, 650, 32, 16, "spikes")
        createSpikes(this, 900, 500, 32, 16, "spikes")
        createSpikes(this, 450, 325, 32, 16, "spikes")
        createSpikes(this, 800, 150, 32, 16, "spikes")



        player = this.physics.add.sprite(100, 700, "idle")
        player.setScale(2)
        player.setCollideWorldBounds(true)

        this.physics.add.collider(player, platforms)
        this.physics.add.collider(bananas, platforms)
        this.physics.add.collider(spikes, platforms)
        this.physics.add.collider(end, platforms)

        this.physics.add.overlap(player, bananas, collectBananas, null, this)
        this.physics.add.overlap(player, spikes, this.collectSpikes, null, this)
        this.physics.add.overlap(player, end, this.startLevel2, null, this)

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 10 }),
            repeat: -1
        })
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("jump", { start: 0, end: 0 }),
            repeat: 0
        })
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("run", { start: 0, end: 11 }),
            repeat: -1
        })
        this.anims.create({
            key: "bananas",
            frames: this.anims.generateFrameNumbers("bananas", { start: 0, end: 16 }),
            repeat: -1
        })
        this.anims.create({
            key: "end_sprite",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers("end_sprite", { start: 0, end: 7 }),
            repeat: -1
        })
        createBananas(250, 640, "bananas")
        createBananas(750, 525, "bananas")
        createBananas(400, 350, "bananas")
        createBananas(950, 140, "bananas")
        createBananas(1650, 250, "bananas")

        player.anims.play("idle", true)
        coinsText = this.add.text(16, 16, "Coins:0", {
            fontSize: "24px",
            fill: "black"
        })
        end.anims.play("end_sprite", true)
    }
    collectSpikes() {
        this.scene.restart()
        coins = 0
    }
    async startLevel2() {
        if (user) {
            await setDoc(doc(db, "allItems", user.uid), {
                coins,
                speed,
                jump,
            });

        } else {
            let allItems = {
                coins,
                speed,
                jump
            }
            localStorage.setItem("allItems", JSON.stringify(allItems))
        }
        coins = 0
        this.scene.start("Level2")
    }
    update() {
        let keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
        })
        if (keys.left.isDown) {
            player.anims.play("run", true)
            player.setVelocityX(-speed)
            player.flipX = true

        } else if (keys.right.isDown) {
            player.anims.play("run", true)
            player.setVelocityX(speed)
            player.flipX = false
        }
        else {
            player.anims.play("idle", true)
            player.setVelocityX(0)
        }
        if (keys.jump.isDown && player.body.touching.down) {
            player.setVelocityY(-jump)
        }
        if (!player.body.touching.down) {
            player.anims.play("jump", true)
        }
    }
}
let config = {
    type: Phaser.AUTO,
    height: 900,
    width: 1900,
    scene: [Level1, Level2],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    }
}
let game = new Phaser.Game(config)