//* LIB
import { useRoutes } from "react-router-dom";

//* IMPORT
import Route from "@/routers";

const App = () => {
  console.log(process.env.API_KEY);
  return useRoutes(Route);
};

export default App;
