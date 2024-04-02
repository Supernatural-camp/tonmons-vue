import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Scene2 extends Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image("background1", "public/assets/Scene2-assets/cosmos.jpg");
        this.load.spritesheet("ship", 'public/assets/Scene2-assets/ship.png', {
            frameWidth: 76,
            frameHeight: 76
        });
        this.load.spritesheet("ship2", 'public/assets/Scene2-assets/ship2.png', {
            frameWidth: 106,
            frameHeight: 76
        });
        this.load.spritesheet("ship3", 'public/assets/Scene2-assets/ship3.png', {
            frameWidth: 106,
            frameHeight: 106
        });
        this.load.spritesheet("explosion", 'public/assets/Scene2-assets/explosion.png', {
            frameWidth: 76,
            frameHeight: 76
        });
    }

    create() {
        this.background = this.add.tileSprite(512, 384, this.game.config.width, this.game.config.height, 'background1').setAlpha(0.5).setScale(1.0);

        this.ship = this.add.sprite(this.game.config.width / 2 - 150, this.game.config.height / 1, 'ship').setScale(2.5);
        this.ship2 = this.add.sprite(this.game.config.width / 2 + 150, this.game.config.height / 1, 'ship2').setScale(1.8);
        this.ship3 = this.add.sprite(this.game.config.width / 2 + 150, this.game.config.height / 1, 'ship3').setScale(1.5);

        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "explode_ship",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        this.ship.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);

        EventBus.emit('current-scene-ready', this);

    }

  

    update(time, delta) {
        this.moveShip(this.ship, 4);
        this.moveShip(this.ship2, 6);
        this.moveShip(this.ship3, 8);
        this.background.tilePositionY -= 0.5;
    }

    moveShip(ship, speed) {
        ship.y += speed;
        if (ship.y > this.game.config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = 0;
        let randomX = Phaser.Math.Between(0, this.game.config.width);
        ship.x = randomX;
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture('explosion');
    }
    changeScene ()
    {
        this.scene.start('Fight');
    }
}
