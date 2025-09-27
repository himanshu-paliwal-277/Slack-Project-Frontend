import { Outlet } from 'react-router-dom';

import Footer from '../molecules/Footer';
import Header from '../molecules/Header';

function MainLayout() {
  return (
    <div>
      <Header />
      <main className="min-h-[100vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
