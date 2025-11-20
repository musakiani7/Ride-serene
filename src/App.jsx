import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CityToCityPage from './pages/CityToCityPage';
import ChauffeurHailingPage from './pages/ChauffeurHailingPage';
import AirportTransferPage from './pages/AirportTransferPage';
import HourlyHirePage from './pages/HourlyHirePage';
import BecomeChauffeurPage from './pages/BecomeChauffeurPage';
import ChauffeurLoginPage from './pages/ChauffeurLoginPage';
import BusinessOverviewPage from './pages/BusinessOverviewPage';
import CorporateTravelPage from './pages/CorporateTravelPage';
import TravelAgenciesPage from './pages/TravelAgenciesPage';
import StrategicPartnershipsPage from './pages/StrategicPartnershipsPage';
import EventsPage from './pages/EventsPage';
import LimousineServicesPage from './pages/LimousineServicesPage';
import ChauffeurServicesPage from './pages/ChauffeurServicesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Placeholder pages for different modules
const CustomerDashboard = () => <div className="container section"><h1>Customer Dashboard</h1></div>;
const ChauffeurDashboard = () => <div className="container section"><h1>Chauffeur Dashboard</h1></div>;
const AdminDashboard = () => <div className="container section"><h1>Admin Dashboard</h1></div>;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
            <Route path="/services/city-to-city" element={<CityToCityPage />} />
            <Route path="/services/chauffeur-hailing" element={<ChauffeurHailingPage />} />
            <Route path="/services/airport-transfers" element={<AirportTransferPage />} />
            <Route path="/services/hourly-hire" element={<HourlyHirePage />} />
            <Route path="/services/chauffeur-services" element={<ChauffeurServicesPage />} />
            <Route path="/services/limousine-services" element={<LimousineServicesPage />} />
          <Route path="become-chauffeur" element={<BecomeChauffeurPage />} />
          <Route path="chauffeur-login" element={<ChauffeurLoginPage />} />
            <Route path="/business/overview" element={<BusinessOverviewPage />} />
            <Route path="/business/corporate-accounts" element={<CorporateTravelPage />} />
            <Route path="/business/travel-agencies" element={<TravelAgenciesPage />} />
            <Route path="/business/strategic-partnerships" element={<StrategicPartnershipsPage />} />
            <Route path="/business/events" element={<EventsPage />} />
          <Route path="customer/*" element={<CustomerDashboard />} />
          <Route path="chauffeur/*" element={<ChauffeurDashboard />} />
          <Route path="admin/*" element={<AdminDashboard />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
