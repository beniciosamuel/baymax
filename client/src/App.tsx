import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout/AppLayout';
import { PatientPage } from './pages/PatientPage/PatientPage';
import { MedicinePage } from './pages/MedicinePage/MedicinePage';
import { PrescriptionPage } from './pages/PrescriptionPage/PrescriptionPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/patients" replace />} />
        <Route path="/patients" element={<PatientPage />} />
        <Route path="/medicines" element={<MedicinePage />} />
        <Route path="/prescriptions" element={<PrescriptionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
