import React from "react";
import "./whats-on.css"
import {StaticImage} from "gatsby-plugin-image"

function WhatsOnLandingPage() {
    return <div>
        <div className="upper">
            <div className="readable">
                <StaticImage src="../../articles/whats-on-icon.png" alt="What's on icon" className="whats-on-image"/>
                <h1 className="on-dark">What's on</h1>
            </div>
        </div>
        <main className="whats-on-main readable">
            Get your calendar organised.<br/>
            Join the beta on Testflight for <a href="https://testflight.apple.com/join/cikdBFDI">iOS</a> and soon macOS
            and Android.
        </main>
    </div>
}

export default WhatsOnLandingPage