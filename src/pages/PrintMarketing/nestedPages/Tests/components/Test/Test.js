import { ContentCopy } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { cloneCampaign } from "../../../../../../services";
import { MoreOptions, TinyButton } from "../../../../../../shared/components";
import {
  getFormatedDate,
  toLocalDatetime,
} from "../../../../../../shared/helpers";

export function Test({ item, onEdit, onClone, onFinlize, onCancel, timer }) {
  const [cloning, setCloning] = useState(false);

  const handleClone = useCallback(() => {
    setCloning(true);
    cloneCampaign(item.id)
      .then((res) => {
        if (res.success) {
          setTimeout(() => {
            onClone({ ...item, id: res.data.id });
          }, 500);
        }
      })
      .finally(() => {
        setCloning(false);
      });
  }, []);

  return (
    <>
      <tr>
        <td style={{ width: 100 }}>
          <embed
            style={{ marginLeft: 8 }}
            alt=""
            src={item.frontArtwork}
            height={44}
            width={64}
          />
        </td>
        <td>{item.name}</td>
        <td>
          <Box display="flex" flexDirection="column">
            {item.status}
            {item.status !== "Canceled" && item.canBeCanceled - timer > 0 && (
              <Typography fontSize={12} fontWeight="500" fontStyle="italic">
                Cancel within {item.canBeCanceled - timer} minutes
              </Typography>
            )}
          </Box>
        </td>
        <td>{getFormatedDate(toLocalDatetime(item.createdDate))}</td>
        <td>{getFormatedDate(item.deliveryWeek)}</td>
        <td>
          <TinyButton sx={{ background: "transparent" }} onClick={onFinlize}>
            FINALIZE CAMPAIGN
          </TinyButton>
        </td>
        <td style={{ width: 50 }}>
          {cloning ? null : item.canBeCanceled - timer > 0 ? (
            <MoreOptions style={{ paddingRight: 12, paddingLeft: 12 }}>
              <span onClick={onEdit}>Edit</span>
              {item.status !== "Canceled" && (
                <span onClick={onCancel}>Cancel</span>
              )}
              <span onClick={handleClone}>Clone</span>
            </MoreOptions>
          ) : (
            <IconButton sx={{ marginLeft: 1 }} onClick={handleClone}>
              <ContentCopy fontSize="small" htmlColor="#BEB082" />
            </IconButton>
          )}
        </td>
      </tr>
    </>
  );
}
