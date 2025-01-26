import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDigitalCampaignField } from "../../../../../../../redux";
import { Info, TinyButton } from "../../../../../../components";
import { Input } from "../../../../../../components/Form";
import { IdeaManager } from "../IdeaManager";

export function Descriptions({ descriptions }) {
  const { description1, description2 } = useSelector(
    (state) => state.digitalMarketing.campaign
  );
  const [showIdeas, setShowIdeas] = useState(false);
  const dispatch = useDispatch();

  const handleChange = useCallback((key) => {
    return (e) => {
      if (e.target.value.length < 91) {
        dispatch(changeDigitalCampaignField(key, e.target.value));
      }
    };
  });

  const descriptionCount = useMemo(() => {
    return +!!description1 + !!description2;
  }, [description1, description2]);

  return (
    <Box mt={2}>
      <Box display="flex" justifyContent="space-between">
        <Grid display="flex">
          <Typography display="inline" variant="body1" color="#192231CC">
            Descriptions {descriptionCount}/2{" "}
          </Typography>
          <Info
            style={{ marginTop: 2, marginLeft: 4 }}
            defaultPosition="right"
            value="Enter 2 descriptions. Your ad's description appears below the display URL and can be up to 90 characters."
          />
        </Grid>
        {!showIdeas && (
          <TinyButton onClick={() => setShowIdeas(true)}>VIEW IDEAS</TinyButton>
        )}
      </Box>
      <Box display="flex" flexDirection="column">
        <IdeaManager
          open={showIdeas}
          fieldNames={["description1", "description2"]}
          fieldValues={[description1, description2]}
          data={descriptions}
          onClose={() => setShowIdeas(false)}
          handleChange={handleChange}
        />
      </Box>
      <Box width="100%" mt={2} display="flex" flexDirection="column">
        <Input
          value={description1}
          onChange={handleChange("description1")}
          label="Description 1"
          required
        />
        <Typography
          variant="p"
          fontSize={12}
          color="#192231CC"
          fontWeight="500"
          fontStyle="italic"
          textAlign="end"
          mb={1}
        >
          {description1 ? description1.length : 0}/90
        </Typography>
        <Input
          value={description2}
          onChange={handleChange("description2")}
          label="Description 2"
          required
        />
        <Typography
          variant="p"
          fontSize={12}
          color="#192231CC"
          fontWeight="500"
          fontStyle="italic"
          textAlign="end"
          mb={1}
        >
          {description2 ? description2.length : 0}/90
        </Typography>
      </Box>
    </Box>
  );
}
