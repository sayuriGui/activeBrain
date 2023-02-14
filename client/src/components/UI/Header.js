import React from "react";

function Header({ text }) {
  return (
    <div className="mb-10">
      <h1>{text}</h1>
      <hr />
    </div>
  );
}

export default Header;
