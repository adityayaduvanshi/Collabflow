import React from 'react';
import { Sidebar } from './_components/sidebar';
import { OrgSidebar } from './_components/organisation-sidebar';
import { Navbar } from './_components/navbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
