import {PortfolioSmallViewState} from "../portfolio/portfolioViewModel";
import React from "react";

export interface CardTextProps {
  title: string
  subtitle: string
  text: string
  // Maybe move this into the level up
  lowerPriority: boolean
}

export const SmallCard = (props: CardTextProps) => {
  return (
    <div
      key={props.title}
      style={{
        opacity: props.lowerPriority ? 0.4 : 1
      }}>
      <h3>{props.title}</h3>
      <h4>{props.subtitle}</h4>
      <section style={{marginTop: 8}}>{props.text}</section>
    </div>
  )
}
