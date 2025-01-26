import { Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { ListItem } from "../../../../../../../../shared/components";
import { preparePropertyValue } from "../../../../../../../../shared/factories";
import { PropertyValueData, PropertyValueDataSmall } from "./components";

export function PropertyValue({ data }) {
  const [
    last_30_day_change,
    list,
    estimated_value,
    estimated_min_value,
    estimated_max_value,
    valuation_date,
    predicted_direction,
  ] = useMemo(() => {
    return preparePropertyValue(data);
  }, [data]);

  let lesser = last_30_day_change.change < 0;
  return (
    <section id="value">
      <Typography mb={2} variant="h6" fontStyle="italic">
        Property value
      </Typography>

      <Grid mb={10} display="flex" flexWrap="wrap">
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <PropertyValueData
            estimated_min_value={estimated_min_value}
            estimated_max_value={estimated_max_value}
            estimated_value={estimated_value}
            valuation_date={valuation_date}
            predicted_direction={predicted_direction}
          />
          <PropertyValueDataSmall
            estimated_min_value={estimated_min_value}
            estimated_max_value={estimated_max_value}
            estimated_value={estimated_value}
            valuation_date={valuation_date}
            predicted_direction={predicted_direction}
          />
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
            <ListItem
              style={{ paddingLeft: 16, paddingRight: 16 }}
              white
              key={last_30_day_change.name}
            >
              <Typography
                display="flex"
                alignItems="center"
                variant="subtitle2"
                fontStyle="italic"
                pr={3}
              >
                <last_30_day_change.Icon
                  sx={{ mr: 2 }}
                  fontSize="small"
                  htmlColor="#BEB082"
                />
                {last_30_day_change.name}
              </Typography>
              <Typography
                textAlign="end"
                variant="h6"
                fontStyle="italic"
                display="flex"
                alignItems="center"
              >
                {last_30_day_change.value}{" "}
                <Typography
                  variant="p"
                  fontSize="0.938rem"
                  ml={1}
                  py={0}
                  className={`card-percent ${
                    !last_30_day_change.change
                      ? ""
                      : lesser
                      ? "card-percent-minus"
                      : "card-percent-plus"
                  }`}
                >
                  {lesser || !last_30_day_change.change ? "" : "+"}
                  {last_30_day_change.change
                    ? last_30_day_change.change + "%"
                    : "-"}
                </Typography>
              </Typography>
            </ListItem>
            {list.map((item) => (
              <ListItem
                style={{ paddingLeft: 16, paddingRight: 16 }}
                white
                key={item.name}
              >
                <Typography
                  display="flex"
                  alignItems="center"
                  variant="subtitle2"
                  fontStyle="italic"
                  pr={3}
                >
                  <item.Icon
                    sx={{ mr: 2 }}
                    fontSize="small"
                    htmlColor="#BEB082"
                  />
                  {item.name}
                </Typography>
                <Typography textAlign="end" variant="h6" fontStyle="italic">
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
