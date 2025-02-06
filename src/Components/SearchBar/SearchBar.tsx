/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/naming-convention */
// src/components/SearchBar.tsx
import React from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SearchBarProps } from "../../Interface/interface";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <TextField
      variant="outlined"
      label={t("Search")}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;