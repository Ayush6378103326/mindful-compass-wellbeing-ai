
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-6">
        <Dashboard />
      </main>
      <footer className="border-t border-healthcare-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MindfulCompass - AI-Powered Healthcare Assistant</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
