import React from "react";
import { useStackNavigation } from "../../../../hooks";
import { Website, WebsiteReview } from "./components";

export function WebsiteStack({
  goNext,
  goBack,
  page,
  pageCount,
  setModalLoading,
}) {
  const { Component } = useStackNavigation([Website, WebsiteReview]);
  return (
    <Component
      goParentNext={goNext}
      goParentBack={goBack}
      parentPage={page}
      parentPageCount={pageCount}
      setModalLoading={setModalLoading}
    />
  );
}
