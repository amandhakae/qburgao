const sql = require("./db.js");
//construtor
const ProdutoModel = function(produto){
    this.name = produto.nome;
    this.valor = produto.valor;
}

//cria novo pedido no banco
ProdutoModel.create = (produto, result) => {
};

//seleciona produto por ID
ProdutoModel.findById = (produtoId, result) => {
};

//seleciona todos os produtos
ProdutoModel.getAll = result =>{
};
//Atualizar produto por ID

ProdutoModel.updateById = (produtoId, produto, result) => {

};

//Remover produto por ID

ProdutoModel.remove = (produtoId, result) => {

};

//Remover todos os produtos

ProdutoModel.removeAll = (result) => {

};

module.exports = ProdutoModel