import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import SigninContainer from './components/organisms/Auth/SigninContainer';
import SignupContainer from './components/organisms/Auth/SignupContainer';
import { AppContextProvider } from './context/AppContextProvider';
import Auth from './pages/Auth/Auth';
import { Notfound } from './pages/NotFound/NotFound';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
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
      </AppContextProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
