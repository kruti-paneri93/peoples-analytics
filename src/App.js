import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import CreateOrg from './pages/CreateOrg';
import CreateUser from './pages/CreateUser';
import CreateNewOrg from './pages/create-new-org';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/CreateOrg' element={ <CreateOrg />} />
            <Route path='/CreateUser' element={<CreateUser />} />
            <Route path='/CreateNewOrg' element={<CreateNewOrg />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
