import React, { useCallback, useState } from "react";
import { cloneCampaign } from "../../../../../../services";
import { MoreOptions } from "../../../../../../shared/components";
import {
  getFormatedDate,
  toLocalDatetime,
} from "../../../../../../shared/helpers";

export function Draft({ item, onEdit, onDelete, onClone }) {
  const [cloning, setCloning] = useState(false);
  const [cloned, setCloned] = useState(false);

  // const handleClone = useCallback((e) => {
  //   e.preventDefault();
  //   setCloning(true);
  //   cloneCampaign(item.id)
  //     .then((data) => {
  //       if (data.success) {
  //         setCloned(true);
  //         setTimeout(() => {
  //           setCloned(false);
  //           onClone({ ...item, id: data.data.id });
  //         }, 500);
  //       }
  //     })
  //     .finally(() => {
  //       setCloning(false);
  //     });
  // }, []);

  return (
    <>
      {cloned && (
        <tr className="campaign-clone">
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
          <td style={{ marginLeft: 2 }}>{item.recipients}</td>

          <td>{item.price >= 1 ? `$${item.price}` : `${item.price}¢`}</td>
          <td>
            {item.budget
              ? item.budget >= 1
                ? `$${item.budget}`
                : `${item.budget}¢`
              : 0}
          </td>
          <td>{getFormatedDate(item.createdDate)}</td>
          <td style={{ width: 50 }}>
            <MoreOptions style={{ paddingRight: 12, paddingLeft: 12 }}>
              <span>Edit</span>
              <span>Delete</span>
              {/* <a href="#">Clone</a> */}
            </MoreOptions>
          </td>
        </tr>
      )}
      <tr key={item.id}>
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
        <td style={{ width: 50 }}>
          <MoreOptions style={{ paddingRight: 12, paddingLeft: 12 }}>
            {cloning ? null : (
              <>
                <span onClick={onEdit(item)}>Edit</span>
                <span onClick={() => onDelete(item)}>Delete</span>
                {/* <a onClick={handleClone} href="#">
                  Clone
                </a> */}
              </>
            )}
          </MoreOptions>
        </td>
      </tr>
    </>
  );
}
