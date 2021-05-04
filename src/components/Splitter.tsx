import React, {useState} from "react"
import PhoneFrame from "./phone-frames"

interface SplitterProps {
    left: JSX.Element
    right: JSX.Element
}

function defaultStyle() {
    return {
        width: '90%',
        bottom: 0,
        transition: 'transform 0.2s ease-in-out'
    }
}

export function Splitter(props: SplitterProps) {

    const [isHovered, setHovered] = useState(false)

    return (
        <div onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             style={{position: 'relative'}}>
            <div style={{transform: isHovered ? 'translateX(-60px)' : 'translateX(-16px)', position: 'absolute', zIndex: 1, ...defaultStyle()}}>{props.left}</div>
            <div style={{transform: isHovered ? 'translateX(32px)' : 'translateX(16px)', ...defaultStyle()}}>{props.right}</div>
        </div>
    )

}