import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './AppRoutes';
import ErrorBoundary from './components/organisms/ErrorBoundary/ErrorBoundary';
import Modals from './components/organisms/Modals/Modals';
import { Toaster } from './components/ui/sonner';
import { AppContextProvider } from './context/AppContextProvider';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ErrorBoundary>
          <AppRoutes />
          <Modals />
        </ErrorBoundary>
      </AppContextProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
