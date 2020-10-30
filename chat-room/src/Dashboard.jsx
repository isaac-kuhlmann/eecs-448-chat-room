import React, {useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fire from './fire'

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

const Dashboard = (props) => {

    const classes = useStyles();

    const [textValue, changeTextValue] = useState('')

    const updateChat = (chat) => {
        console.log(chat);
        fire.database().ref(props.currentChannel).push({
            user: props.user,
            content: chat
        });
    }

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
                                [...props.channels, "ADD CHANNEL"].map(topic => (
                                    <ListItem key= {topic} button onClick={() => 
                                    {
                                        if (topic === "ADD CHANNEL") {
                                            console.log("Adding Channel");
                                            return;
                                        }
                                        props.setUser({ name: props.user.name, lastChannel: topic });
                                        let users = fire.database().ref("Users");
                                        users.child(props.user.name).update({
                                            name: props.user.name,
                                            lastChannel: topic
                                        });
                                        props.setCurrentChannel(topic);
                                    }}>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))

                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                            {
                                props.chats.map(({name, chat}, index) => (
                                    <div className={classes.flex} key={index}>
                                        <Chip label={name} className={classes.msg} />
                                        <Typography variant='h6'>
                                            {chat}
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
                    onChange={element => changeTextValue(element.target.value)}
                />
                <Button 
                onClick={() => {
                    updateChat(textValue);
                    changeTextValue("");
                }}
                variant="contained" 
                color="primary">
                    Send
                </Button>
                </div>
            </Paper>
        </div>
    )
}

export default Dashboard;