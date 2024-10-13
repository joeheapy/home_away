'use client';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/toaster';
// Define the Providers component which accepts children as props
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Toaster component */}
      <Toaster/>
        {/* Wrap children with ThemeProvider to manage theme settings */}
      <ThemeProvider 
        attribute='class' // Use the 'class' attribute to apply theme classes
        defaultTheme='system' // Set the default theme to the system's theme
        enableSystem // Enable system theme preference
        disableTransitionOnChange // Disable transitions when theme changes
      >
        {children}
      </ThemeProvider>
    </>
  );
}

export default Providers;
