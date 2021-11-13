import style from "./search.module.scss";
import { useState } from "react";

export const SearchBar = ({onChange}) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    // sending value to parent element
    onChange(e.target.value);
  };
  return (
    <div className={style.searchBar}>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search tokens"
        className={style.searchBar__input}
      />
    </div>
  );
};
