// html refs
const lblDesktop = document.querySelector('h1');
const btnServe = document.querySelector('button');
const lblTicket = document.querySelector('small');
const emptyQueueAlert = document.querySelector('.alert');
const queueCount = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('You must send a desktop');
}

const desktop = searchParams.get('escritorio');
lblDesktop.innerText = desktop;
emptyQueueAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
  // console.log('Conectado');

  btnServe.disabled = false;
});

socket.on('disconnect', () => {
  // console.log('Desconectado del servidor');

  btnServe.disabled = true;
});

socket.on('disp-pending-tickets', (payload) => {
  if (payload === 0) {
    emptyQueueAlert.style.display = '';
  } else {
    emptyQueueAlert.style.display = 'none';
    queueCount.innerText = payload;
  }
});

btnServe.addEventListener('click', () => {
  const payload = { desktop };
  socket.emit('serve-ticket', payload, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = 'Nadie. ';
      return (emptyQueueAlert.style.display = '');
    }
    lblTicket.innerText = 'Ticket ' + ticket.number;
  });
});
