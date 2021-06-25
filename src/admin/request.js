import axios from 'axios'

export const carregaDados = async () => {
    const token = localStorage.getItem("NossoToken")
        
    var bearer = `Bearer ${token}`
        
    const url = "https://alexartinprova.herokuapp.com/lista/produtos"
    const dados = await axios
            .get(
                url,
                {
                    headers: { "Authorization": bearer }
                }
            )

    return dados.data
}