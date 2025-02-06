/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/naming-convention */
// src/components/EditModal.tsx
import React, { useState, useEffect } from "react";
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from "@mui/material";
import { Employee, EditModalProps } from "../../Interface/interface";

const EditModal: React.FC<EditModalProps> = ({
  open, onClose, employee, onSave
}) => {
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(employee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedEmployee) {
      const { name, value } = e.target;
      setEditedEmployee({
        ...editedEmployee,
        [name as keyof Employee]: value,
      });
    }
  };

  useEffect(() => {
    setEditedEmployee(employee);
  }, [employee]);

  const handleSubmit = () => {
    if (editedEmployee) {
      onSave(editedEmployee);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        {editedEmployee && (
        <>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={editedEmployee.name}
            onChange={handleChange}
          />
          <TextField
            label="Department"
            fullWidth
            margin="normal"
            name="department"
            value={editedEmployee.department}
            onChange={handleChange}
          />
          <TextField
            label="Localnr"
            fullWidth
            margin="normal"
            name="localnr"
            value={editedEmployee.localnr}
            onChange={handleChange}
          />
          <TextField
            label="Landline"
            fullWidth
            margin="normal"
            name="landline"
            value={editedEmployee.landline}
            onChange={handleChange}
          />
          <TextField
            label="Mobile"
            fullWidth
            margin="normal"
            name="mobile"
            value={editedEmployee.mobile}
            onChange={handleChange}
          />
        </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;