import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// LOCAL CUSTOM COMPONENTS
import SearchResult from "./components/search-result";
import CategoryDropdown from "./components/category-dropdown";
// LOCAL CUSTOM HOOKS
import useSearch from "./hooks/use-search";
// CUSTOM ICON COMPONENT
import Search from "icons/Search";
import useSales from "pages-sections/sales/use-sales";
import { ChangeEventHandler } from "react";

interface SearchProps {
  handleSearch: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleStatus: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  status: string;
  sortStatus: string;
  handleSortStatus: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function SearchInputWithCategory(props: SearchProps) {
  const {
    categoryTitle,
    parentRef,
    resultList,
    handleCategoryChange,
    handleChangeStateTitle,
    stateTitle,
    sortTitle,
    handleSortChange,
    stateSortTitle,
    handleChangeStateSortTitle
  } = useSearch();

  const { handleSearch, handleStatus, status, handleSortStatus, sortStatus } =
    props;

  const INPUT_PROPS = {
    sx: {
      border: 0,
      height: 44,
      padding: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
    },
    endAdornment: (
      <>
        <CategoryDropdown
          title={categoryTitle}
          handleChange={handleCategoryChange}
          stateTitle={stateTitle}
          handleChangeStateTitle={handleChangeStateTitle}
          handleStatus={handleStatus}
          status={status}
          type={"stanje"}
        />
        <CategoryDropdown
          title={sortTitle}
          handleChange={handleSortChange}
          stateTitle={stateSortTitle}
          handleChangeStateTitle={handleChangeStateSortTitle}
          handleStatus={handleSortStatus}
          status={sortStatus}
          type={"sortiranje"}
        />
      </>
    ),
  };

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      <TextField
        fullWidth
        color="success"
        variant="outlined"
        placeholder="Pretraga..."
        onChange={handleSearch}
        InputProps={INPUT_PROPS}
      />

      {/* SHOW SEARCH RESULT LIST */}
      {resultList.length > 0 ? <SearchResult results={resultList} /> : null}
    </Box>
  );
}
