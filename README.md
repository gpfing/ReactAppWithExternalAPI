# Currency Converter

A React application for converting currencies with real-time exchange rates.

## Description

This app allows users to convert between 150+ world currencies using real-time exchange rates from external APIs. Built with React, React Router, and Vite, it features a responsive UI with conversion history tracking stored in local storage.

## Setup Instructions

### Prerequisites
- Node.js (version 16+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ReactAppWithExternalAPI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173] in your browser

## API Information

### ExchangeRate-API
- **Base URL**: `https://api.exchangerate-api.com/v4/latest`
- **Endpoint**: `GET /latest/{currency}`
- **Authentication**: None required
- **Documentation**: [exchangerate-api.com/docs](https://www.exchangerate-api.com/docs)

**Note**: This API is completely free to use with no authentication required.

## Challenges & Known Issues

### Challenges Faced
- Finding a reliable free currency API that doesn't require complex authentication
- Managing conversion history with local storage persistence
- Creating a responsive UI that works across all device sizes
- Implementing error handling for API failures

### Known Issues
1. **API Rate Limits**: The free API has generous rate limits for personal use
2. **Offline Support**: Requires internet connection to fetch rates
3. **Historical Data**: Only current rates are supported

## Build for Production

```bash
npm run build
```
