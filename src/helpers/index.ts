import Parcel from "../entities/parcel";
import { Shipment } from "../types";

/**
 * Truncates number to two decimal places, the number will not be rounded.
 * @example
 * // returns 3.45
 * truncateNumber(3.456);
 * @param value Number to be truncated.
 * @returns Truncated number.
 */
export const truncateNumber = (value: number) => Math.trunc(value * 100) / 100;

/**
 * When processing a parcel, scan the previous shipments in order and place the parcel in the first shipment that fits. Start a new shipment only if it does not fit in any of the existing shipments.
 * @complexity O(n^2)
 * @param parcels parcels sorted by weight in descending order.
 * @param maxWeight maximum weight a single shipment can carry.
 * @returns parcels packed into shipments.
 * @see {@link https://en.wikipedia.org/wiki/First-fit-decreasing_bin_packing}
 */
export const packParcelsIntoShipments = (
  parcels: Parcel[],
  maxWeight: number
): Shipment[] => {
  let shipments: Shipment[] = [];
  let remainingShipmentWeights: number[] = Array(parcels.length).fill(0);

  parcels
    .sort(({ weight: a }, { weight: b }) => {
      // Sort parcels into decreasing weight order.
      return b - a;
    })
    .forEach((parcel) => {
      // Find the first shipment that can accommodate the parcel.
      const isNotLoaded = shipments.every((shipment, shipmentId) => {
        if (remainingShipmentWeights[shipmentId] >= parcel.weight) {
          remainingShipmentWeights[shipmentId] -= parcel.weight;
          // Add parcel to existing shipment.
          shipment.parcels.push(parcel);
          shipment.weight += parcel.weight;
          if (parcel.distance > shipment.distance) {
            shipment.distance = parcel.distance;
          }
          return false;
        }
        return true;
      });
      // Create a new shipment to accommodate the parcel.
      if (isNotLoaded) {
        remainingShipmentWeights[shipments.length] = maxWeight - parcel.weight;
        // Add parcel to new shipment.
        shipments.push({
          parcels: [parcel],
          weight: parcel.weight,
          distance: parcel.distance,
        });
      }
    });

  return shipments.sort((a, b) => {
    // If the weights are also the same, preference should be given to the shipment which can be delivered first.
    return b.weight - a.weight || b.distance - a.distance;
  });
};
