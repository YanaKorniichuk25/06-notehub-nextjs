import React from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => (
  <input value={value} onChange={(e) => onChange(e.target.value)} />
);

export default SearchBox;
