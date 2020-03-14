const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
  socket.on('seeked', currentTime => {
    io.emit('expressSeeked', currentTime)
  })
  socket.on('play', () => {
    io.emit('play')
  })
  socket.on('pause', () => {
    io.emit('pause')
  })
})

app.get('/host/*', (req, res) => {
  res.sendFile('host.html', { root: __dirname })
})

app.get('/client/*', (req, res) => {
  res.sendFile('client.html', { root: __dirname })
})

http.listen(80, () => {
  console.log('listening on *:80')
})
