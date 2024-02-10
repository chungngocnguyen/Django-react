import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./component/login";
import {Home} from "./component/Home";
import {Navigation} from './component/navigation';
import {Logout} from './component/logout';
import TodoListPage from './component/TodoListPage';
import Register from './component/register';
function App() {
    return <BrowserRouter>
    <Navigation></Navigation>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/todo" element={<TodoListPage/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;
