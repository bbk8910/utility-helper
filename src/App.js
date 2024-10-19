import "./App.css";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./layout/Navbar";

import {ConfirmProvider} from "material-ui-confirm";
import {DateTimeCard} from "./pages/DateTimeCard";
import AnalogWatch from "./pages/AnalogWatch";

function App() {
    return (
        <ConfirmProvider>
            <div className="App">

                <div className={"tab-wrapper"}>
                    <Navbar className="navbar"/>

                    <BrowserRouter>
                        <AppRoutes/>
                    </BrowserRouter>


                </div>
            </div>
        </ConfirmProvider>
    );
}

export default App;
