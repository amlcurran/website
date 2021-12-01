import React, {useState} from "react"
import "../components/christmas.module.css"
import {StaticImage} from "gatsby-plugin-image"
import SEO from "../components/seo"
const sha1 = require("sha1")

interface ChristmasState {
    date: string
    address: string
}

const LoggedIn = ({state}: { state: ChristmasState }) => (
    <div style={{borderImage: "url(../images/christmas-clipart-with-transparent-background-11.png)"}}>
        <StaticImage src="../images/christmas-clipart-with-transparent-background-11.png" alt="" placeholder="none" />
        <p>From 8.00pm on {state!.date}</p>
        <p>At my address: {state!.address} (please
            buzz
            at the main door if it isn't open)</p>
        <img src="https://media.giphy.com/media/Zx2hXm2ocvFDN8032P/source.gif" style={{width: '100%', height: 100, objectFit: 'cover' }} />
        <p>Nearest tube stops are Arsenal (Piccadilly) or Finsbury Park (Victoria)</p>
        <p>Nibbles, drinks will be provided, just bring some fun!</p>
        <p>Please let me know about any dietary requirements</p>
        <p>And please take a lateral flow before you get here!</p>
    </div>
)

const LoggedOut = ({setState}: {setState: (arg0: ChristmasState) => void}) => {
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
            <div>
                <span>But you need to put the password in first...</span>
                <input id="password"
                       onChange={value => setPasswordInput(value.target.value)}
                       placeholder="Enter the password here"
                       type="password"/>
                <br />
                <button onClick={onClick} disabled={isSending} style={{width: '100%'}}>Enter</button>
            </div>
        </>
    )
}

const ChristmasParty2021 = () => {
    const [state, setState] = useState<ChristmasState>()
    return (
        <>
            <main style={{all: "revert", fontFamily: "serif"}} className="christmas">
                <SEO description="You're invited!" title="Christmas Party 2021" />
                <marquee>
                    <h1 style={{all: "revert"}}>
                        <span style={{color: "red"}}>You're </span>
                        <span style={{color: "orange"}}>invited </span>
                        <span style={{color: "yellow"}}>to </span>
                        <span style={{color: "green"}}>a </span>
                        <span style={{color: "blue"}}>Christmas </span>
                        <span style={{color: "purple"}}>Party </span>
                    </h1>
                </marquee>
                {state !== undefined ? <LoggedIn state={state}/> : <LoggedOut setState={setState}/>}
            </main>
        </>
    )
}

export default ChristmasParty2021