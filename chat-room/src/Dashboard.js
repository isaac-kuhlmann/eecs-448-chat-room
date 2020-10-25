import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        margin :'50px',
      padding: theme.spacing(4.2),
      border: '1px solid grey',
      height: '650px'
    },

    flex: {
        display: 'flex',
        alignItems: 'center',
    },

    topicsWindow: {
        width: '20%',
        height: '500px',
        borderRight: '5px solid grey',
    },

    chatWindow: {
        padding: '10px',
        marginTop: '15px',
        width: '70%',
        height: '500px',
    },

    chatBox: {
        width: '85%',
        margin: '10px',
    },

    sendingButtom: {
        width: '20%',
    },
  }));

export default function Dashboard() {

    const classes = useStyles();

    const  [textValue, changetextValue] = React.useState(
        ''
    );

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat web
                </Typography>
                <Typography variant="h5" component ="h5">
                    Topic from channel
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {

                                ['Chat channel'].map(topic => (
                                    <ListItem key= {topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))

                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                            {

                                [{from: 'user', msg: 'Greetings!' }].map((chat, index) => (
                                    <div className={classes.flex} key={index}>
                                        <Chip label={chat.from} className={classes.msg} />
                                        <Typography variant='p'>
                                            {
                                                chat.msg
                                            }
                                        </Typography>
                                    </div>
                                ))

                            }
                    </div>
                </div>
                <div className={classes.flex}>
                <TextField
                    label="Send a chat"
                    className={classes.chatBox}
                    value={textValue}
                    onChange={element => changetextValue(element.target.value)}
                />
                <Button variant="contained" color="primary">
                    Send
                </Button>
                </div>
            </Paper>
        </div>
    )
}