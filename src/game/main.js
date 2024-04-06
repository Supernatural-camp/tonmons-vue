import Phaser from 'phaser';
import { Scene1 } from './scenes/Scene1.js'
import { FightScene } from './scenes/FightScene.js'
import { GameOverScene } from './scenes/GameOverScene.js'
import { TonmonScene } from './scenes/TonmonScene.js'

// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Scene1,
        FightScene,
        GameOverScene,
        TonmonScene
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });
}

export default StartGame;
