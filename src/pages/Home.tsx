import { FC } from "react";
import AppBarComp from "../components/AppBarComp";
import EditorComp from "../components/EditorComp";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const appBarHeight = "64px";
  return (
    <>
      <AppBarComp appBarHeight={appBarHeight} />
      <EditorComp appBarHeight={appBarHeight} />
    </>
  );
};

export default Home;
