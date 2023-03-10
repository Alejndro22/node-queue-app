// Referencias del HTML
const lblNewTicket = document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
  // console.log('Conectado');

  btnCreate.disabled = false;
});

socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');

  btnCreate.disabled = true;
});

socket.on('last-ticket', (payload) => {
  // used to display last ticket for client
  lblNewTicket.innerText = 'Ticket ' + payload;
});

btnCreate.addEventListener('click', () => {
  socket.emit('create-ticket', null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
