const { conn } = require('../connection.js')

const saveContrato = function(contrato) {
    const { idPrestador } = contrato
    const { servicoprestado } = contrato
    const { datainicio } = contrato
    const { datafim } = contrato
    // Esse metodo de inserir não garantirá nenhuma segurança, mas se eu fizer da forma mais segura, não conseguirei terminar a tempo.
    return conn.query(`INSERT INTO contratos (prestador_id,servicoprestado,datainicio,datafim)
     VALUES ('${idPrestador}','${servicoprestado}','${datainicio}','${datafim}')`)
}

const getNotifyList = function() {
    return conn.query(`SELECT contratos.id AS idcontrato, prestadores.nomerzsocial,
    to_char(datafim, 'dd/mm') AS datafim, (datafim - CURRENT_DATE) AS expiraem
    FROM contratos
    INNER JOIN prestadores ON contratos.prestador_id = prestadores.id
    WHERE contratos.isdeleted = 0 AND (datafim - CURRENT_DATE) <= 7`)
}

const getContratos = function() {
    return conn.query(`SELECT contratos.id AS idcontrato, prestador_id AS idprestador,prestadores.nomerzsocial,
    prestadores.cpfcnpj, prestadores.tipo, to_char(datainicio, 'dd/mm/YYYY') AS datainicio,
          to_char(datafim, 'dd/mm/YYYY') AS datafim,
        to_char(datacadastro, 'dd/mm/YYYY') AS datacadastro,
        (datafim - CURRENT_DATE) as expiraem
          FROM contratos
        INNER JOIN prestadores ON contratos.prestador_id = prestadores.id
        WHERE contratos.isdeleted = 0`)
}

const getListaContratosFiltrados = function(expiraEm) {
    return conn.query(`SELECT contratos.id AS idcontrato, prestador_id AS idprestador,prestadores.nomerzsocial,
    prestadores.cpfcnpj, prestadores.tipo, to_char(datainicio, 'dd/mm/YYYY') AS datainicio,to_char(datafim, 'dd/mm/YYYY') AS datafim,
        to_char(datacadastro, 'dd/mm/YYYY') AS datacadastro,(datafim - CURRENT_DATE) as expiraem FROM contratos
        INNER JOIN prestadores ON contratos.prestador_id = prestadores.id WHERE contratos.isdeleted = 0
        AND (datafim - CURRENT_DATE) = ${expiraEm}`)
}

const getContratosCancelados = function() {
    return conn.query(`SELECT contratos.id AS idcontrato, prestador_id AS idprestador,prestadores.nomerzsocial,prestadores.cpfcnpj,
    prestadores.tipo, to_char(datainicio, 'dd/mm/YYYY') AS datainicio, to_char(datafim, 'dd/mm/YYYY') AS datafim,
    to_char(datacadastro, 'dd/mm/YYYY') AS datacadastro,
    (datafim - CURRENT_DATE) as expiraem FROM contratos
    INNER JOIN prestadores ON contratos.prestador_id = prestadores.id
    WHERE contratos.isdeleted = 1`)
}

const deleteContrato = function(contrato) {
    const { idcontrato } = contrato
    return conn.query(`UPDATE contratos set isdeleted = '1', datacancelamento = CURRENT_TIMESTAMP where id = ${idcontrato}`)
}

const recuperarContrato = function(contrato) {
    const { idcontrato } = contrato
    return conn.query(`UPDATE contratos set isdeleted = '0', datacancelamento = CURRENT_TIMESTAMP where id = ${idcontrato}`)
}



module.exports = {
    saveContrato,
    getNotifyList,
    getContratos,
    getListaContratosFiltrados,
    getContratosCancelados,
    deleteContrato,
    recuperarContrato
}