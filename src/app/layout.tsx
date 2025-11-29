
import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ReduxProviders from '../redux/ReduxProviders';
import { project_name } from '@/constant/constant_data';
import { Metadata } from 'next';
import AuthGuard from '@/components/auth/AuthGuard';
import LocalizationProvider from '@/messages/LocalizationProvider';
  import { ToastContainer } from 'react-toastify';
const outfit = Outfit({
  subsets: ["latin"],
  
});
export const metadata:Metadata = {
  title:  `${project_name} | Dashboard`,
  description: `This is Home for ${project_name} `,
 icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <link rel="icon" href="/favicon.ico" /> */}

      <body className={`${outfit.className} dark:bg-gray-900`}  suppressHydrationWarning>
        <LocalizationProvider >
        <AuthGuard>
      <ReduxProviders>
        <ThemeProvider>
          <SidebarProvider>
            <ToastContainer style={{ zIndex: 1000000 }} />
            {children}</SidebarProvider>
        </ThemeProvider>
        </ReduxProviders>
        </AuthGuard>
        </LocalizationProvider>
      </body>
    </html>
  );
}
