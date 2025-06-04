# REMWaste Challenge

This is the REMWaste Challenge app, built with React, TypeScript, and Vite.

## Overview

The app displays skip hire data fetched from the following API:
```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

### Data Structure

The API returns data of the following shape:

```typescript
interface ISkipData {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost?: number;
  per_tonne_cost?: number;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}
```

### Features

- **SkipItem Component**  
  Displays the size, hire period, and image of a skip.  
  Includes two buttons:  
  - Select skip  
  - Show additional information  

- **SkipItems Container**  
  Holds all SkipItem components and uses Tailwind CSS responsive classes for a fully responsive layout.

- **Filter Component**  
  Provides input fields for filtering the skip data.  
  Uses a custom `useFilter` hook which manages filters and returns a filtered data array.  
  Input validation is implemented to ensure correct filter criteria.

- **Accessibility Improvements**  
  All components have been enhanced with proper ARIA attributes for better accessibility (thanks to Claude's suggestions).

- **Code Quality**  
  The app heavily uses custom hooks to keep components maintainable and clean.


### Technology Stack

- **React**
- **Typescript**
- **Vite**
- **TailwindCSS**

## Development & Thought Process

### Initial Setup
Started the project with Vite using React and TypeScript for fast builds and type safety.

### API Data Modeling
Reviewed the API response structure and created a TypeScript interface (`ISkipData`) to strictly type the data.

### Component Design
- Built a `SkipItem` component to display core skip information (size, hire period, image).  
- Added two interactive buttons to select a skip or reveal more info.

### Layout and Responsiveness
Grouped all skip items into a container component, applying Tailwind’s responsive classes to ensure it adapts well across devices.

### Filtering
- Created a `Filter` component with form inputs that allow users to narrow down the skip options.  
- Developed a custom `useFilter` hook that manages the filter logic and validation, providing a clean separation of concerns.

### Accessibility
Invited Claude review components for accessibility improvements, adding ARIA attributes and other necessary enhancements.

### Refactoring & Code Maintenance
Refactored the codebase to rely heavily on custom hooks, improving reusability and maintainability of the components.
