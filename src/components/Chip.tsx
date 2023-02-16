import React, {CSSProperties} from "react"
import "./chips.scss"

interface ChipProps {
    text: string
    selected?: boolean
    style?: CSSProperties
    closeButton?: CloseButtonProps
}

interface CloseButtonProps {
    visible: boolean
    closeLocation: string
}

const CloseButton = (props: CloseButtonProps) => {
    return <a href={props.closeLocation}>{props.visible ? <span className="material-icons-round md-18" style={{
        verticalAlign: "middle",
        paddingLeft: 4,
        fontWeight: "bold"
    }}>close</span> : <></>}</a>;
}

export const Chip = (props: ChipProps) => {
    return (
        <div className={`${props.selected ? "chip-selected" : "chip"}`} style={props.style}>
            {props.text}
            {props.closeButton ? <CloseButton visible={props.closeButton.visible} closeLocation={props.closeButton.closeLocation} /> : <></> }
        </div>
    )
}