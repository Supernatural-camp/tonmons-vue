<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div>
        <div v-if="spritePosition">Sprite Position: {{ spritePosition }}</div>
        <button @click="changeScene">Change Scene</button>
        <button @click="moveSprite" :disabled="!canMoveSprite">Move Sprite</button>
        <button @click="addSprite">Add Sprite</button>
        <div>Data from server: {{ serverData }}</div>
        <button @click="sendMessage">Send Message to Server</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const socket = new WebSocket('ws://localhost:4444');

const serverData = ref('');

socket.addEventListener('open', function(event) {
    socket.send('hello server');
});

socket.addEventListener('message', function(event) {
    console.log('Message from server', event.data);
    serverData.value = event.data; // Сохраняем данные от сервера в переменной
});

const sendMessage = () => {
    socket.send('hello from client2');
};
</script>
