import {
  ArrowBack,
  ArrowDropDown,
  ArrowUpward,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDigitalCampaignField } from "../../../../../../../redux";
import { Info, TinyButton } from "../../../../../../components";
import { Input } from "../../../../../../components/Form";
import { IdeaManager } from "../IdeaManager";

export function Headlines({ headlines }) {
  const { headline1, headline2, headline3 } = useSelector(
    (state) => state.digitalMarketing.campaign
  );
  const dispatch = useDispatch();
  const [showIdeas, setShowIdeas] = useState(false);

  const handleChange = useCallback((key) => {
    return (e) => {
      if (e.target.value.length < 31) {
        dispatch(changeDigitalCampaignField(key, e.target.value));
      }
    };
  });
  const headlineCount = useMemo(() => {
    return +!!headline1 + !!headline2 + !!headline3;
  }, [headline1, headline2, headline3]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Grid display="flex">
          <Typography display="inline" variant="body1" color="#192231CC">
            Headlines {headlineCount}/3{" "}
          </Typography>
          <Info
            style={{ marginTop: 2, marginLeft: 4 }}
            defaultPosition="right"
            value="Enter 3 headlines. Headlines appear at the top of your ad and can be up to 30 characters"
          />
        </Grid>
        {!showIdeas && (
          <TinyButton onClick={() => setShowIdeas(true)}>VIEW IDEAS</TinyButton>
        )}
      </Box>
      <Box display="flex" flexDirection="column">
        <IdeaManager
          open={showIdeas}
          fieldNames={["headline1", "headline2", "headline3"]}
          fieldValues={[headline1, headline2, headline3]}
          data={headlines}
          onClose={() => setShowIdeas(false)}
          handleChange={handleChange}
        />
      </Box>
      <Box width="100%" mt={2} display="flex" flexDirection="column">
        <Input
          value={headline1}
          onChange={handleChange("headline1")}
          label="Headline 1"
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
          {headline1 ? headline1.length : 0}/30
        </Typography>
        <Input
          value={headline2}
          onChange={handleChange("headline2")}
          label="Headline 2"
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
          {headline2 ? headline2.length : 0}/30
        </Typography>
        <Input
          value={headline3}
          onChange={handleChange("headline3")}
          label="Headline 3"
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
          {headline3 ? headline3.length : 0}/30
        </Typography>
      </Box>
    </Box>
  );
}
