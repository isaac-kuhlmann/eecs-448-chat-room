import React from "react"

export const Chat = ({ name, chat }) => {
    return (
        <div class="chatContainer">
            <div class="nameContainer">
                <h3>{name + ": "}</h3>
            </div>
            <h2 style={{ width: "80%" }} class={"message" + (name === "Stranger" ? "Stranger" : "User")}>{chat}</h2>
        </div >
    )
}