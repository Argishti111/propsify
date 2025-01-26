import { Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { ListItem } from "../../../../../../../../shared/components";
import { preparePropertyCharacteristics } from "../../../../../../../../shared/factories";

export function PropertyCharacteristics({ data }) {
  const [list, list2] = useMemo(
    () => preparePropertyCharacteristics(data),
    [data]
  );
  return (
    <section id="characteristics">
      <Typography mb={2} variant="h6" fontStyle="italic">
        Property characteristics
      </Typography>

      <Grid mb={10} display="flex" flexWrap="wrap">
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <ul className="list">
            {list.map((item) => (
              <ListItem key={item.name}>
                <Typography variant="subtitle2" fontStyle="italic">
                  {item.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight="400"
                  textAlign="end"
                >
                  {item.value}
                </Typography>
              </ListItem>
            ))}
          </ul>
        </Grid>
        <Grid
          pl={{
            xl: 1,
            lg: 1,
            md: 1,
            sm: 0,
            xs: 0,
          }}
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          display="inline-flex"
          flexWrap="wrap"
        >
          <ul className="list">
            {list2.map((item) => (
              <ListItem key={item.name}>
                <Typography variant="subtitle2" fontStyle="italic">
                  {item.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight="400"
                  textAlign="end"
                >
                  {item.value}
                </Typography>
              </ListItem>
            ))}
          </ul>
        </Grid>
      </Grid>
    </section>
  );
}
