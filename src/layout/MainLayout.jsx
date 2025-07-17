

import { Outlet } from 'react-router-dom';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet /> {/* ✅ This is where page content renders */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
