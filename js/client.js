const getClickCoordinates = (element, event) => {
  const { top, left } = element.getBoundingClientRect();
  const { clientX, clientY } = event;
  return {
    x: clientX - left,
    y: clientY - top
  };
};

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

const createBoard = (canvas, width = 500, height = 500, numRows = 6, numColumns = 7, cushion = 5) => {
  const ctx = canvas.getContext('2d');

  const fillCell = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x*cellSize, y*cellSize, 20, 20);
  };

  const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawGrid = () => {
    ctx.beginPath();

    ctx.moveTo(0,0);
    ctx.lineTo(0,500);

    ctx.moveTo(0,500);
    ctx.lineTo(500,500);

    ctx.moveTo(500,500);
    ctx.lineTo(500,0);

    ctx.moveTo(500,0);
    ctx.lineTo(0,0);

    const x = 0;
    const y = 0;
    const r = 0;

    //for (let i = 0; i < numColumns; i++) {
      x = ((width - ((numColumns + 1) * cushion))/numColumns) + cushion;
      y = ((height - ((numRows + 1) * cushion))/numRows) + cushion;
      r = 38.75;

      ctx.moveTo(x,y);
       // arc(x-coordinate center, y-coordinate center, radius of circle, start angle, end angle)
      ctx.arc(x,y,r,0,2*Math.PI);

      ctx.stroke();
    };

  const drawBoard = (board) => {
    board.forEach((row, y) => {
      row.forEach((color, x) => {
        color && fillCell(x, y, color);
      })
    })
  };

  const reset = (board = []) => {
    clear();
    drawGrid();
    drawBoard(board);
  };

  const getCellCoordinates = (x, y) => ({
    x: Math.floor(x/cellSize),
    y: Math.floor(y/cellSize)
  });

  return { fillCell, reset, getCellCoordinates };
};


(() => {

  log('chat is disabled on this server');

  const sock = io();
  const canvas = document.querySelector('canvas');
  const { fillCell, reset, getCellCoordinates } = createBoard(canvas);

  const onClick = (e) => {
    const { x, y } = getClickCoordinates(canvas, e);
    sock.emit('turn', getCellCoordinates(x, y));
  };

  sock.on('message', log);
  sock.on('turn', ({ x, y, color }) => fillCell(x, y, color));
  sock.on('board', reset);

  document
    .querySelector('#chat-form')
    .addEventListener('submit', onChatSubmitted(sock));

  canvas.addEventListener('click', onClick);
})();
