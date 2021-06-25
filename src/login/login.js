import React from 'react';
import { 
    Button, 
    TextField,
    Paper, 
    Box, 
    Grid, 
    Typography,
    CircularProgress
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import{ useState } from 'react'
import axios from 'axios'

const Copyright = () => {

    return(

        <Typography variant="body2" color="textSecondary" align="center">

            {' Copyright © '}
            Alex Moraes 010618001

        </Typography>

    );

}

const useStyles = makeStyles((theme) => ({

    root: {
        height: '100vh',
    },
    
    image: {
        backgroundImage: 'url(https://jogazera.com.br/wp-content/uploads/2020/03/Demon-Slayer-Kimetsu-no-Yaiba-Hinokami-Keppuutan_2020_03-22-20_001-770x433.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    paper: {
        margin: theme.spacing(25,4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    inferior: {
        position: "absolute",
        right: "center",
        top: "center",
    }

}));

const Login = () => {

    const [ carregar, setCarregar ] = useState(false)
    const [ usuario, setUsuario ] = useState()
    const [ senha, setSenha ] = useState()

    const efetuarLogin = async () => {
        setCarregar(true)

        let url = "https://alexartinprova.herokuapp.com/login"
        var data = { 
            usuario: usuario, 
            senha
        }

        await axios.post(
            url,
            data
        )
            .then( (retorno) => {
                
                if (retorno.data.token) {
                    console.log(retorno.data)
                    alert("Login efetuado com sucesso")
                    localStorage.setItem("NossoToken", retorno.data.token)
                    localStorage.setItem("MeuNome", retorno.data.nome)
                    window.location = "/admin/produtos"

                }

                if (retorno.data.token === undefined)
                    alert(retorno.data)

                setCarregar(false)
            })
    }
    
            const classes = useStyles()

    return(

        <Grid container component="main" className={classes.root} >
            <CssBaseline />
            <Grid item xs={false} sm={6} md={7} className={classes.image} />
            <Grid item xs={12} sm={6} md={5} component={Paper} >
                <div className={classes.paper} >
                    <Typography component="h1" variant="h5" >
                        Login
                    </Typography>
                    
                        <TextField
                            color="secodary"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Usuario"
                            value={ usuario }
                            onChange={ (e) => setUsuario(e.target.value)}
                        />

                        <TextField
                            color="secodary"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Senha" 
                            type="password"
                            value={ senha }
                            onChange={ (e) => setSenha(e.target.value)}
                        />

                    <br/>
                    {
                    (carregar)?(<CircularProgress color="secondary"/>):("")
                    }
                    
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={ () => efetuarLogin() }
                        >
                            Login
                        </Button>

                        <Box mt={5}>
                            <Copyright />
                        </Box>
                </div>
             </Grid>
         </Grid>
    )

}
export default Login