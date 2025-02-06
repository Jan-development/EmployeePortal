import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Pages/Login';
import { AuthProvider } from '../Context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('allows user to enter credentials and login', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Ensure no error message is shown
    expect(screen.queryByText(/invalid username or password/i)).not.toBeInTheDocument();
  });
});
