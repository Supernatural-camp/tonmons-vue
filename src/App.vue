<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div>
        <div v-if="spritePosition">Sprite Position: {{ spritePosition }}</div>
        <button @click="changeScene">Change Scene</button>
        <button @click="moveSprite" :disabled="!canMoveSprite">Move Sprite</button>
        <button @click="addSprite">Add Sprite</button>

        <div>Data from server: {{ serverData }}</div>

        <!-- Отобразить параметры первого объекта -->
        <div v-if="filteredTonmon">
            <h2>Filtered Tonmon</h2>
            <ul>
                <li>Name: {{ filteredTonmon.name }}</li>
                <li>Parameter 1: {{ filteredTonmon.element }}</li>
                <li>Parameter 2: {{ filteredTonmon.rarity }}</li>
                <li>Parameter 2: {{ filteredTonmon.health }}</li>
                <!-- Добавьте другие параметры по аналогии -->
            </ul>
        </div>

        <button @click="sendMessage">Send Message to Server</button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const socket = new WebSocket('ws://localhost:4444');

const serverData = ref('');

socket.addEventListener('open', function(event) {
    socket.send('hello server');
});

socket.addEventListener('message', function(event) {
    console.log('Message from server', event.data);
    serverData.value = JSON.parse(event.data); // Преобразуем строку JSON в объект
});

const sendMessage = () => {
    socket.send('hello from client2');
};

const filteredTonmon = ref(null);

// Применение фильтрации к данным о тонмонсах после их обновления
serverData.value = watch(serverData, (newValue) => {
    if (newValue && newValue.length > 0) {
        // Ищем объект с именем "Pikachu" в массиве данных
        filteredTonmon.value = newValue.find(tonmon => tonmon.name === "Pikachu");
    }
});
</script>
