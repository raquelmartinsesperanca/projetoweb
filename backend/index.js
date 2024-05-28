const express = require('express')
const cors = require('cors')
const app = express()
const ClientesRoutes = require('./routes/ClienteRoutes')

//Configuração de Resposta
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.static('public'))

/* Habilitar uso de rotas pelo express */
app.use('/clientes',ClienteRoutes)

app.listen(5000)