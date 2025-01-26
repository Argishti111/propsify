import { Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { ListItem } from "../../../../../../../../shared/components";
import { prepareLocationInformation } from "../../../../../../../../shared/factories/propertyDetails";

export function LocationInformation({ data }) {
  const [list] = useMemo(() => prepareLocationInformation(data), [data]);
  return (
    <section id="location">
      <Typography mb={2} variant="h6" fontStyle="italic">
        Land/location information
      </Typography>

      <Grid mb={10} display="flex" flexWrap="wrap">
        <ul className="list">
          {list.map((item) => (
            <ListItem key={item.name}>
              <Typography variant="subtitle2" fontStyle="italic">
                {item.name}
              </Typography>
              <Typography variant="subtitle2" fontWeight="400" textAlign="end">
                {item.value}
              </Typography>
            </ListItem>
          ))}
        </ul>
      </Grid>
    </section>
  );
}
