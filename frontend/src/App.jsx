import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusRouteDashboard from './components/BusRouteDashboard.jsx';
import AddRoute from './components/AddRoute.jsx';
import RouteMap from './components/RouteMap.jsx';
import {Toaster} from "react-hot-toast"

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/add-route" element={<AddRoute />} />
          <Route path="/" element={<BusRouteDashboard />} />
          <Route path="/route-map" element={<RouteMap />} />
        </Routes>
        <Toaster />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;