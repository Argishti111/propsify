import { ContentCopy } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { cancelPrintCampaign, cloneCampaign } from "../../../../../../services";
import { MoreOptions } from "../../../../../../shared/components";
import {
  getFormatedDate,
  toLocalDatetime,
} from "../../../../../../shared/helpers";
import "./Campaign.css";

export function Campaign({
  item,
  onStatusClick = () => {},
  onEdit,
  onClone,
  onCancel,
  timer,
}) {
  const [cloning, setCloning] = useState(false);
  const handleClone = useCallback((e) => {
    e.preventDefault();
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
        <td
          onClick={() => {
            if (item.status !== "Canceled") {
              onStatusClick(item);
            }
          }}
        >
          <Box display="flex" flexDirection="column">
            {item.status}
            {item.status !== "Canceled" && item.canBeCanceled - timer > 0 && (
              <Typography fontSize={12} fontWeight="500" fontStyle="italic">
                Cancel within {item.canBeCanceled - timer} minutes
              </Typography>
            )}
          </Box>
        </td>
        <td style={{ marginLeft: 2 }}>{item.recipients}</td>
        <td>{item.price >= 1 ? `$${item.price}` : `${item.price}¢`}</td>
        <td>
          {item.budget
            ? item.budget >= 1
              ? `$${item.budget}`
              : `${item.budget}¢`
            : 0}
        </td>
        <td>{getFormatedDate(toLocalDatetime(item.createdDate))}</td>
        <td>{getFormatedDate(item.deliveryWeek)}</td>
        <td style={{ width: 50 }}>
          {item.canBeCanceled - timer > 0 ? (
            <MoreOptions style={{ paddingRight: 12, paddingLeft: 12 }}>
              {cloning ? null : (
                <>
                  <span onClick={onEdit}>Edit</span>
                  {item.status !== "Canceled" && (
                    <span onClick={onCancel}>Cancel</span>
                  )}
                  <span onClick={handleClone}>Clone</span>
                </>
              )}
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
