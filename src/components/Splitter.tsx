import React from "react"
import "./splitter.scss"

interface SplitterProps {
    left: JSX.Element
    right: JSX.Element
    expandRight: boolean
}

export function Splitter(props: SplitterProps) {
    const frontStyle = (props.expandRight ? "right-front" : "left-front")
    const backStyle = (props.expandRight ? "right-back" : "left-back")
    return (
        <div className="splitter-host">
            <div className={`splitter-child splitter-front ${frontStyle}`}>{props.left}</div>
            <div className={`splitter-child ${backStyle}`}>{props.right}</div>
        </div>
    )

}