import { Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { ListItem } from "../../../../../../../../shared/components";
import { prepareOwnershipInformation } from "../../../../../../../../shared/factories";

export function OwnershipInformation({ data }) {
  const [list] = useMemo(() => prepareOwnershipInformation(data), [data]);
  return (
    <section id="ownership">
      <Typography mb={2} variant="h6" fontStyle="italic">
        Ownership Information
      </Typography>

      <Grid mb={10} display="flex" flexWrap="wrap">
        <ul className="list">
          {list.map((item) => (
            <ListItem key={item.name}>
              <Typography variant="subtitle2" fontStyle="italic">
                {item.name}
              </Typography>
              <Typography variant="subtitle2" textAlign="end" fontWeight="400">
                {item.value}
              </Typography>
            </ListItem>
          ))}
        </ul>
      </Grid>
    </section>
  );
}
