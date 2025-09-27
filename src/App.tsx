import { Route, Routes } from 'react-router-dom';

import MainLayout from './components/organisms/MainLayout';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      {/* Wrap all routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
