# EmployeePortal
public website used for managing big enterprise customers. A customer can have a lot of employees. An employee can have the basic information as shown.

## Features
- Login with following credentials username: admin, password: password
- Displays employee information including "Name", "Department", "Localnr", "Landline", "Mobile".
- Table with sorting on columns, filtering and frontend pagination..
- Side panel Component (Reusable for editing users).
- Search Bar.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/Jan-development/EmployeePortal.git
    cd EmployeePortal
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Development Setup

To run the widget locally for development purposes, use the following command:

```bash
npm start
```
## Testing
To run tests and ensure everything is working correctly:

bash
Copy
npm run test
For local testing without coverage:

```bash
npm run test-local
```
To run tests with coverage:
```bash
npm run test --coverage
```
## Linting
To lint the project files, use:
```bash
npm run lint
```
This will check for any linting issues across the source code.
## Dependencies

Here are the key dependencies used in this widget:

- **@mui/material**: For UI components .
- **@mui/icons-material**: Provides icons.
- **axios**: For making API calls to experience APIs.
- **html-react-parser**: For parsing HTML into React components.
- **moment**: For date-time manipulations.
- **react**: Core library for building UI components.
- **react-dom**: For rendering React components.
- **react-loading-skeleton**: For loading skeletons to improve UI performance.
- **typescript**: TypeScript for type safety.

## Scripts
- **start**: Run the local development server.
- **build**: Build the widget for production.
- **test-local**: Run tests without coverage.
- **test**: Run tests with coverage.
- **eject**: Eject the configuration.
- **audit:ci**: Run a security audit.
- **audit:report**: Generate an audit report.
- **lint**: Lint the source code.
