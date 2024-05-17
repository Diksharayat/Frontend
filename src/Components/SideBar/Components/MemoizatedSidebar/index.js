import { Box, Grid } from "@mui/material";
import React, { memo } from "react";

export function MemoizatedSidebar({ title }) {
  return (
    <Box>
      <Grid>{title}</Grid>
    </Box>
  );
}

export const SideBarMemoizated = memo(MemoizatedSidebar);

