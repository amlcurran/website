import React, {CSSProperties, ReactNode, useState} from "react"

const sha1 = require("sha1")

interface ChristmasState {
    date: string
    address: string
}

const redactedType: CSSProperties = {
    backgroundColor: "lightgray",
    borderRadius: 4,
    padding: 4,
    fontFamily: "monospace"
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
            <main id="all-unset">
                <marquee>
                    <h1>
                        <span style={{color: "red"}}>You're </span>
                        <span style={{color: "orange"}}>invited </span>
                        <span style={{color: "yellow"}}>to </span>
                        <span style={{color: "green"}}>a </span>
                        <span style={{color: "blue"}}>Christmas </span>
                        <span style={{color: "purple"}}>Party </span>
                    </h1>
                </marquee>
                <div>
                    <input id="password"
                           onChange={value => setPasswordInput(value.target.value)}
                           placeholder="Enter the password here"
                           type="password" />
                    <button onClick={onClick} disabled={isSending}>Enter</button>
                </div>
                <iframe src="https://giphy.com/embed/Zx2hXm2ocvFDN8032P" width="480" height="480" frameBorder="0"
                        className="giphy-embed" allowFullScreen />
                <p>From 8.30pm on {state !== undefined ? state!.date : <span style={redactedType}>redacted</span>}</p>
                <p>At my address: {state !== undefined ? state!.address : <span style={redactedType}>redacted</span>} (please buzz at the main door if it isn't open)</p>
                <iframe allowFullScreen frameBorder="0" height="100%"
                        src="https://giphy.com/embed/FaHOtxa23Tb4wtygMg/video"
                        style={{left: 0, top: 0}} width="100%"/>
                <p>Nearest tube stops are Arsenal (Piccadilly) or Finsbury Park (Victoria)</p>
                <p>Nibbles, drinks will be provided, just bring some fun!</p>
                <p>Please let me know about any dietary requirements</p>
                <p>And please take a lateral flow before you get here!</p>
            </main>
        </>
    )
}

export default ChristmasParty2021