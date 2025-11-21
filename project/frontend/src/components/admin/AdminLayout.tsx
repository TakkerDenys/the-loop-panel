import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({children}: AdminLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - fixed on the left */}
            <Sidebar/>

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header - only for main content */}
                <Header/>

                {/* Content area */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}