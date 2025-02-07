/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/naming-convention */
// src/components/SearchBar.tsx
import React from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SearchBarProps } from "../../Interface/interface";
import SafeContent from "../../SafeContent";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const safeLabel = t("Search"); // Translated text that may contain HTML
  return (
    <TextField
      variant="outlined"
      label={<SafeContent content={safeLabel} />}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;