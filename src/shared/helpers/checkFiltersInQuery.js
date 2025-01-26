export function checkFiltersInQuery(query, setFilter) {
  const periodId = query.get("periodId");
  if (periodId && periodId !== "null") {
    setFilter("selectedPeriod", {
      id: periodId,
      name: query.get("periodName"),
    });
  }
  const statusId = query.get("statusId");
  if (statusId && statusId !== "null") {
    setFilter("selectedStatus", {
      id: statusId,
      name: query.get("statusName"),
    });
  }
}
