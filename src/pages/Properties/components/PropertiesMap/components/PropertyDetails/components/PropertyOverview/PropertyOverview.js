import {
  Bathroom,
  BathroomOutlined,
  Bed,
  CropFree,
  HomeWork,
  InsertInvitation,
  Shower,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { exportPropertyReport } from "../../../../../../../../services";
import {
  CustomButton,
  ListItem,
  ModalLoading,
} from "../../../../../../../../shared/components";
import { preparePropertyOverview } from "../../../../../../../../shared/factories";
import { withExportReport } from "../../../../../../../../shared/higherOrderComponents";
import { PropertyCard } from "./components";

export const PropertyOverview = withExportReport(
  ({ propertyId, openExportReport, data }) => {
    const [list, lot_size, building_sq_ft] = useMemo(
      () => preparePropertyOverview(data),
      [data]
    );

    return (
      <section id="overview">
        <Box display="flex" justifyContent="space-between">
          <Typography
            mb={2}
            ml={{ md: 0, sm: 0, xs: 1 }}
            variant="h6"
            fontStyle="italic"
          >
            Property overview
          </Typography>
          <CustomButton
            onClick={() =>
              openExportReport({
                propertyId,
                entityCity: { id: data.entityid, name: data.property_address },
              })
            }
            sx={{ height: 28, backgroundColor: "#ECD9CC40", px: 4 }}
          >
            EXPORT PDF
          </CustomButton>
        </Box>
        <Grid mb={10} display="flex" flexWrap="wrap">
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box
              mb={1}
              borderRadius={1}
              boxShadow="0px 8px 16px #0000001A;"
              bgcolor="#FEFAF6"
              px={{ md: 4, sm: 4, xs: 2 }}
              py={3}
              minHeight={112}
            >
              <Typography variant="h5" color="#19223199">
                {data.property_address}
              </Typography>
            </Box>
            <ul className="list">
              {list.map((item) => (
                <ListItem white key={item.name}>
                  <Typography variant="subtitle2" fontStyle="italic">
                    {item.name}
                  </Typography>
                  <Typography
                    textAlign="end"
                    variant="subtitle2"
                    fontWeight="400"
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
            xl={3}
            lg={3}
            md={3}
            sm={6}
            xs={6}
            display="inline-flex"
            flexWrap="wrap"
          >
            <PropertyCard
              white
              name="Buildings"
              value={data.buildings_count ?? "-"}
              Icon={HomeWork}
            />
            <PropertyCard
              white
              name="Baths"
              value={data.bath_count ?? "-"}
              Icon={Shower}
            />
            <PropertyCard
              white
              name="Lot size"
              value={lot_size ?? "-"}
              Icon={CropFree}
            />
          </Grid>
          <Grid
            pl={{
              xl: 1,
              lg: 1,
              md: 1,
              sm: 1,
              xs: 1,
            }}
            item
            xl={3}
            lg={3}
            md={3}
            sm={6}
            xs={6}
            display="inline-flex"
            flexWrap="wrap"
          >
            <PropertyCard
              name="Beds"
              value={data.bedrooms_count ?? "-"}
              Icon={Bed}
            />
            <PropertyCard
              name="Building sq. ft"
              value={building_sq_ft}
              Icon={HomeWork}
            />
            <PropertyCard
              name="Year built"
              value={data.year_built ?? "-"}
              Icon={InsertInvitation}
            />
          </Grid>
        </Grid>
      </section>
    );
  },
  false,
  exportPropertyReport
);
