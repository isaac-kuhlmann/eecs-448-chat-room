import React, { useState } from 'react';
import { Grid, Card, CardContent, CardActions, TextField, Typography, Button, AppBar, Toolbar, makeStyles } from '@material-ui/core'
import fire from "./fire"

const bcrypt = require('bcryptjs')

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px',
        padding: theme.spacing(0),
    },
    title: {
        marginRight: theme.spacing(10),
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    }
}));

const Login = (props) => {
    const [userName, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [r_userName, setRUser] = useState('');
    const [r_password, setRPassword] = useState('');
    const classes = useStyles();

    const handleLogin = () => {
        try {
            let users = fire.database().ref(`Users/${userName}`)
            users.once("value", async (snap) => {
                let currentUser = snap.val();
                console.log(currentUser, currentUser.password, password)
                if (snap.val()) {
                    try {
                        await bcrypt.compare(password, currentUser.password).then((e) => {
                            if (e) {
                                props.onLogin(userName, true)
                            }
                            else {
                                alert("Incorrect Password")
                            }
                        })
                    }
                    catch (e) {
                        console.error("Server error: " + e.message)
                    }
                }
                else {
                    alert("Unable to find username")
                }
            })
        }
        catch (e) {
            console.error("Unable to login: " + e.message)
        }

    }

    const handleRegister = async () => {
        if (r_userName !== '') {
            try {
                const salt = await bcrypt.genSalt()
                const hashedPass = await bcrypt.hash(r_password, salt)

                const users = fire.database().ref("Users")
                let check = fire.database().ref(`Users/${r_userName}`)
                check.once("value", (snap) => {
                    if (snap.val()) {
                        alert("Username already in use")
                    }
                    else {
                        users.child(r_userName).update({
                            username: r_userName,
                            password: hashedPass
                        })
                        props.onLogin(r_userName, true)
                        alert(r_userName + " created!")
                    }
                })
            } catch (e) {
                console.error("Could not store user in database: " + e.message)
            }
        }
        else {
            alert("Cannot use blank username")
        }
    }

    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Web Chat Room
                        </Typography>
                        <Button color="inherit">Login Page</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <Grid item xs={3}>
                <Card >
                    <CardContent>
                        <Typography color="textPrimary">
                            Login with an existing Username
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <TextField placeholder="Username" onChange={e => setUser(e.target.value)} variant="outlined" />
                        <TextField placeholder="Password" label="Password" type="password" onChange={e => setPassword(e.target.value)} />
                        <Button variant='contained' color='primary' onClick={handleLogin}>
                            Login
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography color="textPrimary">
                            Register with a new Username
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <TextField placeholder="Username" onChange={e => setRUser(e.target.value)} variant="outlined" />
                        <TextField placeholder="Password" label="Password" type="password" onChange={e => setRPassword(e.target.value)} />
                        <Button variant='contained' color='secondary' onClick={handleRegister}>
                            Register
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

    )

}

export default Login