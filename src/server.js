//importa dependência
const express = require('express')
const path = require('path')

const pages = require('./pages.js')

//iniciando o servidor (express)
const server = express()

server
//utilizar body do req 
.use(express.urlencoded({ extended: true }))
.use(express.static('public'))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'hbs')
//rotas da aplicação
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanage', pages.createOrphanage)
.post('/save-orphanage', pages.saveOrphanage)

server.listen(5503, () => {
    console.log ('Server started')
})