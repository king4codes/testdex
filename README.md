# DEX Terminal

A modern decentralized exchange (DEX) terminal built with React, featuring real-time token swaps on Solana using Jupiter Terminal integration.

## Features

- 🔄 Real-time token swaps on Solana mainnet
- 📊 Token price tracking and trending pairs
- 💼 Portfolio management
- 🚀 Pump.fun token integration
- 🎯 0.5% platform fee on all swaps
- 🎨 Modern, responsive UI with dark mode

## Tech Stack

- React.js
- Jupiter Terminal (Solana DEX Aggregator)
- React Router DOM
- Tailwind CSS
- Moralis API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/king4codes/testdex.git
   cd testdex
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   REACT_APP_MORALIS_API_KEY=your_moralis_api_key
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

The app will be available at `http://localhost:3000`

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Configure the following build settings:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add your environment variables in the Vercel project settings
5. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Jupiter Terminal for Solana swap integration
- Moralis for blockchain data API
- Pump.fun for token data integration
