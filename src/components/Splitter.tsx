import React, {useState} from "react"

interface SplitterProps {
    left: JSX.Element
    right: JSX.Element
    expandRight: boolean
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
    const leftOffset = props.expandRight ? 1 : -1
    const rightOffset = props.expandRight ? -1 : 1

    return (
        <div onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             style={{position: 'relative'}}>
            <div style={{transform: isHovered ? `translateX(${leftOffset * 60}px)` : `translateX(${leftOffset * 16}px)`, position: 'absolute', zIndex: 1, ...defaultStyle()}}>{props.left}</div>
            <div style={{transform: isHovered ? `translateX(${rightOffset * 32}px)` : `translateX(${rightOffset * 16}px)`, ...defaultStyle()}}>{props.right}</div>
        </div>
    )

}