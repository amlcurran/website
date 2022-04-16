import React from "react"
import "./chips.scss"

interface ChipProps {
    text: string
}

export const Chip = (props: ChipProps) => {
    return (
        <div className="chip">{props.text}</div>
    )
}