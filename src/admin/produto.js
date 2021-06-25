import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { carregaDados } from './request';
import {DeleteRequestAPI} from './DeleteRequestAPI';
import CadastroRequestAPI from './CadastroRequestAPI';
import EditarRequestAPI from './EditarResquestAPI';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345
    },
    form: {
        marginTop: 15,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }));

const Produto = () => {
    const [lista, setLista] = useState()
    const [exibir, setExibir] = useState(false)
    const [exibirNome, setExibirNome] = useState()
    const [exibirButton, setExibirButton] = useState()
    const [nomeProduto, setNomeProduto] = useState()
    const [descricaoProduto, setDescricaoProduto] = useState()
    const [precoProduto, setPrecoProduto] = useState()
    const [quantidadeProduto, setQuantidadeProduto] = useState()
    const [urlImagemProduto, setUrlImagemProduto] = useState()
    const [idProduto, setIdProduto] = useState()
    const classes = useStyles();

    const handleExibirButton = (nome, button, idProduto, nomeProduto, descricaoProduto, precoProduto, quantidadeProduto, urlImagemProduto) => {
        setExibir(true)
        setExibirNome(nome)
        setExibirButton(button)
        
        setIdProduto(idProduto)
        setNomeProduto(nomeProduto)
        setDescricaoProduto(descricaoProduto)
        setPrecoProduto(precoProduto)
        setQuantidadeProduto(quantidadeProduto)
        setUrlImagemProduto(urlImagemProduto)
    }

    const handleExibir = (nome, nomeButton) => {
        setExibir(true)
        setExibirNome(nome)
        setExibirButton("")

        if(nomeButton === "Cadastrar") {
            setIdProduto("")
            setNomeProduto("")
            setDescricaoProduto("")
            setPrecoProduto("")
            setQuantidadeProduto("")
            setUrlImagemProduto("")
        }
    }
    
    useEffect(() => {
        carregaDados().then((result) => {
          setLista(result);
        });
      }, [lista]);

    return (
        <div>
            <h2>Lista de Produtos</h2>
            <Button 
                variant="contained"
                color="secondary"
                onClick={()=>handleExibir("Cadastrar Produto", "Cadastrar")}>
                    Criar Produto
            </Button>
            <Grid container spacing={2}>
                {lista &&
                lista.map( (linha) => (
                <Grid key={linha._id} item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.root}>
                        <CardHeader
                            title= {linha.nome}
                            subheader={linha.descricao}
                        />
                        <CardMedia
                            className={classes.media}
                            image={linha.imagem}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Preço: {linha.preco} <br/>
                            Quantidade: {linha.quantidade} <br/>
                            Ativo: {linha.ativo ? "Ativo":"Inativo"}
                            </Typography>
                            <Button 
                            variant = "outlined"
                            onClick={()=>handleExibirButton("Editar Produto", "Editar", linha._id, linha.nome, linha.descricao, linha.preco, linha.quantidade, linha.imagem)}>
                                Editar
                            </Button>
                            <Button 
                            variant = "outlined"
                            onClick={()=>DeleteRequestAPI(linha._id)}>
                                Excluir
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            { exibir ?  <div>
            <h1>{exibirNome}</h1>
            <TextField
                className={classes.form}
                label="Nome"
                name="nome"
                value={ nomeProduto }
                onChange={ (e) => setNomeProduto(e.target.value)}
            />
            <TextField
                className={classes.form}
                label="Descricao"
                name="descricao"
                value={ descricaoProduto }
                onChange={ (e) => setDescricaoProduto(e.target.value)}
            />
            <TextField
                className={classes.form}
                label="Preço"
                name="preco"
                value={ precoProduto }
                onChange={ (e) => setPrecoProduto(e.target.value)}
            />
            <TextField
                className={classes.form}
                label="Quantidade"
                name="quantidade"
                value={ quantidadeProduto }
                onChange={ (e) => setQuantidadeProduto(e.target.value)}
            />
            <TextField
                className={classes.form}
                label="URL Imagem"
                name="urlImagem"
                value={ urlImagemProduto }
                onChange={ (e) => setUrlImagemProduto(e.target.value)}
            />
            {exibirButton === "Editar" ?
             <Button
             className={classes.form}
             color="primary"
             variant="contained"
             onClick={() => EditarRequestAPI(idProduto, nomeProduto, descricaoProduto, precoProduto, quantidadeProduto, urlImagemProduto, exibirButton)}
            >
                Editar
            </Button>                
            : <Button
                    className={classes.form}
                    color="primary"
                    variant="contained"
                    onClick={() => CadastroRequestAPI(nomeProduto, descricaoProduto, precoProduto, quantidadeProduto, urlImagemProduto)}
                >
                Cadastrar
            </Button>}
        </div>: "" }
        </div>
    )
}

export default Produto
