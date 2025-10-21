"use client";

import { useState } from "react";
import css from "./SearchBox.module.css";

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search notes...",
}: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className={css.input}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
