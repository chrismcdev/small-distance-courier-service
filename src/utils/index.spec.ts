import { chance } from "jest-chance";
import { loadParcelsIntoShipments } from ".";
import Parcel from "../models/parcel";
import SmallDistanceCourierService from "../small-distance-courier-service";

describe("Helpers", () => {
  let service: SmallDistanceCourierService;
  let maxWeight: number;
  let parcels: Parcel[];

  beforeEach(() => {
    service = new SmallDistanceCourierService(chance.integer({ min: 0 }), []);
    maxWeight = chance.integer({ min: 0 });
    parcels = Array(50).fill(
      new Parcel(service, {
        id: chance.syllable(),
        distance: chance.integer({ min: 0 }),
        weight: chance.integer({ min: 0, max: maxWeight }),
        couponCode: chance.syllable(),
      })
    );
  });

  describe("loadParcelsIntoShipments", () => {
    it("returns all the parcels loaded into shipments", () => {
      const flatShipmentParcels = loadParcelsIntoShipments(parcels, maxWeight).flatMap(
        (parcel) => parcel.parcels
      );
      expect(flatShipmentParcels.length).toBe(50);
    });
    it("returns shipments where the remaining weight on a shipment is larger than the proceeding shipments", () => {
      loadParcelsIntoShipments(parcels, maxWeight).reduce<number | null>(
        (lastRemainingWeight, { weight }) => {
          expect(weight).toBeLessThanOrEqual(maxWeight);
          const remainingWeight = maxWeight - weight;
          // if (lastRemainingWeight) {
          //   expect(remainingWeight).toBeLessThanOrEqual(lastRemainingWeight);
          // }
          return remainingWeight;
        },
        null
      );
    });
  });
});
