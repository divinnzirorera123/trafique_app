
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState('Dashboard');

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4">
            <Outlet context={{ setTitle }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
