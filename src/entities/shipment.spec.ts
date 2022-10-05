import { chance } from "jest-chance";
import SmallDistanceCourierService from "../small-distance-courier-service";
import Parcel from "./parcel";
import Shipment from "./shipment";

describe("Shipment", () => {
  let service: SmallDistanceCourierService;
  let instance: Shipment;

  beforeEach(() => {
    service = new SmallDistanceCourierService(chance.integer({ min: 0 }), []);
    instance = new Shipment()
      .addParcel(
        new Parcel(service, {
          id: chance.syllable(),
          distance: chance.integer({ min: 0 }),
          weight: chance.integer({ min: 0 }),
          couponCode: chance.syllable(),
        })
      )
      .addParcel(
        new Parcel(service, {
          id: chance.syllable(),
          distance: chance.integer({ min: 0 }),
          weight: chance.integer({ min: 0 }),
          couponCode: chance.syllable(),
        })
      );
  });

  describe("weight", () => {
    it(`returns correct total weight of a shipment`, () => {
      const [parcel1, parcel2] = instance.parcels;
      expect(instance.weight).toBe(parcel1.weight + parcel2.weight);
    });
  });

  describe("distance", () => {
    it("returns the correct distance of the furthest parcel", () => {
      const [parcel1, parcel2] = instance.parcels;
      expect(instance.distance).toBe(Math.max(parcel1.distance, parcel2.distance));
    });
  });
});
