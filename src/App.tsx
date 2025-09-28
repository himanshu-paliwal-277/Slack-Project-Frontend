import { Route, Routes } from 'react-router-dom';

import Auth from './pages/Auth/Auth';

function App() {
  return (
    <Routes>
      {/* Wrap all routes with MainLayout */}
      <Route path="/auth" element={<Auth />} />
      {/* <Route element={<MainLayout />}> */}
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;
