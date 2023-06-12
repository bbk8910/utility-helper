import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./layout/Navbar";

import { ConfirmProvider } from "material-ui-confirm";

function App() {
  return (
    <ConfirmProvider>
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </ConfirmProvider>
  );
}

export default App;
