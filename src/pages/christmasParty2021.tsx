import React, {useState} from "react"
const sha1 = require("sha1")

interface ChristmasState {
    date: string
    address: string
}

const ChristmasParty2021 = () => {
    const [state, setState] = useState<ChristmasState>()
    const [isSending, setIsSending] = useState<boolean>()
    const [passwordInput, setPasswordInput] = useState<string>()
    const onClick = () => {
        if (isSending) return
        setIsSending(true)
        const sha1Input = sha1(passwordInput)
        fetch(`https://us-central1-website-2802f.cloudfunctions.net/christmasDeets?password=${sha1Input}`, {
            mode: "cors"
        })
            .then((response) => response.json())
            .then((resultData) => {
                setState(resultData)
                setIsSending(false)
            })
            .catch((error) => {
                console.warn(error)
                alert("Wrong password!")
                setIsSending(false)
            })
    }
    return (
        <>
            <main>
                <p>You're invited to a Christmas Party</p>
                <input id="password" onChange={(value) => {
                    setPasswordInput(value.target.value)
                }} placeholder="Enter the password here" type="text" />
                <button title="Enter" onClick={onClick} disabled={isSending} />
                <p>From 8.30pm on {state?.date}</p>
                <p>At my address: {state?.address} (please buzz at the main door if it isn't open)</p>
                <p>Nearest tube stops are Arsenal (Picadilly) or Finsbury Park (Victoria)</p>
                <p>Nibbles, drinks will be provided, just bring some fun!</p>
                <p>Please let me know about any dietary requirements</p>
                <p>And please take a lateral flow before you get here!</p>
            </main>
        </>
    )
}

export default ChristmasParty2021