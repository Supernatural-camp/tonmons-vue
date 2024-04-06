import { Scene } from 'phaser'

export class FightScene extends Scene {

    constructor() {
        super("Fight")
    }

    preload() {
        this.load.image("backgroundFight","public/assets/FightScene-assets/backgroundFightScenejpg.jpg");
        this.load.spritesheet("hero1", 'public/assets/FightScene-assets/luffy1.png', {
            frameWidth: 106,
            frameHeight: 106
        });
        this.load.spritesheet("hero2", 'public/assets/FightScene-assets/zoro.png', {
            frameWidth: 106,
            frameHeight: 106
        });
    }

    create() {
        this.background = this.add.tileSprite(512, 384, this.game.config.width, this.game.config.height, 'backgroundFight').setAlpha(0.5).setScale(1.7);

        this.hero1 = this.add.sprite(this.game.config.width / 2 - 150, this.game.config.height / 2, 'hero1').setScale(2.5).setDepth(1).setOrigin(0.5);
        this.hero2 = this.add.sprite(this.game.config.width / 2 + 150, this.game.config.height / 2, 'hero2').setScale(2.5).setDepth(1).setOrigin(0.5);

        this.hero1.name = "Luffy";
        this.hero2.name = "Zoro";


        this.hero1.hp = 150;
        this.hero1.speed = 50;
        this.hero1.defense = 0;


        this.hero2.hp = 150;
        this.hero2.speed = 40;
        this.hero2.defense = 0;

        this.hpText1 = this.add.text(16, this.game.config.height - 80, this.hero1.name + ' HP: ' + this.hero1.hp, { fontSize: '24px', fill: '#fff' });
        this.speedText1 = this.add.text(16, this.game.config.height - 60, this.hero1.name + ' Speed: ' + this.hero1.speed, { fontSize: '24px', fill: '#fff' });
        this.defenseText1 = this.add.text(16, this.game.config.height - 40, this.hero1.name + ' Defense: ' + this.hero1.defense, { fontSize: '24px', fill: '#fff' });

        this.hpText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 80, this.hero2.name + ' HP: ' + this.hero2.hp, { fontSize: '24px', fill: '#fff' });
        this.speedText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 60, this.hero2.name + ' Speed: ' + this.hero2.speed, { fontSize: '24px', fill: '#fff' });
        this.defenseText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 40, this.hero2.name + ' Defense: ' + this.hero2.defense, { fontSize: '24px', fill: '#fff' });

        this.turnText = this.add.text(this.game.config.width / 2, this.game.config.height - 120, 'Your Turn', { fontSize: '32px', fill: '#00ff00' }).setOrigin(0.5);

        this.attack1Button = this.createAttackButton(this.game.config.width / 2 - 150, this.game.config.height - 100, 'Attack1', 10, 0);
        this.attack2Button = this.createAttackButton(this.game.config.width / 2 - 30, this.game.config.height - 100, 'Attack2', 25, 0);
        this.defenseButton = this.createAttackButton(this.game.config.width / 2 + 90, this.game.config.height - 100, 'Defense', 0, 15);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.time.addEvent({
            delay: 3000,
            callback: this.botAttack,
            callbackScope: this,
            loop: true
        });

        this.initializeTurn();
    }

    initializeTurn() {
        if (this.hero1.speed > this.hero2.speed) {
            this.playerTurn = true;
            this.turnText.setText('Your Turn');
        } else {
            this.playerTurn = false;
            this.time.delayedCall(4000, () => {
                this.botAttack();
            });
            this.turnText.setText('Enemy Turn');
        }
    }

    botAttack() {
        if (!this.playerTurn) {
            const abilities = ['Attack', 'Defense', 'Ultimate'];

            const selectedAbility = Phaser.Math.RND.pick(abilities);

            let damage;
            switch (selectedAbility) {
                case 'Attack':
                    damage = 10;
                    break;
                case 'Defense':
                    damage = 25;
                    break;
                case 'Ultimate':
                    damage = 50;
                    break;
            }

            this.hero1.hp -= damage;

            this.hpText1.setText(this.hero1.name + ' HP: ' + this.hero1.hp);
            this.speedText2.setText(this.hero2.name + ' Speed: ' + this.hero2.speed);

            this.hero1.setTint(0xff0000);
            this.time.delayedCall(200, () => {
                this.hero1.clearTint();
            });

            this.playerTurn = true;
            this.checkGameOver();
        }
    }

    createAttackButton(x, y, text, damage, defense) {
        return this.add.text(x, y, text, { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.playerTurn) {
                    if (defense > 0) {
                        this.hero2.defense += defense; // Увеличиваем защиту
                        this.defenseText2.setText(this.hero2.name + ' Defense: ' + this.hero2.defense); // Обновляем текст защиты
                    }
                    else {
                        this.hero2.hp -= damage - this.hero2.defense; // Уменьшаем HP с учетом защиты
                        if (this.hero2.hp < 0) this.hero2.hp = 0; // Проверяем, чтобы HP не был отрицательным
                        this.speedText2.setText(this.hero2.name + ' Speed: ' + this.hero2.speed);
                    }
                    this.hero2.setTint(0xff0000);
                    this.time.delayedCall(200, () => {
                        this.hero2.clearTint();
                    });
                    this.playerTurn = false;
                    this.time.delayedCall(4000, () => {
                        this.botAttack();
                    });
                    this.checkGameOver();
                }
            })
            .setStroke('#ff0', 5);
    }


    checkGameOver() {
        if (this.hero1.hp <= 0 || this.hero2.hp <= 0) {
        }
    }

    update(){
        this.hpText2.setText(this.hero2.name + ' HP: ' + this.hero2.hp);
        this.turnText.setText(this.playerTurn ? 'Your Turn' : 'Enemy Turn');
    }

}
