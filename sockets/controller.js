import TicketControl from '../models/ticket-control.js';

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last);

  socket.on('create-ticket', (payload, callback) => {
    if (!callback) return;

    const nextTicket = ticketControl.nextTicket();
    callback(nextTicket);

    // TODO: Notify there's a new ticket waiting to be assigned
  });
};

export { socketController };
