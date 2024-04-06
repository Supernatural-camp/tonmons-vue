// Ваш клиентский код
import { Scene } from 'phaser';
import io from 'socket.io-client';

export class TonmonScene extends Scene {
    constructor() {
        super({ key: 'TonmonScene' });
    }

    preload() {
        // Здесь вы можете загрузить любые изображения или другие ресурсы, необходимые для вашей сцены
    }

    create() {
        // Добавьте здесь код для создания сцены, используя данные о тонмонах
        const socket = io(); // Подключение к серверу через веб-сокет

        socket.on('tonmonsData', (tonmonsData) => {
            // Обработка полученных данных о тонмонах
            console.log('Received Tonmons Data:', tonmonsData);
            // Добавьте вашу логику для отображения тонмонов на сцене
        });
    }
}
