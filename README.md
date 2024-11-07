# Exchange Rate Viewer

A React component that displays historical exchange rates between USD and ILS over a customizable date range, with support for percentage change visualization.

## 🚀 Features

- 📊 Interactive chart showing USD to ILS exchange rates
- 📈 Percentage change visualization
- 📅 Customizable date range (up to 14 days)
- 💾 API response caching
- 🔄 Loading states

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Exchange-Rate-App
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env
```
Edit `.env` and add your OpenExchangeRates API key:
```
REACT_APP_EXCHANGE_RATE_API_URL=https://openexchangerates.org/api
REACT_APP_EXCHANGE_RATE_APP_ID=your_api_key_here
REACT_APP_EXCHANGE_RATE_MAX_DATE_RANGE=14
```

## 📋 Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0
- OpenExchangeRates API key (get one at https://openexchangerates.org/signup/free)

## 🔧 Dependencies

- react
- react-dom
- date-fns
- recharts
- shadcn/ui

## 🏗️ Project Structure

```
src/
├── components/
│   └── ExchangeRateViewer/
│       ├── ExchangeRateViewer.jsx    # Main component
│       ├── DateRangePicker.jsx       # Date selection component
│       ├── LoadingSpinner.jsx        # Loading indicator
│   └── hooks/
│       └── useExchangeRates.js   # Data fetching logic
├   ── config/
│       └── config.js              # Environment configuration
└── tests/
    └── ExchangeRateViewer.test.jsx   # Component tests
```

## 💻 Usage

```jsx
import ExchangeRateViewer from './components/ExchangeRateViewer';

function App() {
  return (
    <div className="container mx-auto p-4">
      <ExchangeRateViewer />
    </div>
  );
}
```

## ⚙️ Configuration

The component can be configured through environment variables:

- `REACT_APP_EXCHANGE_RATE_API_URL`: Base URL for the OpenExchangeRates API
- `REACT_APP_EXCHANGE_RATE_APP_ID`: Your OpenExchangeRates API key
- `REACT_APP_EXCHANGE_RATE_MAX_DATE_RANGE`: Maximum date range in days (default: 14)

## 🧪 Testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Authors

- Mark Fridman - Initial work

## 🙏 Acknowledgments

- OpenExchangeRates for providing the API
- Recharts for the charting library
- shadcn/ui for the UI components
