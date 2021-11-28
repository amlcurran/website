import React, {useEffect, useState} from "react"
const sha1 = require("sha1")

interface ChristmasState {
    date: string
    address: string
}

const ChristmasParty2021 = () => {
    const [state, setState] = useState<ChristmasState>()
    const password = sha1("nicetry")
    useEffect(() => {
        fetch(`https://us-central1-website-2802f.cloudfunctions.net/christmasDeets?password=${password}`,{
            mode: "cors"
        })
            .then(response => response.json())
            .then(resultData => setState(resultData))
    }, [])
    return (
        <>
            <main>
                <input type="text" />
                <p>You're invited to a Christmas Party</p>
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