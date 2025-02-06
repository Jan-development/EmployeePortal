import React, { useEffect, useState } from "react";
import {
  Container, Box, Stack, FormControlLabel, Switch, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, IconButton, Select, MenuItem, FormControl, InputLabel, TablePagination
} from "@mui/material";
import {
  ArrowDownward, ArrowUpward, Edit, Delete
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Employee } from "../../Interface/interface";
import EditModal from "../EditModal/EditModal";
import SearchBar from "../SearchBar/SearchBar";

function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Employee | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { t, i18n } = useTranslation();

  const fetchEmployees = async () => {
    const response = await fetch("/api/employees");
    const data: Employee[] = await response.json();
    setEmployees(data);
    localStorage.setItem("employees", JSON.stringify(data));
  };

  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      fetchEmployees();
    }
  }, []);

  const handleSort = (column: keyof Employee) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortColumn(column);
    setSortOrder(isAsc ? "desc" : "asc");

    const sortedData = [...employees].sort((a, b) => (isAsc
      ? String(a[column]).localeCompare(String(b[column]))
      : String(b[column]).localeCompare(String(a[column]))));
    setEmployees(sortedData);
  };
  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenEditModal(true);
  };

  const handleDelete = (employeeId: number) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const handleSave = (updatedEmployee: Employee) => {
    const updatedEmployees = employees.map((employee) => (employee.id === updatedEmployee.id
      ? updatedEmployee : employee));
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEmployees = employees.filter(
    (emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      && (filterDepartment === "" || emp.department === filterDepartment)
  );

  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (

    <ThemeProvider theme={theme}>
      <Container>
        <Box mt={5}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2, md: 4 }}
            alignItems="left"
            justifyContent="flex-start"
          >
            <SearchBar value={searchQuery} onChange={handleSearch} />
            <FormControl>
              <InputLabel>{t("Department")}</InputLabel>
              <Select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <Select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="dk">Danish</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={handleToggleTheme} />}
              label={t("toggle_theme")}
            />
          </Stack>
        </Box>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["Name", "Department", "Localnr", "Landline", "Mobile"].map((col) => (
                  <TableCell key={col}>
                    <TableSortLabel
                      active={sortColumn === col}
                      direction={sortColumn === col ? sortOrder : "asc"}
                      onClick={() => handleSort(col as keyof Employee)}
                      // eslint-disable-next-line no-nested-ternary
                      IconComponent={sortColumn === col ? (sortOrder === "asc" ? ArrowUpward : ArrowDownward) : undefined}
                    >
                      {t(col)}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.localnr}</TableCell>
                  <TableCell>{emp.landline}</TableCell>
                  <TableCell>{emp.mobile}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(emp)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(emp.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Edit Modal */}
          <EditModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            employee={selectedEmployee}
            onSave={handleSave}
          />
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default EmployeeTable;