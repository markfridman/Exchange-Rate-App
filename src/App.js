import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Lazy load components for better performance
const ExchangeRateViewer = React.lazy(() => import('./components/ExchangeRateViewer/ExchangeRateViewer'));

// Layout Components
const Navbar = () => (
  <nav className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="items-center">
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Exchange Rate App
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-white border-t mt-auto">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Exchange Rate App. All rights reserved.
      </div>
    </div>
  </footer>
);

const Loading = () => (
  <div className="flex justify-center items-center h-[50vh]">
    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  </div>
);

const Home = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        USD to ILS Exchange Rate Tracker
      </h1>
      <p className="text-lg text-gray-600">
        Track historical exchange rates between US Dollar and Israeli Shekel
      </p>
    </div>
    <Suspense fallback={<Loading />}>
      <ExchangeRateViewer />
    </Suspense>
  </div>
);

const About = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This App</h2>
      <p className="text-gray-600 mb-4">
        This application provides historical exchange rate data between USD and ILS.
        It uses the OpenExchangeRates API to fetch accurate historical data and displays
        it in an interactive chart.
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Features:</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Historical exchange rate visualization</li>
        <li>Percentage change calculations</li>
        <li>Custom date range selection (up to 2 weeks)</li>
        <li>Cached API responses for better performance</li>
        <li>Responsive design for all devices</li>
      </ul>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">404 - Page Not Found</h2>
                <Link to="/" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
                  Return Home
                </Link>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;