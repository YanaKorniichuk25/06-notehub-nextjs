"use client";

import { useState } from "react";
import css from "./SearchBox.module.css";

export interface SearchBoxProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  onChange,
  placeholder = "Search notes...",
}: SearchBoxProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    onChange(v);
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
