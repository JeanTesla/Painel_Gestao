const { conn } = require('../connection.js')

const dadosDonut = function(range) {
    let clausula = `AND (datafim - CURRENT_DATE) = ${range}`
    if (parseInt(range) === -1) clausula = '';
    return conn.query(`SELECT 
    COALESCE(SUM(CASE WHEN (datafim - CURRENT_DATE) = 0 THEN 1 ELSE 0 END),0) AS expirahoje,
     COALESCE(SUM(CASE WHEN (datafim - CURRENT_DATE) = 7 THEN 1 ELSE 0 END),0) AS expiraem7,
          COALESCE(SUM(CASE WHEN (datafim - CURRENT_DATE)  = 15 THEN 1 ELSE 0 END),0) AS expiraem15,
               COALESCE(SUM(CASE WHEN (datafim - CURRENT_DATE)  = 30 THEN 1 ELSE 0 END),0) AS expiraem30
     FROM contratos WHERE isdeleted = 0  ${clausula}`);
}

const dadosCards = function() {
    return conn.query(`SELECT 
    SUM(CASE WHEN (datafim - CURRENT_DATE) = 0 THEN 1 ELSE 0 END) AS expirahoje,
     SUM(CASE WHEN (datafim - CURRENT_DATE) = 7 THEN 1 ELSE 0 END) AS expiraem7,
         SUM(CASE WHEN (datafim - CURRENT_DATE)  = 15 THEN 1 ELSE 0 END) AS expiraem15,
              SUM(CASE WHEN (datafim - CURRENT_DATE)  = 30 THEN 1 ELSE 0 END) AS expiraem30,
              	SUM(CASE WHEN (datafim - CURRENT_DATE) NOT IN(0,7,15,30)  THEN 1 ELSE 0 END) AS outrosdias,
              count(id) AS totalcontratos FROM contratos WHERE isdeleted = 0`);
}

const dadosProgessBar = function() {
    return conn.query(`SELECT contratos.id AS idcontrato,
    prestadores.nomerzsocial,
     to_char(CURRENT_DATE,'dd/mm/YYYY') AS dataatual,
         to_char(datainicio, 'dd/mm') AS datainicio,
            to_char(datafim, 'dd/mm') AS datafim,
          (datafim - datainicio) AS diastotais,
           CASE WHEN  (CURRENT_DATE - datainicio) < 0 THEN 0 ELSE (CURRENT_DATE - datainicio) END  AS diaspassados,
           (datafim - CURRENT_DATE) AS expiraem
           FROM contratos
          INNER JOIN prestadores ON contratos.prestador_id = prestadores.id
      WHERE contratos.isdeleted = 0`);
}


module.exports = {
    dadosDonut,
    dadosCards,
    dadosProgessBar
}