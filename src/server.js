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
.get('/foster-home', pages.fosterHome)
.get('/foster-homes', pages.fosterHomes)
.get('/create-foster-home', pages.createFosterHome)
.post('/save-foster-home', pages.saveFosterHome)

server.listen(5503, () => {// WARNINGX
    console.log ('Server started')
})