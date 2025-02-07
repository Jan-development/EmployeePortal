import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeTable from "../Components/EmployeeTable/EmployeeTable";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mockEmployees = [
  { id: 1, name: "John Doe", department: "IT", localnr: "123", landline: "111-222", mobile: "999-888" },
  { id: 2, name: "Jane Smith", department: "HR", localnr: "124", landline: "333-444", mobile: "777-666" },
];

const server = setupServer(
    rest.get("/api/employees", (req, res, ctx) => {
    console.log("Mock API called");
    return res(ctx.json(mockEmployees));
    })      
);
beforeEach(() => {
    localStorage.clear();
  });
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("EmployeeTable Component", () => {
  const renderWithTheme = (ui: string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
    return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);
  };

  test("renders table with employee data", async () => {
    renderWithTheme(<EmployeeTable />);

    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("allows sorting by name", async () => {
    renderWithTheme(<EmployeeTable />);
    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());

    const nameHeader = screen.getByText("name");
    fireEvent.click(nameHeader);
    fireEvent.click(nameHeader);
  });

  test("filters employees by department", async () => {
    renderWithTheme(<EmployeeTable />);
    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
    
    const filterDropdown = screen.getByLabelText("Department");
    fireEvent.mouseDown(filterDropdown);
    fireEvent.click(screen.getByText("IT"));
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).toBeNull();
  });

  test("paginates results", async () => {
    renderWithTheme(<EmployeeTable />);
    await waitFor(() => expect(screen.getByText("John Doe")).toBeInTheDocument());
    
    const nextPageButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextPageButton);
  });

  test("deletes an employee", async () => {
    renderWithTheme(<EmployeeTable />);
    
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    }, { timeout: 3000 });
  
    const deleteButton = screen.getByTestId("delete-1");
    fireEvent.click(deleteButton);
  
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });
});