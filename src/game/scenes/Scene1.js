import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Scene1 extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image("background", "public/assets/onepiece1.jpg");
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);

        // Добавляем текст приветствия
        this.add.text(512, 384, 'Welcome to \n Supernaturals!!!', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Добавляем изображение фона
        this.add.image(512, 384, 'background').setAlpha(0.5).setScale(1.5);

        // Добавляем кнопку Fight
        const fightButton = this.add.text(512, 600, 'Fight', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 10 },
            align: 'center',
            stroke: '#ffffff',
            strokeThickness: 2
        }).setOrigin(0.5).setDepth(100);

        // Добавляем обработчик события нажатия на кнопку
        fightButton.setInteractive();
        fightButton.on('pointerdown', () => {
            this.changeScene();
        });

        // Отправляем событие, когда сцена готова
        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('Fight');
    }
}
