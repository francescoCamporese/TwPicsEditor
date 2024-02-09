import { FC } from "react";

interface AppBarCompProps {}

const AppBarComp: FC<AppBarCompProps> = ({}) => {
  return (
    <div className="appbar-container">
      <h1 className="appbar-text">TwPicsEditor</h1>
    </div>
  );
};

export default AppBarComp;
