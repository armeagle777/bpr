import { useState } from "react";
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import SearchBody from "../components/search/SearchBody";
import SearchPageSkileton from "../components/searchPageSkileton/SearchPageSkileton";
import SearchInput from "../components/search/SearchInput";
import { usePersons } from "../components/context/persons";
import PersonNotFound from "../components/notFound/PersonNotFound";
import { createSearchParamsObject } from "../utils/helperFunctions";
import SearchHeader from "../components/search/SearchHeader";

const Search = () => {
  const {
    persons,
    isInitialLoading,
    setSearchParams,
    searchParams,
    currentPage,
    changePage,
    totalCount,
    isError,
    error,
  } = usePersons();

  if (isInitialLoading) {
    return <SearchPageSkileton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error.message}</MuiAlert>;
  }

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
          pt: 2,
        }}
      >
        <SearchHeader
          changePage={changePage}
          setSearchParams={setSearchParams}
        />
      </Stack>
      {!persons ? null : persons?.length === 0 ? (
        <PersonNotFound />
      ) : (
        <SearchBody
          persons={persons}
          currentPage={currentPage}
          changePage={changePage}
          totalCount={totalCount}
        />
      )}
    </>
  );
};

export default Search;
