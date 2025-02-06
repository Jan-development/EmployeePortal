import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../Context/AuthContext';
import { ReactNode } from 'react';

const TestComponent = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

describe('AuthContext', () => {
  it('should provide authentication state and methods', () => {
    let contextValue: any;

    const TestConsumer = () => {
      contextValue = useAuth();
      return null;
    };

    render(
      <TestComponent>
        <TestConsumer />
      </TestComponent>
    );

    expect(contextValue.isAuthenticated).toBe(false);

    act(() => {
      contextValue.login('admin', 'password');
    });

    expect(contextValue.isAuthenticated).toBe(true);

    act(() => {
      contextValue.logout();
    });

    expect(contextValue.isAuthenticated).toBe(false);
  });
});
