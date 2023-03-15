import React from "react";

export function optionalComponent<T>(optional: T | undefined, builder: (input: T) => JSX.Element): JSX.Element {
  return optional ? builder(optional) : <></>
}

export function booleanComponent(test: boolean | undefined, builder: () => JSX.Element): JSX.Element {
  return test ? builder() : <></>
}