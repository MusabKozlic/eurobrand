import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// LOCAL CUSTOM HOOKS
import useSearch from "./hooks/use-search";
// LOCAL CUSTOM COMPONENT
import SearchResult from "./components/search-result";
// STYLED COMPONENT
import { SearchOutlinedIcon } from "./styles";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import Product from "models/Product.model";

export default function SearchInput() {
  const { handleSearch, parentRef } = useSearch();
  const [resultList, setResultList] = useState<string[]>();
  const url =
  process.env.NODE_ENV === "production"
    ? "https://www.eurobrand.ba/api"
    : "http://localhost:8080";

  const INPUT_PROPS = {
    sx: {
      border: 0,
      height: 44,
      paddingRight: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": { border: 0 }
    },
    endAdornment: (
      <Button
        color="primary"
        disableElevation
        variant="contained"
        sx={{ px: "3rem", height: "100%", borderRadius: "0 4px 4px 0" }}>
        Pretraga
      </Button>
    ),
    startAdornment: <SearchOutlinedIcon fontSize="small" />
  };

  const fetchProductsByCategory = async (search: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axios.get(`${url}/products/byCategory`, {
        params: {
          category: "",
          search: search.target.value,
          status: ""
        },
      });
      setResultList(response.data.map(item => {item.name}));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" {...{ ref: parentRef }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Pretraga..."
        onChange={fetchProductsByCategory}
        InputProps={INPUT_PROPS}
      />

      {/* SHOW SEARCH RESULT LIST */}
      {resultList?.length > 0 ? <SearchResult results={resultList} /> : null}
    </Box>
  );
}
