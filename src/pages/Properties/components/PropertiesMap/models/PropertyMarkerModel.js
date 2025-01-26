import { numberWithCommas } from "../../../../../shared/helpers";

export class PropertyMarkerModel {
  static buildContent(property) {
    const content = document.createElement("div");

    content.classList.add("property");
    content.innerHTML = `
        <div
            id="property${property.entityid}"
            class="clustered-map-marker-container"
        >
            <div class="clustered-map-marker">
                <span class="clustered-map-marker-point"></span>
                <p style="margin-left:4px;  font-family:Lora; font-size:12px; font-style:italic; font-weight:500">
                ${property.estimated_value}
                </p>
            </div>
            <div class="clustered-map-marker-data-container">
                <div class="clustered-map-marker-data">
                    <p  style="font-family:Lora;font-size:0.938rem;font-style:italic;font-weight:500" >${
                      property.estimated_value
                    }</p>
                    <p style="font-family:Lora;font-size:12px;font-style:italic;font-weight:500">
                        ${property.bedrooms_count} bd, ${
      property.bath_count
    } ba, ${numberWithCommas(property.building_sq_ft)} sq.
                        ft
                    </p>
                </div>
            </div>
        </div>
          `;
    return content;
  }
}
