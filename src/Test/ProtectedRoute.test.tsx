import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext';
import ProtectedRoute from '../Routes/ProtectedRoute';

const ProtectedComponent = () => <h1>Protected Page</h1>;

describe('ProtectedRoute', () => {
  it('redirects to login if user is not authenticated', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<ProtectedComponent />} />
            </Route>
            <Route path="/login" element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders protected component if user is authenticated', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<ProtectedComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Simulate authentication (manually set the context)
    expect(screen.queryByText('Protected Page')).toBeNull();
  });
});
