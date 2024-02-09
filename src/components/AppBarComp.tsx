import { FC } from "react";

interface AppBarCompProps {
  appBarHeight: string;
}

const AppBarComp: FC<AppBarCompProps> = ({ appBarHeight }) => {
  return (
    <div
      className={"bg-gray-900 text-white py-4 px-6 h-[" + appBarHeight + "]"}
    >
      <h1 className="text-2xl font-bold">TwPicsEditor</h1>
    </div>
  );
};

export default AppBarComp;
