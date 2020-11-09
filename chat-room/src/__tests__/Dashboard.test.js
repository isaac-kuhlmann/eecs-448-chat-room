import React from 'react';
import ReactDOM from 'react-dom';
import {render} from "@testing-library/react";
import Dashboard, {updateChat, createChannel} from '../Dashboard';
import {createUser} from '../Login'
import fire from '../fire'

describe("Dashboard Tests", () => {
    it("Renders", () => {
        const root = document.createElement('div')
        ReactDOM.render(<Dashboard channels={[]} chats={[]} />, root)
    })

    it('Updates the chat', async () => {
        let created = await createUser("UpdateTest", "Pass");
        let key = updateChat("UpdateTest", "Chatroom", "Testing chat")

        if(created) {
            let check = fire.database().ref("Chatrooms/Chatroom/" + key.key)
            await check.once("value", (snap) => {
                expect(snap.val().content).toBe("Testing chat")
            })
        }
        fire.database().ref("Chatrooms/Chatroom/"+key.key).remove()
        fire.database().ref("Users/UpdateTest").remove()
    })

    it('Dashboard renders every given channel in list', async () => {
        const channels = ["hi","hey"];
        const { queryByLabelText } = render(
            <Dashboard  
            channels={channels} 
            chats={["hi"]}
            />
        );
        channels.forEach((value) => {
            expect(queryByLabelText("channel-"+value)).toBeInstanceOf(HTMLDivElement);
        })
    })

    it('Creates Channel', async () => {
        let success = await createChannel("TestChannel")

        if(success) {
            fire.database().ref("Chatrooms/TestChannel").once("value", (snap) => {
                expect(snap.val()[Object.keys(snap.val())[0]].user).toBe("|OPERATOR|")
            })
        } else {
            // Function error
            expect(true).toBe(false);
        }

        fire.database().ref("Chatrooms/TestChannel").remove()
    })
})