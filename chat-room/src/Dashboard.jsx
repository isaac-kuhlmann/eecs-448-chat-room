import React, {useState, useEffect} from 'react';
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

    const [currentLog, setLog] = useState([])

    const oldChats = fire.database().ref("Chatroom 2");

    useEffect(() => {
        (() => {
            oldChats.on("value", function(snapshot) {
                let newLog = [...currentLog];
                Object.entries(snapshot.val()).forEach(([name, chat]) => {
                    newLog.push({ name: name, chat: chat});
                });
                setLog(newLog);
            })
        })();
    }, []);


    const updateChat = (chat) => {
        console.log(chat);
        props.connection.send(chat);
        let newChat = fire.database().ref("Chats").push({
            user: props.user,
            content: chat
        });
        let users = fire.database().ref("Users");
        users.child(props.user.name).update({
            user: props.user,
            guid: newChat.key
        })
        setLog([...currentLog, { name: props.user.name, chat: chat }]);
        let chatRoom = fire.database().ref("Chatroom ").push({
            user: props.user,
            content: chat
        });
    }

    props.connection.onmessage = function (e) {
        setLog([...currentLog, { name: "Stranger", chat: e.data }])
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
                                currentLog.map(({name, chat}, index) => (
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