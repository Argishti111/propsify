import { AttachMoney, Event, History, Sell } from "@mui/icons-material";
import { formatExpDate, numberWithCommas } from "../helpers";

export function preparePropertyOverview(data) {
  return [
    [
      { name: "Parcel number", value: data.parcel_number ?? "-" },
      { name: "Property type", value: data.property_type ?? "-" },
      { name: "Property use", value: data.property_use ?? "-" },
      { name: "Owner type", value: data.owner_type ?? "-" },
      { name: "Owner status", value: data.owner_status ?? "-" },
    ],
    numberWithCommas(data.lot_size),
    numberWithCommas(data.building_sq_ft),
  ];
}

export function preparePropertyValue(data) {
  return [
    {
      name: "Last 30-day change",
      Icon: History,
      value: data.estimated_value_mm
        ? "$" + numberWithCommas(data.estimated_value_mm)
        : "-",
      change: data.estimated_value_mm_percent,
    },
    [
      {
        name: "Last sale date",
        Icon: Event,
        value: data.last_sale_date
          ? new Date(data.last_sale_date).toLocaleDateString()
          : "-",
      },
      {
        name: "Est. value per sq. ft",
        Icon: AttachMoney,
        value: "$" + data.estimated_value_per_sqft ?? "-",
      },
      {
        name: "Last sale price",
        Icon: Sell,
        value: data.last_sale_price
          ? "$" + numberWithCommas(data.last_sale_price)
          : "-",
      },
    ],
    data.estimated_value ? "$" + numberWithCommas(data.estimated_value) : "-",
    data.estimated_min_value
      ? "$" + numberWithCommas(data.estimated_min_value)
      : "-",
    data.estimated_max_value
      ? "$" + numberWithCommas(data.estimated_max_value)
      : "-",
    data.valuation_date
      ? new Date(data.valuation_date)
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")
      : "-",
    data.predicted_direction,
  ];
}

export function prepareOwnershipInformation(data) {
  return [
    [
      { name: "Owner 1 name", value: data.owner1_name },
      { name: "Owner 2 name", value: data.owner2_name },
      { name: "Owner 3 name", value: data.owner3_name },
      { name: "Owner 4 name", value: data.owner4_name },
      {
        name: "Contact address",
        value: data.contact_address,
      },
    ].filter((item) => item.value),
  ];
}
export function preparePropertyCharacteristics(data) {
  return [
    [
      { name: "Number of buildings", value: data.buildings_count ?? "-" },
      { name: "Number of units", value: data.units_count ?? "-" },
      { name: "Construction type", value: data.construction ?? "-" },
      { name: "Pool", value: data.pool ?? "-" },
      {
        name: "Number of rooms",
        value: data.rooms_count ?? "-",
      },
      { name: "Beds", value: data.bedrooms_count ?? "-" },
      { name: "Baths", value: data.bath_count ?? "-" },
    ],
    [
      { name: "Heating", value: data.heating ?? "-" },
      { name: "Cooling", value: data.cooling ?? "-" },
      { name: "Number of stories", value: data.stories_count ?? "-" },
      {
        name: "Living area sq. ft",
        value: numberWithCommas(data.living_area_sq_ft),
      },
      {
        name: "Finished area sq. ft",
        value: numberWithCommas(data.finished_area_sq_ft),
      },
      {
        name: "Total area sq. ft",
        value: numberWithCommas(data.total_area_sq_ft),
      },
      {
        name: "Gross area sq. ft (all structures)",
        value: numberWithCommas(data.gross_area_sq_ft),
      },
    ],
  ];
}

export function prepareLocationInformation(data) {
  return [
    [
      { name: "APN", value: data.parcel_number ?? "-" },
      { name: "Situs county", value: data.situs_county ?? "-" },
      {
        name: "Minor civil division name",
        value: data.minor_civil_division_name ?? "-",
      },
      { name: "Census tract", value: data.census_tract ?? "-" },
      { name: "Subdivision name", value: data.subdivision_name ?? "-" },
      { name: "Legal tract number", value: data.legal_tract_number ?? "-" },
      { name: "Legal block number", value: data.legal_block_number ?? "-" },
      { name: "Legal lot number", value: data.legal_lot_number ?? "-" },
      { name: "Property type", value: data.property_type ?? "-" },
      { name: "Property use", value: data.property_use ?? "-" },
      { name: "Zoning", value: data.zoning },
      { name: "County land use code", value: data.county_land_use_code ?? "-" },
      { name: "Lot width", value: numberWithCommas(data.lot_width) },
      { name: "Lot depth", value: numberWithCommas(data.lot_depth) },
      {
        name: "Lot size",
        value: data.lot_size
          ? numberWithCommas(data.lot_size) + " sq. ft"
          : "-",
      },
      {
        name: "Legal description",
        value: data.legal_description ?? "-",
      },
    ],
  ];
}

export function prepareHOAInformation(data) {
  return [
    [
      { name: "HOA type", value: "Home Owner Association" },
      { name: "HOA fee", value: "$1,000" },
      { name: "HOA fee frequency", value: "Annual" },
      { name: "HOA name", value: "N/A" },
      { name: "HOA contact", value: "N/A" },
      { name: "HOA contact type", value: "N/A" },
      { name: "HOA contact information", value: "N/A" },
    ],
  ];
}
