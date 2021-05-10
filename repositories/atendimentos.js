const query = require('../infraestrutura/databse/queries')

class Atendimentos{

    adiciona(atendimento){
        const sql =  'insert into Atendimentos set ?'
        return query(sql, atendimento)
    }
}

module.exports = new Atendimentos()