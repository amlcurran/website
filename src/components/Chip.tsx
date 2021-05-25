import React, {CSSProperties} from "react"
import Styling from "./styling"

interface ChipProps {
    text: string
    style?: CSSProperties
}

export const Chip = (props: ChipProps) => {
    return (
        <div style={{backgroundColor: 'var(--primary-hover)',
            marginRight: 5,
            padding: '5px 10px',
            borderRadius: 20,
            color: Styling.primaryColor}}>{props.text}</div>
    )
}