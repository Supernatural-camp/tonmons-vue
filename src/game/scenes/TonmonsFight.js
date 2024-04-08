
import { ref } from 'vue'
import * as Colyseus from 'colyseus.js'
import Phaser from 'phaser'

export class TonmonsFight extends Phaser.Scene {
        
    constructor() {
        super('TonmonFight')
    }
    

    preload() {
        this.load.image("backgroundFight", "public/assets/FightScene-assets/backgroundFightScenejpg.jpg");
        this.load.spritesheet("hero1", 'public/assets/FightScene-assets/luffy1.png', {
            frameWidth: 106,
            frameHeight: 106
        });
        this.load.spritesheet("hero2", 'public/assets/FightScene-assets/zoro.png', {
            frameWidth: 106,
            frameHeight: 106
        });
    }
    init(){
        this.client = new Colyseus.Client('ws://localhost:4444')

    }
    async create() {
        this.background = this.add.tileSprite(512, 384, this.game.config.width, this.game.config.height, 'backgroundFight').setAlpha(0.5).setScale(1.7);

        const room = await this.client.joinOrCreate('my_room');
        console.log(room.sessionId);
        const serverData = ref(null);

        room.on('tonmonsData', (data) => {
            serverData.value = data;
        });

        const getTonmonInfo = (nameTonmon, parameterType) => {
            if (serverData.value && serverData.value.length > 0) {
                const tonmon = serverData.value.find(tonmon => tonmon.name === nameTonmon);
                console.log(tonmon.name)
                if (tonmon) {
                    return tonmon[parameterType];
                }
            }
            return null;
        };

        const hero1Name = getTonmonInfo("Pikachu", "name");
        const hero2Name = getTonmonInfo("Squirtle", "name");
        const hero1Hp = getTonmonInfo("Pikachu", "hp");
        const hero2Hp = getTonmonInfo("Squirtle", "hp");
        const hero1Speed = getTonmonInfo("Pikachu", "speed");
        const hero2Speed = getTonmonInfo("Squirtle", "speed");
        const hero1Defense = getTonmonInfo("Pikachu", "defense");
        const hero2Defense = getTonmonInfo("Squirtle", "defense");

        this.hero1 = this.add.sprite(this.game.config.width / 2 - 150, this.game.config.height / 2, 'hero1').setScale(2.5).setDepth(1).setOrigin(0.5);
        this.hero1.name = hero1Name ? hero1Name : "Unknown";
        this.hero1.hp = hero1Hp;
        this.hero1.speed = hero1Speed;
        this.hero1.defense = hero1Defense;

        this.hero2 = this.add.sprite(this.game.config.width / 2 + 150, this.game.config.height / 2, 'hero2').setScale(2.5).setDepth(1).setOrigin(0.5);
        this.hero1.name = hero1Name ? hero1Name : "Unknown";
        this.hero2.hp = hero2Hp;
        this.hero2.speed = hero2Speed;
        this.hero2.defense = hero2Defense;

        this.hpText1 = this.add.text(16, this.game.config.height - 80, `${this.hero1.name} HP: ${this.hero1.hp}`, {
            fontSize: '24px',
            fill: '#fff'
        });
        this.speedText1 = this.add.text(16, this.game.config.height - 60, `${this.hero1.name} Speed: ${this.hero1.speed}`, {
            fontSize: '24px',
            fill: '#fff'
        });
        this.defenseText1 = this.add.text(16, this.game.config.height - 40, `${this.hero1.name} Defense: ${this.hero1.defense}`, {
            fontSize: '24px',
            fill: '#fff'
        });

        this.hpText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 80, `${this.hero2.name} HP: ${this.hero2.hp}`, {
            fontSize: '24px',
            fill: '#fff'
        });
        this.speedText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 60, `${this.hero2.name} Speed: ${this.hero2.speed}`, {
            fontSize: '24px',
            fill: '#fff'
        });
        this.defenseText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 40, `${this.hero2.name} Defense: ${this.hero2.defense}`, {
            fontSize: '24px',
            fill: '#fff'
        });

    }
}
