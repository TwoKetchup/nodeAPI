const moment = require('moment')
const axios = require('axios')
const conexao = require('../infraestrutura/databse/conexao')
const repo = require('../repositories/atendimentos')
const { query } = require('../infraestrutura/databse/conexao')

class Atendimento {
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'
        )

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject)=>{
                reject(erros)
            })
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repo.adiciona(atendimentoDatado)
                .then(resultados =>{
                    const id = resultados.insertId
                    return {...atendimento, id}
                })
                
        }
    }

    constructor(){
        this.dataEhValida = ({data, dataCriacao})=> 
            moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = tamanho => tamanho >=5

        this.valida = params =>
            this.validacoes.filter(campo =>{
                const { nome } = campo
                const param = params[nome] 
                return !campo.valido(param)
            })

            this.validacoes = [
                {
                    nome: 'data',
                    valido: this.dataEhValida,
                    mensagem: 'Data deve ser maior ou igual a data atual'
                },
                {
                    nome: 'cliente',
                    valido: this.clienteEhValido,
                    mensagem: 'Cliente deve ter pelo menos cinco caracteres'
                }
            ]
    }

    lista() {
        const sql = 'SELECT * FROM Atendimentos'

        return query(sql)
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if (erro) {
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)

                atendimento.cliente = data

                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format(
                'YYYY-MM-DD HH:mm:ss'
            )
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Atendimento()
