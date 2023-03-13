const log = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};

const onChatSubmitted = (sock) => (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
};

const getBoard = (canvas) => {

    const ctx = canvas.getContext('2d');

    const fillCircle = (x, y, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x - 10, y - 10, 20, 20);

    };

    return { fillCircle };

};

const getClickCoordinates = (element, ev) => {
    const { top, left } = element.getBoundingClientRect();
    const { clientX, clientY } = ev;

    return {
        x: clientX - left,
        y: clientY - top
    };
};

(() => {

    const canvas = document.querySelector('canvas');
    const { fillCircle } = getBoard(canvas);
    const sock = io();

    const onClick = (e) => {
        const { x, y } = getClickCoordinates(canvas, e);
        sock.emit('turn', { x, y });
    };

    sock.on('message', log);
    sock.on('turn', ({ x, y }) => fillCircle(x,y));

    document
    .querySelector('#chat-form')
    .addEventListener('submit', onChatSubmitted(sock));

    canvas.addEventListener('click', onClick);
})();