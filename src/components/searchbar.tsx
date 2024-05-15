"use client";
import React from "react";

type Props = {};

const Searchbar = (props: Props) => {
  const [searchInput, setSearchInput] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchInput}
      className="bg-transparent border-[1px] border-dark/20 focus:border-dark text-dark rounded-full px-3 py-1 w-2/3 focus:outline-none transition-colors duration-200"
    />
  );
};

export default Searchbar;
