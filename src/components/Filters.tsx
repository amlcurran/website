import {Chip} from "./Chip";
import React from "react";
import {filterParam} from "../utils/filterParam";


export function Filters({tags}: {tags: string[]}) {
    return <div className="filter-container">
        Filter by:
        {tags.map(tag => <LocationChip key={tag} tag={tag}/>) }
    </div>
}

function LocationChip({tag}: { tag: string }) {
  const selected = filterParam() == tag;
  return <Chip style={{display: "inline-block"}}
               selected={selected}
               text={tag}
               link={`?filter=${tag}`}
               closeButton={
                 {
                   closeLocation: "?",
                   visible: selected
                 }
               }/>
}
