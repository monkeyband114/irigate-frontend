import React from "react";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "./components/theme-provider";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="bg-primary text-primary-foreground p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              AgroDin IoT Irrigation System
            </h1>
            <span className="text-2xl">🌱</span>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <Dashboard />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
