import React from 'react';
import ReactDOM from 'react-dom';
import Login, { createUser } from '../Login';
import fire from '../fire'


it("Renders", () => {
    const root = document.createElement('div')
    ReactDOM.render(<Login />, root)
})

it("Creates user in database", async () => {
    let created = await createUser("Test", "Test")
    expect(created).toBeTruthy()
    let check = fire.database().ref("Users/Test")
    await check.once("value", (snap) => {
        expect(snap.val().username).toBe("Test")
    })
    fire.database().ref("Users/Test").remove()

})

it("Avoids user duplication", async () => {
    let first = await createUser("Test2", "Test2")
    let second = await createUser("Test2", "DifferentPass")

    expect(second).toBe(false)
    expect(first).toBe(true)

    fire.database().ref("Users/Test2").remove()
})

it("Allows users with special character usernames", async () => {
    let arr = [')', '!', '@', '#', '$', '%', '^', '&', '*', '(']
    let boolArr = []
    let nameArr = []
    for (let i = 0; i < 10; i++) {
        boolArr.push(await createUser(arr[i] + "test", "pass"))
        nameArr.push(arr[i] + 'test')
    }

    for (let i = 0; i < 10; i++) {
        expect(boolArr[i]).toBeTruthy()
    }



    for (let i = 0; i < 10; i++) {
        let arr2 = ['.', '#', '$', '[', ']']
        arr2.forEach((el, index) => {

            if (nameArr[i].includes(el)) {
                nameArr[i] = nameArr[i].replace(el, index)
            }
        })
        fire.database().ref(`Users/${nameArr[i]}`).remove()
    }


})

it('Hashes Passwords', async () => {
    await createUser("PasswordTest", "Password")
    let check = fire.database().ref("Users/PasswordTest")
    await check.once("value", (snap) => {
        expect(snap.val().password === "Password").toBe(false)
        expect(snap.val().password.length > 20).toBe(true)
    })
    fire.database().ref("Users/PasswordTest").remove()

})
