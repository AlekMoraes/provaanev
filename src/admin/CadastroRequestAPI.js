import axios from 'axios'

const CadastroRequestAPI = async (nomeProduto, descricaoProduto, precoProduto, quantidadeProduto, urlImagemProduto) => {
    var token = localStorage.getItem('NossoToken')
    var bearer = `Bearer ${token}`
    let url = "https://alexartinprova.herokuapp.com/admin/produtos"

    

        var data = { 
            nome: nomeProduto, 
            descricao: descricaoProduto,
            preco: precoProduto,
            quantidade: quantidadeProduto,
            imagem: urlImagemProduto
        }

        await axios.post(
            url,
            data,
            {
                headers: { "Authorization": bearer },
            })
            .then( (retorno) => {
                
                if (retorno.data.nome) {
                    alert("Produto cadastrado com sucesso") 
                }
            })
}

    export default CadastroRequestAPI