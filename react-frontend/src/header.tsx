import { FC } from "react";
import floodFillIcon from "/flood-fill.png";

const Header: FC = () => {
  return (
    <div className="header">
      <img className="flood-fill-icon" src={floodFillIcon}></img>
      <p>A demo of 8-way flood fill by Chris Hamilton</p>
    </div>
  );
};

export default Header;
