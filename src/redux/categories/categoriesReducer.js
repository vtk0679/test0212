import { createReducer } from "@reduxjs/toolkit";
import fetchCategories from "./categoriesOperations";

const categoryReducer = createReducer([], {
  [fetchCategories.fulfilled]: (_, action) => action.payload.categories,
});

export default categoryReducer;
