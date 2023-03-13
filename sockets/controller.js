import TicketControl from '../models/ticket-control.js';

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last);
  socket.emit('actual-state', ticketControl.last4);
  socket.emit('disp-pending-tickets', ticketControl.tickets.length);

  socket.on('create-ticket', (payload, callback) => {
    if (!callback) return;

    const nextTicket = ticketControl.nextTicket();
    callback(nextTicket);

    // TODO: Notify there's a new ticket waiting to be assigned
    socket.broadcast.emit('disp-pending-tickets', ticketControl.tickets.length);
  });

  // Here i receibe desktop and a callback from front
  socket.on('serve-ticket', ({ desktop }, callback) => {
    if (!callback) return;

    if (!desktop)
      return callback({ ok: false, msg: 'you have to send a desktop' });

    const ticket = ticketControl.serveTicket(desktop);
    socket.broadcast.emit('actual-state', ticketControl.last4);
    socket.emit('disp-pending-tickets', ticketControl.tickets.length);
    socket.broadcast.emit('disp-pending-tickets', ticketControl.tickets.length);

    if (!ticket) {
      callback({ ok: false, msg: 'no more pending tickets' });
    } else {
      callback({ ok: true, ticket });
    }
  });
};

export { socketController };
