import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import fire from './fire';

/*
* Pre: Called in the Dashboard.jsx
* Params: theme
* Post: Chat room each component styling
* Return: none
*/
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '50px',
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


/*
* Pre: dom has been loaded 
* Params: props = { user, setUser, chats, channels, currentChannel, setCurrentChannel } functions to modify parent state
* Post: renders chats and channels on the screen with appropriate information aquired from other components
* Return: the Dashboard react component
*/
const Dashboard = (props) => {

    const classes = useStyles();

    const [textValue, changeTextValue] = useState('')

    const updateChat = (chat) => {
        console.log(chat);
        fire.database().ref("Chatrooms/" + props.currentChannel).push({
            user: props.user,
            content: chat
        });
    }

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    <b>{props.currentChannel}</b>
                </Typography>
                <Typography variant="h5" component="h5">
                    General
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                // Mapping for the channels
                                [...props.channels, "ADD CHANNEL"].map(topic => (
                                    <ListItem key={topic} button onClick={() => {
                                        if (topic === "ADD CHANNEL") {

                                            var channelNameInput = prompt("Please enter the channel name: ", "");

                                            if (channelNameInput === null) //Checks if prompt is cancelled
                                            {
                                                return;
                                            }
                                            else if (channelNameInput === "") { //Checks if input is nothing
                                                fire.database().ref("Chatrooms").child("New Room").push({
                                                    user: "|OPERATOR|",
                                                });
                                                props.setCurrentChannel("New Room");
                                                console.log("Adding Channel");
                                                return;
                                            }
                                            else {  //Checks everything else
                                                fire.database().ref("Chatrooms").child(channelNameInput).push({
                                                    user: "|OPERATOR|",
                                                    content: channelNameInput + " created"

                                                });
                                                props.setCurrentChannel(channelNameInput);
                                                console.log("Adding Channel");
                                                return;
                                            }
                                        }
                                        props.setUser({ name: props.user.name, lastChannel: topic });
                                        let users = fire.database().ref("Users");
                                        users.child(props.user.name).update({
                                            name: props.user.name,
                                            lastChannel: topic
                                        });
                                        props.setCurrentChannel(topic);
                                    }}>
                                        {
                                            topic === "ADD CHANNEL"
                                                ? <ListItemText primary={topic} style={{
                                                    color: "green",
                                                    fontWeight: "900",
                                                    textAlign: "center"
                                                }} />
                                                : <ListItemText primary={topic} />
                                        }
                                    </ListItem>
                                ))

                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            // Mapping for the chats
                            props.chats.map(({ name, chat }, index) => {
                                return (
                                    < div className={classes.flex} key={index} >
                                        <Chip label={name} className={classes.msg} />
                                        <Typography variant='h6'>
                                            {chat}
                                        </Typography>
                                    </div>
                                )
                            })
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
        </div >
    )
}

export default Dashboard;

