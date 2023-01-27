import { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyValue, bigKey }) {
  const { board } = useContext(AppContext);
  return (
    <div className="key" id={bigKey && "big"}>
      {keyValue}
    </div>
  );
}

export default Key;
