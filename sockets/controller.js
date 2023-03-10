const socketController = (socket) => {
  console.log('Cliente conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
  });

  // 1st arg on callback is the receibed obj
  // 2nd arg on callback is a ref to client function, only sends to client who sent
  socket.on('send-msg', (payload, callback) => {
    if (!callback) return;

    const id = 123456;
    callback({
      id,
      date: new Date().getTime(),
    });

    // This is used to send a broadcast msg (anyone listening)
    socket.broadcast.emit('msg-sent', payload);
  });
};

export { socketController };
