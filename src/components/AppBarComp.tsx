import { FC } from "react";

interface AppBarCompProps {}

const AppBarComp: FC<AppBarCompProps> = ({}) => {
  return (
    <div className="bg-gray-900 text-white py-4 px-6 abheight h-[var(--appbar-height)]">
      <h1 className="text-2xl font-bold">TwPicsEditor</h1>
    </div>
  );
};

export default AppBarComp;
