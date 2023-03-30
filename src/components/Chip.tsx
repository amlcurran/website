import React, {CSSProperties} from "react"
import "./chips.scss"
import {booleanComponent, optionalComponent} from "../utils/optionalComponent";

interface ChipProps {
    text: string
    selected?: boolean
    style?: CSSProperties
    link?: string
    closeButton?: CloseButtonProps
}

interface CloseButtonProps {
    visible: boolean
    closeLocation: string
}

const CloseIcon = () => {
    return <span className="material-icons-round md-18" style={{
        verticalAlign: "middle",
        paddingLeft: 4,
        paddingRight: 4,
        fontWeight: "bold"
    }}>close</span>
}

const CloseButton = (props: CloseButtonProps) => {
    return <a href={props.closeLocation} className={"hover-background-on-primary"}>{props.visible ? <CloseIcon /> : <></>}</a>;
}

export const Chip = (props: ChipProps) => {
    return (
        <div className={`${props.selected ? "chip selected" : "chip"}`} style={props.style} key={props.text}>
            {props.link ? <a href={props.link}>{props.text}</a> : props.text}
            {optionalComponent(props.closeButton, (closeButton) => <CloseButton visible={closeButton.visible} closeLocation={closeButton.closeLocation} />)}
        </div>
    )
}
