import {Icon} from "./card";
import React from "react";

export const ContactButton = ({url, text, icon}: {url: string, text: string, icon: Icon}) => (
  <a href={url} className="inner-link contact-button">
    <span>{text}</span>
    <span className="material-icons-round" style={{ verticalAlign: "middle", paddingBottom: -2, paddingLeft: 4 }}>{icon}</span>
  </a>
)
