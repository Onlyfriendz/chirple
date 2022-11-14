import css from "./Button.module.css";

import DoubleArrowSharpIcon from "@mui/icons-material/DoubleArrowSharp";
// import { Button } from "@mui/material";
import { PopupButton } from "@typeform/embed-react";

const MyButton = (props) => {
  const symbol =
    props.symbol === "arrow" ? (
      <DoubleArrowSharpIcon className={css.chevron} />
    ) : null;

  const inverted = props.inverted === "true" ? css.inverted : null;

  if (props.typeform === "true") {
    return (
      <PopupButton
        id="Wg8EdlDs"
        className={`${props.className} ${css.button} ${inverted}`}
      >
        {props.text}
        {symbol}
      </PopupButton>
    );
  } else {
    return (
      <a
        variant="contained"
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className={`${props.className} ${css.button} ${inverted}`}
      >
        {props.text}
        {symbol}
      </a>
    );
  }
};

export default MyButton;