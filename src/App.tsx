import { FC } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
