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
import fire from './fire'

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


export const createChannel = async (channelNameInput) => {
    if(channelNameInput === null) //Checks if prompt is cancelled
    {
        return false;
    }
    else if(channelNameInput === "") { //Checks if input is nothing
        fire.database().ref("Chatrooms").child("New Room").push({
            user: "|OPERATOR|",
        });
        console.log("Adding Channel");
        return true;
    }
    else {  //Checks everything else
        fire.database().ref("Chatrooms").child(channelNameInput).push({ 
            user: "|OPERATOR|",
            content: channelNameInput + " created"
        
        });
        console.log("Adding Channel");
        return true;
    }
}


export const updateChat = (username, currentChannel, chat) => {
    console.log(chat);
    return fire.database().ref("Chatrooms/" + currentChannel).push({
        user: username,
        content: chat
    });
}


const Dashboard = (props) => {

    const classes = useStyles();

    const [textValue, changeTextValue] = useState('')



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
                                [...props.channels, "ADD CHANNEL"].map(topic => (
                                    <ListItem aria-label={"channel-"+topic} key={topic} button onClick={async () => {
                                        if (topic === "ADD CHANNEL") {

                                            var channelNameInput = prompt("Please enter the channel name: ", "");
                                            
                                            let success = await createChannel(channelNameInput)
                                            if(success){
                                                props.setCurrentChannel(channelNameInput);
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
                            props.chats.map(({ name, chat }, index) => {
                                if (name === "|OPERATOR|") {
                                    console.log("Bruh");
                                }
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
                            updateChat(props.user, props.currentChannel, textValue);
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

