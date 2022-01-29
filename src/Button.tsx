import React from "react";

type Props = { onClick: () => void };

export const Button = ({ onClick }: Props): JSX.Element => {
  return <button onClick={onClick}>click</button>;
};
