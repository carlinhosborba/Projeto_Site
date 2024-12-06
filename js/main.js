const createRoomButton = document.getElementById('createRoomButton');
const createRoomModal = document.getElementById('createRoomModal');


createRoomButton.addEventListener('click', () => {
    createRoomModal.classList.toggle('hidden');
});
