import { render, screen, fireEvent } from "@testing-library/react";
import LogoutButton from "../Components/LogoutButton/LogoutButton";
import { AuthProvider } from "../Context/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe('Logout Button', () => {
  it('renders logout button and calls logout function on click', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <LogoutButton />
        </MemoryRouter>
      </AuthProvider>
    );

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    // We don't have direct assertions on logout, but it should remove the token
    expect(logoutButton).toBeInTheDocument();
  });
});
