import React from "react";

export const NonMatchingBanner = ({ title }: { title: string }) => (
  <div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", opacity: 0.4, }}>
    <div style={{ flexGrow: 1, backgroundColor: "var(--primary)", height: 2 }} />
    <h3 style={{ marginTop: 4, marginLeft: 16, marginRight: 8 }}> {title} doesn't match your filter</h3>
    <a href={'?'} style={{ marginRight: 16 }}>(Clear filter)</a>
    <div style={{ flexGrow: 1, backgroundColor: "var(--primary)", height: 2 }} />
  </div>
  </div>
)
