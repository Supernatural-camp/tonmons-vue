import { Scene } from 'phaser'

export class FightScene extends Scene{

    constructor() {
        super("Fight")
    }

    preload(){
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

    create(){
        this.background = this.add.tileSprite(512, 384, this.game.config.width, this.game.config.height, 'backgroundFight').setAlpha(0.5).setScale(1.7);

        this.hero1 = this.add.sprite(this.game.config.width / 2 - 150, this.game.config.height / 2, 'hero1').setScale(2.5).setDepth(1).setOrigin(0.5);
        this.hero2 = this.add.sprite(this.game.config.width / 2 + 150, this.game.config.height / 2, 'hero2').setScale(2.5).setDepth(1).setOrigin(0.5);

        this.hero1.name = "Luffy";
        this.hero2.name = "Zoro";

        this.hero1.hp = 150;
        this.hero1.mp = 110;

        this.hero2.hp = 150;
        this.hero2.mp = 110;

        this.hpText1 = this.add.text(16, this.game.config.height - 80, this.hero1.name + ' HP: 100', { fontSize: '24px', fill: '#fff' });
        this.mpText1 = this.add.text(16, this.game.config.height - 60, this.hero1.name + ' MP: 50', { fontSize: '24px', fill: '#fff' });

        this.hpText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 80, this.hero2.name + ' HP: 120', { fontSize: '24px', fill: '#fff' });
        this.mpText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 60, this.hero2.name + ' MP: 40', { fontSize: '24px', fill: '#fff' });

        this.turnText = this.add.text(this.game.config.width / 2, this.game.config.height - 120, 'Your Turn', { fontSize: '32px', fill: '#00ff00' }).setOrigin(0.5);

        this.attack1Button = this.createAttackButton(this.game.config.width / 2 - 150, this.game.config.height - 100, 'Attack1', 10, 10);
        this.attack2Button = this.createAttackButton(this.game.config.width / 2 - 30, this.game.config.height - 100, 'Attack2', 25, 20);
        this.ultimateButton = this.createAttackButton(this.game.config.width / 2 + 90, this.game.config.height - 100, 'Ultimate', 50, 50);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.time.addEvent({
            delay: 3000, 
            callback: this.botAttack,
            callbackScope: this,
            loop: true 
        });

        this.playerTurn = true;
    
    }
    
    
    botAttack() {
        if (!this.playerTurn) {
            const abilities = ['Attack1', 'Attack2', 'Ultimate'];

            const selectedAbility = Phaser.Math.RND.pick(abilities);

            let damage, manaCost;
            switch (selectedAbility) {
                case 'Attack1':
                    damage = 10;
                    manaCost = 10;
                    break;
                case 'Attack2':
                    damage = 25;
                    manaCost = 20;
                    break;
                case 'Ultimate':
                    damage = 50;
                    manaCost = 50;
                    break;
            }

            this.hero1.hp -= damage;
            this.hero2.mp -= manaCost;

            this.hpText1.setText(this.hero1.name + ' HP: ' + this.hero1.hp);
            this.mpText2.setText(this.hero2.name + ' MP: ' + this.hero2.mp);

            this.hero1.setTint(0xff0000);
            this.time.delayedCall(200, () => {
                this.hero1.clearTint();
            });

            this.playerTurn = true;

            // Проверка на окончание игры
            this.checkGameOver();
        }
    }


    createAttackButton(x, y, text, damage, manaCost) {
        return this.add.text(x, y, text, { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.playerTurn) {
                    this.hero2.hp -= damage;
                    this.hero1.mp -= manaCost; // Уменьшаем ману первого персонажа
                    this.hpText2.setText(this.hero2.name + ' HP: ' + this.hero2.hp); // Обновляем текст здоровья второго персонажа
                    this.mpText1.setText(this.hero1.name + ' MP: ' + this.hero1.mp); // Обновляем текст маны первого персонажа
                    this.hero2.setTint(0xff0000); // Устанавливаем красный цвет персонажу
                    this.time.delayedCall(200, () => { // Устанавливаем задержку
                        this.hero2.clearTint(); // Очищаем цвет персонажа
                    });

                    this.playerTurn = false; // Установка флага на ход бота
                    this.time.delayedCall(4000, () => {
                        this.botAttack(); // Задержка перед ходом бота
                    });

                    // Проверка на окончание игры
                    this.checkGameOver();
                }
            })
            .setStroke('#ff0', 5);

    }

    checkGameOver() {
        if (this.hero1.hp <= 0 || this.hero2.hp <= 0 || this.hero1.mp <= 0 || this.hero2.mp <= 0) {
            if (this.hero1.mp <= 0 && this.hero2.mp <= 0) {
                if (this.hero1.hp < this.hero2.hp) {
                    this.scene.start("GameOverScene", { message: this.hero1.name + " Wins!" });
                } else if (this.hero1.hp > this.hero2.hp) {
                    this.scene.start("GameOverScene", { message: this.hero2.name + " Wins!" });
                } else {
                    this.scene.start("GameOverScene", { message: "It's a draw!" });
                }
            } else {
                if (this.hero1.mp <= 0) {
                    this.scene.start("GameOverScene", { message: this.hero1.name + " Loses!" });
                } else if (this.hero2.mp <= 0) {
                    this.scene.start("GameOverScene", { message: this.hero2.name + " Loses!" });
                }
            }
        }
    }

    update(){
        this.mpText2.setText(this.hero2.name + ' MP: ' + this.hero2.mp);
        this.turnText.setText(this.playerTurn ? 'Your Turn' : 'Enemy Turn');
    }
}

export class GameOverScene extends Scene {
    constructor() {
        super("GameOverScene");
    }

    create(data) {
        this.add.text(400, 300, data.message, { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
    }
}
