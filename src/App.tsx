import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage/LandingPage';
import HowItWorksPage from '@/pages/HowItWorks/HowItWorksPage';
import PricingPage from '@/pages/Pricing/PricingPage';
import AboutPage from '@/pages/About/AboutPage';
import { Login } from '@/pages/Login/Login';
import Profile from '@/pages/Profile/Profile';
import NotFoundPage from '@/pages/NotFound/page_not_found';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { useSession } from '@/hooks/useSession';

function App() {
  const { isLogged } = useSession();

  return (
    <Routes>
      <Route path="/dashboard" element={isLogged ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/" element={isLogged ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route
        path="/tasks"
        element={
          isLogged ? (
            <>
              <Navigate to={'/dashboard'} />
            </>
          ) : (
            <LandingPage />
          )
        }
      />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={isLogged ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/profile" element={isLogged ? <Profile /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
