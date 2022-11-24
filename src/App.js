import './App.css';
import { BrowserRouter} from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { Login } from './Components/Login/Login';
import { Provider } from "react-redux";
import { configStore } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Like } from './Components/Like/Like';
import PublicRoute from './Route/PublicRoute';
import PrivetRoute from './Route/PrivetRoute';
import { Signup } from './Components/Signin/Signup';
// import { Signup } from './Components/Signin/Signup';

function App() {


  let { store, persistor } = configStore();
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
          <PublicRoute path={"/signup"} exact component={Signup} />
            <PublicRoute path={"/"} exact restricted={true} component={Login} />
            <PrivetRoute path={"/home"} exact component={Home} />
            <PrivetRoute path={"/likepage"} exact component={Like} />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
