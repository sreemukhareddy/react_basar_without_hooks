import React from "react";

const inputComponent = (props) => {
  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <input type={props.type} value={props.value} onChange={props.onChanged} />
    </div>
  );
};

export default inputComponent;
