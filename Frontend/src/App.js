import './/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from '../src/Components/Login/login';
import Planner from './MPlanner/Planner';
import ProgressPg from './IndiProgress/ProgressPg';
import StrengthPg from './StrengthPage/StrengthTester';
import ProfilePg from './ProfilePg/Profilepg';
import GeneratePlan from './Components/Features/GeneratePlan';
import Plan from './Components/Features/Plan';
import Shortspg from './Shortspg/Shortspg';
import DashPage from './DashPage/DashPage';
function App() {


  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/meal" element={<Planner/>}/>
          <Route path='/progress' element={<ProgressPg/>}/>
          <Route path='/strength' element={<StrengthPg/>}/>
          <Route path='/generatePlan' element={<GeneratePlan/>}/>
          <Route path='/shorts' element={<Shortspg/>}/>
          <Route path='/dashpage' element={<DashPage/>}/>
          <Route path='/profile' element={<ProfilePg/>}/>
          <Route path="/plan" element={<Plan/>} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;