const query = require('../infraestrutura/databse/queries')

class Atendimentos{

    adiciona(atendimento){
        const sql =  'insert into Atendimentos set ?'
        return query(sql, atendimento)
    }

    lista(){
        return repositorio.lista()
    }
}

module.exports = new Atendimentos()