import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpandableSearch = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="place-self-end h-full flex items-center text-white">
      {isSearchVisible && (
        <input
          ref={searchInputRef}
          className="text-black rounded-2xl h-8 w-30 p-2 mr-4 focus:outline-none"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Press Enter to search
        />
      )}
      <SearchIcon
        fontSize="large"
        sx={{ cursor: "pointer", margin: "auto" }}
        onClick={handleSearchIconClick}
      />
    </div>
  );
};

export default ExpandableSearch;
