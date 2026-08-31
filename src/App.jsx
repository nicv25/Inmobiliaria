import { Routes, Route } from 'react-router-dom';
import RoleSelection from './views/RoleSelection.jsx';
import ClientLayout from './layout/ClientLayout.jsx';
import Discover from './views/client/Discover.jsx';
import Appointments from './views/client/Appointments.jsx';

import Login from './views/auth/Login.jsx';
import Register from './views/auth/Register.jsx';
import BusinessLogin from './views/auth/BusinessLogin.jsx';
import BusinessRegister from './views/auth/BusinessRegister.jsx';
import BusinessPending from './views/auth/BusinessPending.jsx';

import BusinessLayout from './layout/BusinessLayout.jsx';
import Dashboard from './views/business/Dashboard.jsx';
import Properties from './views/business/Properties.jsx';
import EditProperty from './views/business/EditProperty.jsx';
import PropertyPreview from './views/business/PropertyPreview.jsx';
import AppointmentRequests from './views/business/AppointmentRequests.jsx';
import AppointmentDetail from './views/business/AppointmentDetail.jsx';// NUEVO COMPONENTE

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      
      <Route path="/cliente" element={<ClientLayout />}>
        <Route index element={<Discover />} />
        <Route path="favoritos" element={<h1>Mis Favoritos</h1>} />
        <Route path="citas" element={<Appointments />} />
        <Route path="historial" element={<h1>Historial</h1>} />
        <Route path="cuenta" element={<h1>Mi Cuenta</h1>} />
      </Route>

      <Route path="/inmobiliaria/login" element={<BusinessLogin />} />
      <Route path="/inmobiliaria/registro" element={<BusinessRegister />} />
      <Route path="/inmobiliaria/solicitud-enviada" element={<BusinessPending />} />

      <Route path="/inmobiliaria" element={<BusinessLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="inmuebles" element={<Properties />} />
        
        {/* RUTAS CORREGIDAS */}
        <Route path="inmuebles/:id" element={<PropertyPreview />} />
        <Route path="registrar" element={<EditProperty />} />
        <Route path="editar-inmueble/:id" element={<EditProperty />} />
        
        <Route path="solicitudes" element={<AppointmentRequests />} />
        <Route path="solicitudes/:id" element={<AppointmentDetail />} />
        <Route path="historial" element={<h1>Historial de citas</h1>} />
        <Route path="metricas" element={<h1>Métricas</h1>} />
        <Route path="perfil" element={<h1>Perfil de empresa</h1>} />
      </Route>
    </Routes>
  );
}