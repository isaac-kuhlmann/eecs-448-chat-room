import React, { useState } from 'react';
import { Grid, Card, CardContent, CardActions, TextField, Typography, Button,} from '@material-ui/core'
import fire from "./fire"

const bcrypt = require('bcryptjs')

const Login = (props) => {
    const [userName, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [r_userName, setRUser] = useState('');
    const [r_password, setRPassword] = useState('');
    
    const handleLogin = () => {
        try{
            let users = fire.database().ref(`Users/${userName}`)
            users.once("value", async (snap) => {
                let currentUser = snap.val();
                console.log(currentUser, currentUser.password, password)
                if(snap.val()) {
                    try {
                        await bcrypt.compare(password, currentUser.password).then((e) => {
                            if(e) {
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
            console.error("Unable to login: "+ e.message)
        }

    }

    const handleRegister = async () => {
        if(r_userName !== '') {
            try {
                const salt = await bcrypt.genSalt()
                const hashedPass = await bcrypt.hash(r_password, salt)
                
                const users = fire.database().ref("Users")
                let check = fire.database().ref(`Users/${r_userName}`)
                check.once("value", (snap) => {
                    if(snap.val()) {
                        alert("Username already in use")
                    }
                    else {
                        users.child(r_userName).update({
                            username: r_userName,
                            password: hashedPass
                        })
                        alert(r_userName + " created!\n\nYou can now login")
                    }
                })
            } catch (e) {
                console.error("Could not store user in database: " + e.message)
            }
        }
        else{
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
            <Grid item xs={3}>
                <Card >
                    <CardContent>
                        <Typography color="textPrimary">
                            Login with an existing Username
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <TextField placeholder="Username" onChange={e => setUser(e.target.value)} variant="outlined" />
                        <TextField placeholder="Password" onChange={e => setPassword(e.target.value)} variant="outlined"/>
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
                        <TextField placeholder="Password" onChange={e => setRPassword(e.target.value)} variant="outlined"/>
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