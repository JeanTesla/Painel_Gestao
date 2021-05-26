const { default: axios } = require('axios');
const { conn } = require('../connection.js')

const consultarPrestadores = function(cpfcnpj) {
    return conn.query(`
    SELECT id, uf, tipo,
	case
      when tipo = 'F' THEN 'Física'
      when tipo = 'J' then 'Jurídica'
   end as tipoPessoa,
    numero, bairro, cep, cidade, complemento, cpfcnpj, email, logradouro, nomerzsocial, isdeleted 
    from prestadores WHERE isdeleted <> 1 AND prestadores.cpfcnpj LIKE '%${cpfcnpj}%'`);
}

const getPrestadores = function() {
    return conn.query(`
    SELECT id, uf, tipo,
	case
      when tipo = 'F' THEN 'Física'
      when tipo = 'J' then 'Jurídica'
   end as tipoPessoa,
    numero, bairro, cep, cidade, complemento, cpfcnpj, email, logradouro, nomerzsocial, isdeleted 
    from prestadores WHERE isdeleted <> 1`);
}
const getPrestadoresCancelados = function() {
    return conn.query(`
    SELECT id, tipo,
	case
      when tipo = 'F' THEN 'Física'
      when tipo = 'J' then 'Jurídica'
   end as tipoPessoa,
     cpfcnpj, nomerzsocial, isdeleted 
    from prestadores WHERE isdeleted = 1`);
}

const savePrestador = function(prestador) {
    const { tipo } = prestador
    const { cpfcnpj } = prestador
    const { nomerzsocial } = prestador
    const { cep } = prestador
    const { complemento } = prestador
    const { logradouro } = prestador
    const { email } = prestador
    const { bairro } = prestador
    const { cidade } = prestador
    const { numero } = prestador
    const { uf } = prestador

    // Esse metodo de inserir não garantirá nenhuma segurança, mas se eu fizer da forma mais segura, não conseguirei terminar a tempo.
    return conn.query(`INSERT INTO prestadores (tipo,cpfcnpj,nomerzsocial,cep,complemento,logradouro,email,bairro,cidade,numero,uf)
     VALUES ('${tipo}','${cpfcnpj}','${nomerzsocial}','${cep}','${complemento}','${logradouro}','${email}','${bairro}','${cidade}','${numero}','${uf}')`)
}

const deletePrestador = function(idPrestador) {
    return conn.query(`UPDATE prestadores SET isdeleted = 1 WHERE id  = '${idPrestador}'`);
}

const recuperarPrestador = function(idPrestador) {
    return conn.query(`UPDATE prestadores SET isdeleted = 0 WHERE id  = '${idPrestador}'`);
}

// ------- OBTEM DADOS SOBRE O CEP PASSADO POR PARÂMETRO ------ //
const getInfoCep = function(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}

module.exports = {
    consultarPrestadores,
    getPrestadores,
    savePrestador,
    deletePrestador,
    recuperarPrestador,
    getInfoCep,
    getPrestadoresCancelados
}