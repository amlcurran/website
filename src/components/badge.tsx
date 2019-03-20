import React, { CSSProperties } from "react";

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
    fontWeight: "bold"
}

interface BadgeProps {
    text: string
    component: JSX.Element
}

const Badge = ({text, component}: BadgeProps) => {
    return (
        <div style={badgeStyle}>
            {component}
            {text}
        </div>
    )
}

export default Badge