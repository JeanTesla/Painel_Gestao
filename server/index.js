const express = require('express')
const bodyParser = require('body-parser')
const prestadoresExt = require('./external/prestadoresExt.js')
const contratoExt = require('./external/contratosExt.js')
const dashboardExt = require('./external/dashboardExt.js')
const { default: axios } = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))



// ----------------------------------------------------------------- //
// ------------------------- PRESTADORES --------------------------- //
// ----------------------------------------------------------------- //
app.post('/prestadores/consultar', async(req, res) => {
    const { cpfcnpj } = req.body
    const { rows } = await prestadoresExt.consultarPrestadores(cpfcnpj)
    res.send(rows)
})

app.get('/prestadores', async(req, res) => {
    const { rows } = await prestadoresExt.getPrestadores()
    res.send(rows)
})
app.get('/prestadores/Cancelados', async(req, res) => {
    const { rows } = await prestadoresExt.getPrestadoresCancelados()
    res.send(rows)
})
app.post('/prestadores', (req, res) => {
        prestadoresExt.savePrestador(req.body).then(function(response) {
            res.status(201).send(true)
        })
    })
    // Não consegui usar o verbo delete aqui
app.post('/prestadores/deletar', (req, res) => {
    const { id } = req.body
    prestadoresExt.deletePrestador(id).then(function(response) {
        res.status(201).send(true)
    })
})
app.post('/prestadores/recuperar', (req, res) => {
    const { id } = req.body
    prestadoresExt.recuperarPrestador(id).then(function(response) {
        res.send(true)
    })
})
app.post('/prestadores/getLocationViaCep', async(req, res) => {
    const { cep } = req.body
    prestadoresExt.getInfoCep(cep).then(function(response) {
        res.send(response.data)
    })
})


// ----------------------------------------------------------------- //
// ------------------------- CONTRATOS ----------------------------- //
// ----------------------------------------------------------------- //

app.post('/contratos', async(req, res) => {
    contratoExt.saveContrato(req.body).then(function(response) {
        res.status(201).send(response.data)
    })
})

app.get('/contratos/getNotifyList', async(req, res) => {
    const { rows } = await contratoExt.getNotifyList()
    res.send(rows)
})

app.get('/contratos', async(req, res) => {
    const { rows } = await contratoExt.getContratos()
    res.send(rows)
})

app.get('/contratos/cancelados', async(req, res) => {
    const { rows } = await contratoExt.getContratosCancelados()
    res.send(rows)
})

app.post('/contratos/deletar', async(req, res) => {
    contratoExt.deleteContrato(req.body).then(function(response) {
        res.send(response.data)
    })
})

app.post('/contratos/recuperar', async(req, res) => {
    contratoExt.recuperarContrato(req.body).then(function(response) {
        res.send(response.data)
    })
})

app.get('/contratos/expiraEm/:expiraEm', async(req, res) => {
    const { expiraEm } = req.params
    const { rows } = await contratoExt.getListaContratosFiltrados(expiraEm)
    res.send(rows)
})

// ----------------------------------------------------------------- //
// ------------------------- DASHBOARD ----------------------------- //
// ----------------------------------------------------------------- //
app.post('/dashboard/donut', async(req, res) => {
    const { range } = req.body
    const { rows } = await dashboardExt.dadosDonut(range)
    res.send(rows)
})

app.get('/dashboard/cards', async(req, res) => {
    const { rows } = await dashboardExt.dadosCards()
    res.send(rows)
})

app.get('/dashboard/progressBar', async(req, res) => {
    const { rows } = await dashboardExt.dadosProgessBar()
    res.send(rows)
})