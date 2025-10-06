import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './AppRoutes';
import { Toaster } from './components/ui/sonner';
import { AppContextProvider } from './context/AppContextProvider';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
