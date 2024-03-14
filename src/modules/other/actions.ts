import { createAction } from "@reduxjs/toolkit";

export const setReloadChildBudget = createAction<boolean>(
  "other/SET_RELOAD_CHILD_BUDGET"
);
export const setRefetchMyChildren = createAction<boolean>(
  "other/SET_REFETCH_MY_CHILDREN"
);
export const setRefetchChildData = createAction<boolean>(
  "other/SET_REFETCH_CHILD_DATA"
);
