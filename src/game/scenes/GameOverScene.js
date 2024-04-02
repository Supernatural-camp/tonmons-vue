import { Scene } from 'phaser'

export class GameOverScene extends Scene {
    constructor() {
        super("GameOverScene");
    }

    preload(){
        this.load.image("backgroundWin", "public/assets/GameOverScene/WinBackground.jpg");
        this.load.image("backgroundLose", "public/assets/GameOverScene/LoseBackgorund.jpg");
    }

    create(data) {
        if (data.message === "You Win!") {
            this.add.image(512, 384, "backgroundWin");
        } else if(data.message==='You Lose!') {
            this.add.image(512, 384, "backgroundLose").setScale(1.5);
        }

        this.add.text(400, 300, data.message, { fontSize: '94px', fill: '#000' }).setOrigin(0.5);
    }
}
