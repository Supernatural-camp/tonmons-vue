import { Scene } from 'phaser'

export class GameOverScene extends Scene {
    constructor() {
        super("GameOverScene");
    }

    create() {
        this.add.text(400, 300, 'GAME OVER!!!', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
    }
}