import { ContentCopy, DoNotDisturb, Download, Edit } from "@mui/icons-material";
import React, { useContext } from "react";
import { DropdownItem, MoreOptions } from "../../../../../../shared/components";
import STATUS from "../../../../../../shared/static/emailCampaignStatuses";
import { EmailMarketingContext } from "../../../../EmailMarketing";

export function CampaignActions({
  item,
  onEdit,
  onClone,
  onCancel,
  onOptOutListDownload,
}) {
  const { paused: allPaused } = useContext(EmailMarketingContext);

  const canceled = item.statusId === STATUS.CANCELED;
  const complete = item.statusId === STATUS.COMPLETED;
  return (
    <tr id={`${item.id}secondary`} style={{ paddingBottom: 2 }}>
      <td style={{ width: 24 }}>
        {canceled || complete ? (
          <MoreOptions
            style={{ paddingRight: 12, paddingLeft: 12, marginTop: -4 }}
          >
            <DropdownItem Icon={ContentCopy} text="Clone" onClick={onClone} />
            <DropdownItem
              Icon={Download}
              text="Download opt-out list"
              onClick={onOptOutListDownload}
            />
          </MoreOptions>
        ) : (
          <MoreOptions
            style={{ paddingRight: 12, paddingLeft: 12, marginTop: -4 }}
          >
            <DropdownItem Icon={Edit} text="Edit" onClick={onEdit} />
            <DropdownItem Icon={ContentCopy} text="Clone" onClick={onClone} />
            <DropdownItem
              disabled={allPaused}
              Icon={DoNotDisturb}
              text="Cancel"
              onClick={onCancel}
            />
          </MoreOptions>
        )}
      </td>
    </tr>
  );
}
