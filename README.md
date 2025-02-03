# NASA Space Explorer

An interactive web application that provides real-time access to NASA's space data, including the Astronomy Picture of the Day (APOD) and Near Earth Objects (NEO) tracking.

## Features

- **Astronomy Picture of the Day (APOD)**

  - View NASA's daily featured space photograph
  - Read detailed explanations from astronomers
  - Browse historical APOD entries

- **Near Earth Objects (NEO) Tracking**
  - Monitor asteroids passing near Earth
  - View detailed information about each NEO
  - Save interesting objects to favorites
  - Track orbital data and hazard assessments

## Technologies Used

- React 18
- TypeScript
- MobX for state management
- Axios for API calls
- Jest & React Testing Library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- NASA API key (obtain from [NASA API Portal](https://api.nasa.gov/))

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file and add your NASA API key:

```bash
REACT_APP_NASA_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
yarn start
```

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Create production build
- `yarn test` - Run test suite
- `yarn test:coverage` - Generate test coverage report

## Project Structure

```
src/
├── components/
│   ├── APOD/
│   ├── NEO/
│   └── common/
├── stores/
├── types/
├── utils/
└── App.tsx
```

## Testing

Run the test suite:

```bash
yarn test
```

Generate coverage report:

```bash
yarn test:coverage
```

## Testing Exercise

### Overview

This exercise focuses on writing comprehensive tests for the NASA Space Explorer application. You'll be creating tests for various components and the store using Jest and React Testing Library.

### Objectives

1.  Write tests for the following components:

    - `APODSection.tsx`
    - `NEOCard.tsx`
    - `api.ts`
    - `NasaStore.ts`
    - Main `App.tsx` component

    Bonus:

         - `LoadingSpinner.tsx`
         - `ErrorMessage.tsx`
         - `NEOSection.tsx`
         - `NasaStore.ts`

### Requirements

#### Component Tests

For each component, create tests that cover:

- Rendering
- User interactions
- Props validation
- Error states
- Loading states

Example test structure for a component:

```typescript
describe('ComponentName', () => {
  it('renders correctly with required props', () => {
    // Test implementation
  });

  it('handles user interactions properly', () => {
    // Test implementation
  });

  it('displays error state when error occurs', () => {
    // Test implementation
  });
});
```

#### Store Tests

For the NASA Store, create tests that verify:

- API calls
- State updates
- Error handling
- Data transformations

2. Run the test suite in watch mode:

```bash
yarn test
```

3. Check test coverage:

```bash
yarn test:coverage
```

### Testing Tasks

1. **Basic Component Testing**

   - Create snapshot tests
   - Test component rendering
   - Verify prop passing

2. **Interactive Testing**

   - Test button clicks
   - Test favorite toggling
   - Test error handling

3. **Store Testing**

   - Test API integration
   - Test state management
   - Test error scenarios

4. **Integration Testing**
   - Test component interactions
   - Test data flow
   - Test store integration

```

### Success Criteria

- All components have test coverage = 100
- All major user interactions are tested
- Store functionality is thoroughly tested
- Integration tests cover main user flows
- All tests pass successfully

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NASA APIs for providing space data
- All contributors who participate in this project

## Contact

Project Link: [repository-url]
```
