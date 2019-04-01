import React, { CSSProperties } from "react";
import Styling from "./styling";

const badgeStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 40,
    justifyContent: "space-around",
    marginLeft: 16,
    marginTop: 8,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: 700,
    color: Styling.white
}

interface BadgeProps {
    text: string
    component: JSX.Element
}

const Badge = ({ text, component }: BadgeProps) => {
    return (
        <div style={badgeStyle}>
            {component}
            <div style={{ marginTop: 4 }}>{text}</div>
        </div>
    )
}

export default Badge