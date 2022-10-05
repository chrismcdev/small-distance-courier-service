import { chance } from "jest-chance";
import { loadParcelsIntoShipments } from ".";
import Parcel from "../entities/parcel";
import SmallDistanceCourierService from "../small-distance-courier-service";

describe("Helpers", () => {
  let service: SmallDistanceCourierService = new SmallDistanceCourierService(
    chance.integer({ min: 0 }),
    []
  );
  let parcels: Parcel[] = Array(50).fill(
    new Parcel(service, {
      id: chance.syllable(),
      distance: chance.integer({ min: 0 }),
      weight: chance.integer({ min: 0 }),
      couponCode: chance.syllable(),
    })
  );

  describe("loadParcelsIntoShipments", () => {
    it(`returns shipments where the remaining weight on a shipment is larger than the proceeding shipments`, () => {
      const maxWeight = chance.integer({ min: 0 });
      loadParcelsIntoShipments(parcels, maxWeight).reduce<number | null>(
        (lastRemainingWeight, { weight }) => {
          const remainingWeight = maxWeight - weight;
          expect(weight).toBeLessThanOrEqual(maxWeight);
          if (lastRemainingWeight) {
            expect(remainingWeight).toBeLessThanOrEqual(lastRemainingWeight);
          }
          return remainingWeight;
        },
        null
      );
    });
  });
});
