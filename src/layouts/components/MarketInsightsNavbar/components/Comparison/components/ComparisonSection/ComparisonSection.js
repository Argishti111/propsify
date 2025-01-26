import React from "react";
import { ComparisonSubHeader, ComparisonItem } from "..";

/**
 * Combaining all items in one section
 * @param {string} title title of the section for exampe Overview
 * @param {Array} items array of items [ { id: 6, name: median_days_on_market }]
 * @default []
 * @param {number} dataLength used for adding empty columns
 * @returns Component
 */

export const ComparisonSection = ({ title, items = [], data }) => {
  return (
    <>
      <ComparisonSubHeader title={title} items={data} />
      {items.map((item) => (
        <ComparisonItem key={item.id} item={item} />
      ))}
    </>
  );
};
