SkyCast Weather Application Documentation

 Overview
SkyCast is a modern, responsive weather application built with React. It features a sleek, glass-morphism design with animated weather icons and a minimalist UI. The app allows users to search for locations and view current weather conditions along with a two-day forecast.

 Tech Stack
- Framework: React 19.0.0
- Styling: CSS with custom animations and responsive design
- Icons: React Icons (Weather Icons)
- API: OpenWeather API
- HTTP Client: Native fetch API
- Fonts: Poppins (main font) and Orbitron (for title)

 Architecture

 Component Structure
1. App.js - Main component that manages state and API calls
2. SearchBar.js - Expandable search input for location queries
3. WeatherDisplay.js - Displays current weather conditions
4. ForecastDisplay.js - Shows weather forecast for upcoming days
5. LoadingSpinner.js - Loading indicator for API requests

 Data Flow
1. User enters a city name in SearchBar
2. App.js fetches weather data from OpenWeather API
3. Current weather is displayed in WeatherDisplay
4. Forecast data is processed and displayed in ForecastDisplay

 Key Features

 1. Expandable Search Bar
- Minimizes to an icon when not in use
- Expands on click for clean UI
- Handles keyboard events (Enter to search, Escape to cancel)

 2. Weather Display
- Shows location, temperature, and conditions
- Displays "feels like" temperature, humidity, and wind speed
- Dynamic weather icons based on conditions

 3. Forecast Display
- Shows weather forecast for the next two days
- Each forecast includes date, weather icon, temperature, and conditions
- Horizontally scrollable on smaller screens

 4. Responsive Design
- Adapts to desktop, tablet, and mobile screen sizes
- Font sizes and spacing adjust based on device width
- Elements maintain readability and aesthetics across devices

 5. Visual Effects
- Glass-morphism design (translucent elements with blur)
- Animated weather icons (floating effect)
- Hover effects on cards for interactive feedback
- Gradient backgrounds and text

 API Integration
The app uses the OpenWeather API to fetch:
1. Current weather data (`/data/2.5/weather` endpoint)
2. 5-day forecast data (`/data/2.5/forecast` endpoint)

The API responses are processed to extract relevant information and format it for display.

 UI/UX Design Elements
- Color Scheme: Purple/blue gradient background with glass-like elements
- Typography: Poppins for content, Orbitron for the app title
- Animations: Fade-in and floating animations for weather icons
- Layout: Centered, card-based design with adequate spacing
- Interactions: Hover effects, expandable search, smooth transitions

 Responsive Breakpoints
- Default: Desktop/laptop (>768px)
- Tablet: 768px and below
- Mobile: 480px and below

Each breakpoint adjusts font sizes, spacing, and element dimensions to maintain usability.

 Security Notes
The OpenWeather API key is currently exposed in the code. In a production environment, this should be managed through environment variables and API proxying.