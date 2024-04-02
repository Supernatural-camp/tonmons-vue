import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Scene1 extends Scene
{
    constructor ()
    {
        super('Game');
    }
    preload(){
        this.load.image("background", "public/assets/onepiece1.jpg");
        
    }


    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background').setAlpha(0.5).setScale(1.5);

        

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}