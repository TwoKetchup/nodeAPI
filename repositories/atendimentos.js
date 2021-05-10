const query = require('../infraestrutura/databse/queries')

class Atendimentos{

    adiciona(atendimento){
        const sql =  'insert into Atendimentos set ?'
        return query(sql, atendimento)
    }

    lista(){
        const sql = 'SELECT * FROM Atendimentos'

        return query(sql)
    }
}

module.exports = new Atendimentos()