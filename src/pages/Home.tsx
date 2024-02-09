import { FC } from "react";
import AppBarComp from "../components/AppBarComp";
import EditorComp from "../components/EditorComp";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <>
      <AppBarComp />
      <EditorComp />
    </>
  );
};

export default Home;
