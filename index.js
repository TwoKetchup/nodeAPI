const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/databse/conexao')
const Tabelas = require('./infraestrutura/databse/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(4040, () => console.log('Servidor rodando na porta 4040'))
    }
})
