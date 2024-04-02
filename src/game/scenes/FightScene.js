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
        this.background = this.add.tileSprite(512, 384, this.game.config.width, this.game.config.height, 'backgroundFight').setAlpha(0.5).setScale(1.0);

        // Устанавливаем персонажей
        this.hero1 = this.add.sprite(this.game.config.width / 2 - 150, this.game.config.height / 2, 'hero1').setScale(2.5).setDepth(1).setOrigin(0.5);
        this.hero2 = this.add.sprite(this.game.config.width / 2 + 150, this.game.config.height / 2, 'hero2').setScale(2.5).setDepth(1).setOrigin(0.5);

        // Устанавливаем параметры персонажей
        this.hero1.hp = 100;
        this.hero1.mp = 110;

        this.hero2.hp = 150;
        this.hero2.mp = 80;

        // Создаем текст для отображения здоровья и маны
        this.hpText1 = this.add.text(16, this.game.config.height - 50, 'HP: 100', { fontSize: '24px', fill: '#fff' });
        this.mpText1 = this.add.text(16, this.game.config.height - 30, 'MP: 50', { fontSize: '24px', fill: '#fff' });

        this.hpText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 50, 'HP: 120', { fontSize: '24px', fill: '#fff' });
        this.mpText2 = this.add.text(this.game.config.width - 200, this.game.config.height - 30, 'MP: 40', { fontSize: '24px', fill: '#fff' });
        const buttonSpacing = 120;

        // Создаем кнопки атаки
        this.attack1Button = this.createAttackButton(this.game.config.width / 2 - 150, this.game.config.height - 100, 'Attack1', 10, 10);
        this.attack2Button = this.createAttackButton(this.game.config.width / 2 - 30, this.game.config.height - 100, 'Attack2', 25, 20);
        this.ultimateButton = this.createAttackButton(this.game.config.width / 2 + 90, this.game.config.height - 100, 'Ultimate', 50, 50);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.time.addEvent({
            delay: 3000, // Задержка в 3 секунды
            callback: this.botAttack, // Функция, которая будет вызвана после задержки
            callbackScope: this, // Область видимости для вызываемой функции
            loop: true // Повторять событие после каждого выполнения
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

            this.hpText1.setText('HP: ' + this.hero1.hp);
            this.mpText2.setText('MP: ' + this.hero2.mp);

            this.hero1.setTint(0xff0000);
            this.time.delayedCall(200, () => {
                this.hero1.clearTint();
            });

            this.playerTurn = true;
        }
    }


    createAttackButton(x, y, text, damage, manaCost) {
        return this.add.text(x, y, text, { fontSize: '24px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', () => {
                if (this.playerTurn) {
                    this.hero2.hp -= damage;
                    this.hero1.mp -= manaCost; // Уменьшаем ману первого персонажа
                    this.hpText2.setText('HP: ' + this.hero2.hp); // Обновляем текст здоровья второго персонажа
                    this.mpText1.setText('MP: ' + this.hero1.mp); // Обновляем текст маны первого персонажа
                    this.hero2.setTint(0xff0000); // Устанавливаем красный цвет персонажу
                    this.time.delayedCall(200, () => { // Устанавливаем задержку
                        this.hero2.clearTint(); // Очищаем цвет персонажа
                    });

                    this.playerTurn = false; // Установка флага на ход бота
                    this.time.delayedCall(4000, () => {
                        this.botAttack(); // Задержка перед ходом бота
                    });
                }
            })
            .setStroke('#ff0', 5);

    }

    checkGameOver() {
        if (this.hero1.hp <= 0 || this.hero2.hp <= 0) {
            this.scene.start("GameOverScene");
        }
    }

    update(){
        this.mpText2.setText('MP: ' + this.hero2.mp);
        this.checkGameOver();
    }
}

export class GameOverScene extends Scene {
    constructor() {
        super("GameOverScene");
    }

    create() {
        this.add.text(400, 300, 'GAME OVER!!!', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
    }
}
