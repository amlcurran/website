import {StaticImage} from "gatsby-plugin-image";
import React from "react";

export const UnlistedWarning = () => <div className="tiny-card">
  <StaticImage alt={"Heads up!"} src={"./hands-thrumpet.png"} imgStyle={{ width: "100%", scale: "0.9" }} />
  <div style={{paddingTop: 16, paddingBottom: 16}}>
    <h4 style={{marginTop: 8}}>Heads up!</h4>
    <div className="tiny-card-description">You're reading an unpublished article, so this is probably not yet finished. Any feedback or edits? Get in touch!</div>
  </div>
</div>