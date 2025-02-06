import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TableSortLabel, Box, FormControlLabel, Switch } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Employee } from "../../Interface/interface";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { t } from "msw/lib/glossary-de6278a9";
function EmployeeTable() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof Employee | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        fetch("/api/employees")
          .then((res) => res.json())
          .then((data) => setEmployees(data));
      }, []);

    const handleSort = (column: keyof Employee) => {
        const isAsc = sortColumn === column && sortOrder === "asc";
        setSortColumn(column);
        setSortOrder(isAsc ? "desc" : "asc");

        const sortedData = [...employees].sort((a, b) => {
            return isAsc
            ? String(a[column]).localeCompare(String(b[column]))
            : String(b[column]).localeCompare(String(a[column]));
        });
        setEmployees(sortedData);
    }
    const handleToggleTheme = () => {
      setDarkMode(!darkMode);
    };
  
    const theme = createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    });
    return (

      <ThemeProvider theme={theme}>
      <Box sx={{ padding: 2 }}>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleToggleTheme} />}
          label="Multi changes"
        />
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {["name", "department", "localnr", "landline", "mobile"].map((col) => (
              <TableCell key={col}>
                <TableSortLabel
                  active={sortColumn === col}
                  direction={sortColumn === col ? sortOrder : "asc"}
                  onClick={() => handleSort(col as keyof Employee)}
                  IconComponent={sortColumn === col ? (sortOrder === "asc" ? ArrowUpward : ArrowDownward) : undefined}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.localnr}</TableCell>
              <TableCell>{emp.landline}</TableCell>
              <TableCell>{emp.mobile}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </ThemeProvider>
    );
}
   
export default EmployeeTable;