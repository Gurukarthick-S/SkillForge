import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Header from './components/layout/Header';
//import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from "./pages/About";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";
import Mentor from "./pages/Mentor";
import Jobs from "./pages/Jobs";
import ChooseSkill from "./pages/ChooseSkill";
import LearningPlan from "./pages/LearningPlan";
import LessonPage from "./pages/LessonPage";

const AppContent = () => {
  const loction = useLocation();

  const isDashboardRoute = loction.pathname.startsWith('/dashboard');

  return (
    <div style={appStyle}>
      {!isDashboardRoute && <Header />}

        <main style={mainStyle}>
          <Routes>
            {/* Define your routes here */}
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/skills" element={<Skills />} />
            <Route path="/dashboard/resume" element={<Resume />} />
            <Route path="/dashboard/mentor" element={<Mentor />} />
            <Route path="/dashboard/jobs" element={<Jobs />} />
            <Route path="/dashboard/choose-skill" element={<ChooseSkill />} />
            <Route path="/dashboard/learning-plan" element={<LearningPlan />} /> 
            <Route path="/dashboard/lesson" element={<LessonPage />} /> 
            {/* 404 Page - catches all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer appears on all pages */}
        
      </div>
  );
}

// Simple 404 component
const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

const appStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}; 

const mainStyle = {
  flex: 1,
  paddingTop: '70px',
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
} 

export default App;