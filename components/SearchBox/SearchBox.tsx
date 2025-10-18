"use client";

import { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchBox({
  onChange,
  placeholder = "Search notes...",
}: Props) {
  return (
    <input
      type="text"
      className={css.input}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
