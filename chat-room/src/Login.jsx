import React, { useState } from 'react';
import { Grid, Card, CardContent, CardActions, TextField, Typography, Button,} from '@material-ui/core'
import fire from './fire'

const Login = (props) => {
    const [userName, setUser] = useState('');

    const handleSubmit = () => {
        props.onLogin(userName)
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
                            Enter a handle to chat with
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <TextField value={userName} onChange={e => setUser(e.target.value)} variant="outlined" />
                        <Button variant='contained' color='primary' onClick={handleSubmit}>
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </Grid>   
        </Grid>             

    )

}

export default Login