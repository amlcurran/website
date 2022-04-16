import React, {useState} from "react"
import "./splitter.scss"

interface SplitterProps {
    left: JSX.Element
    right: JSX.Element
    expandRight: boolean
}

export function Splitter(props: SplitterProps) {

    const [isHovered, setHovered] = useState(false)
    const translationFront = props.expandRight ? 24 : 60
    const translationBack = props.expandRight ? 60 : 24
    const frontStyle = isHovered ? {transform: `translateX(${-1 * translationFront}px)`} : {}
    const backStyle = isHovered ? {transform: `translateX(${translationBack}px)`} : {}

    return (
        <div onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             style={{position: 'relative'}}>
            <div style={frontStyle}
                 className="splitter splitter-front">{props.left}</div>
            <div style={backStyle}
                 className="splitter">{props.right}</div>
        </div>
    )

}