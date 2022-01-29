import React from "react";
import { Button } from "./Button";
import { broadcast } from "./broadcast";

interface ChildrenAndProps {
  children?: JSX.Element;
}

export const Section1 = ({ children }: ChildrenAndProps): JSX.Element => {
  const handleButton = () => {
    broadcast.emit("my-flag", Date.now());
  };

  return (
    <section>
      <p>Emitter</p>
      <Button onClick={handleButton} />
    </section>
  );
};
