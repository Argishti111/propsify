import { Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { ListItem } from "../../../../../../../../shared/components";
import { prepareHOAInformation } from "../../../../../../../../shared/factories";

export function HOAInformation({ data }) {
  const [list] = useMemo(() => {
    return prepareHOAInformation(data);
  }, [data]);
  return (
    <section id="hoa">
      <Typography mb={2} variant="h6" fontStyle="italic">
        HOA information
      </Typography>

      <Typography color="red" mb={1}>
        {" "}
        Not found
      </Typography>

      <Grid mb={10} display="flex" flexWrap="wrap">
        <ul className="list">
          {list.map((item) => (
            <ListItem key={item.name}>
              <Typography variant="subtitle2" fontStyle="italic">
                {item.name}
              </Typography>
              <Typography
                variant="subtitle2"
                textAlign="end"
                fontStyle="italic"
              >
                {item.value}
              </Typography>
            </ListItem>
          ))}
        </ul>
      </Grid>
    </section>
  );
}
