import React, {CSSProperties} from "react"
import "./chips.scss"

interface ChipProps {
    text: string
    selected?: boolean
    style?: CSSProperties
}

interface CloseButtonProps {
    selected: boolean
    closeLocation: string
}

const CloseButton = (props: CloseButtonProps) => {
    return <a href={props.closeLocation}>{props.selected ? <span className="material-icons-round md-18" style={{
        verticalAlign: "middle",
        paddingLeft: 4,
        fontWeight: "bold"
    }}>close</span> : <></>}</a>;
}

export const Chip = (props: ChipProps & CloseButtonProps) => {
    return (
        <div className={`${props.selected ? "chip-selected" : "chip"}`} style={props.style}>
            {props.text}
            <CloseButton selected={props.selected} closeLocation={props.closeLocation} />
        </div>
    )
}