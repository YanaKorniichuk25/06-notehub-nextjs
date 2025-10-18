"use client";
import { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: Props) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}
