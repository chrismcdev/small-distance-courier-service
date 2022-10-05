import Parcel from "../entities/parcel";
import Shipment from "../entities/shipment";

/**
 * Truncates number to two decimal places, the number will not be rounded.
 * @example
 * // returns 3.45
 * truncateNumber(3.456);
 * @param x Number to be truncated.
 * @returns Truncated number.
 */
export const truncateNumber = (x: number) => Math.trunc(x * 100) / 100;

/**
 * When processing a parcel, scan the previous shipments in order and place the parcel in the first shipment that fits. Start a new shipment only if it does not fit in any of the existing shipments.
 * @complexity O(n^2)
 * @param parcels Unsorted parcels.
 * @param maxWeight Maximum weight a single shipment can hold.
 * @returns Shipments with parcels loaded.
 * @see {@link https://en.wikipedia.org/wiki/First-fit-decreasing_bin_packing}
 */
export const loadParcelsIntoShipments = (
  parcels: Parcel[],
  maxWeight: number
): Shipment[] => {
  let shipments: Shipment[] = [];
  let shipmentRemainingWeights: number[] = Array(parcels.length).fill(0);

  parcels
    .sort((a, b) => b.weight - a.weight)
    .forEach((parcel) => {
      // Find the first shipment that can accommodate the parcel.
      const isNotLoaded = shipments.every((shipment, shipmentId) => {
        if (shipmentRemainingWeights[shipmentId] >= parcel.weight) {
          shipmentRemainingWeights[shipmentId] -= parcel.weight;
          shipment.addParcel(parcel);
          return false;
        }
        return true;
      });
      // Create a new shipment to accommodate the parcel.
      if (isNotLoaded) {
        shipmentRemainingWeights[shipments.length] = maxWeight - parcel.weight;
        shipments.push(new Shipment().addParcel(parcel));
      }
    });

  // If the weights are also the same, preference should be given to the shipment which can be delivered first.
  return shipments.sort((a, b) => b.weight - a.weight || b.distance - a.distance);
};
