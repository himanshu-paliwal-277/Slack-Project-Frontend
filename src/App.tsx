import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import SigninContainer from './components/organisms/Auth/SigninContainer';
import SignupContainer from './components/organisms/Auth/SignupContainer';
import Auth from './pages/Auth/Auth';
import { Notfound } from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/auth/signup"
          element={
            <Auth>
              <SignupContainer />
            </Auth>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <Auth>
              <SigninContainer />
            </Auth>
          }
        />
        <Route path="/*" element={<Notfound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
