import axios from 'axios'

export const DeleteRequestAPI = async (id) => {

    var idProduto = id

    var token = localStorage.getItem('NossoToken')
    var bearer = `Bearer ${token}`
    let url = "https://alexartinprova.herokuapp.com/admin/produtos"
    
    await axios.delete(url, {
        headers: {
          Authorization: bearer
        },
        data: {
            id: idProduto
        }
      })
        .then( (retorno) => {
            console.log(retorno)
            if (retorno.data.nome) {
                alert("Produto excluido com sucesso")
            }
        })
}
