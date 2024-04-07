import { ref } from 'vue'

const socket = new WebSocket('ws://localhost:4444');

const serverData = ref('');

socket.addEventListener('open', function(event) {
    socket.send('hello server');
});

socket.addEventListener('message', function(event) {
    console.log('Message from server', event.data);
    serverData.value = JSON.parse(event.data); // Преобразуем строку JSON в объект
    showCharacter(serverData.value); // Вызываем функцию для отображения персонажа
});

const sendMessage = () => {
    socket.send('hello from client2');
};

const filteredTonmon = ref(null);

serverData.value = watch(serverData, (newValue) => {
    if (newValue && newValue.length > 0) {
        // Ищем объект с именем "Pikachu" в массиве данных
        filteredTonmon.value = newValue.find(tonmon => tonmon.name === "Pikachu");
        showCharacter(filteredTonmon.value); // Вызываем функцию для отображения персонажа
    }
});

// Функция для отображения персонажа на игровой сцене
function showCharacter(characterData) {
    if (characterData) {
        // Очищаем предыдущие данные о персонаже, если они есть
        if (this.currentCharacter) {
            this.currentCharacter.destroy();
        }

        // Отображаем нового персонажа
        this.currentCharacter = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, characterData.sprite).setScale(2.5).setDepth(1).setOrigin(0.5);
        this.currentCharacter.name = characterData.name;
        this.currentCharacter.hp = characterData.hp;
        this.currentCharacter.speed = characterData.speed;
        this.currentCharacter.defense = characterData.defense;
    }
}
