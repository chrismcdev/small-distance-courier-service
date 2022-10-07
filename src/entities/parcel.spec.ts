import { chance } from "jest-chance";
import { COUPONS } from "../constants";
import SmallDistanceCourierService from "../small-distance-courier-service";
import Parcel from "./parcel";

describe("Parcel", () => {
  let service: SmallDistanceCourierService;
  let instance: Parcel;

  beforeEach(() => {
    service = new SmallDistanceCourierService(chance.integer({ min: 0 }), []);
    instance = new Parcel(service, {
      id: chance.syllable(),
      distance: chance.integer(),
      weight: chance.integer(),
      couponCode: chance.syllable(),
    });
  });

  describe("discountPercentage", () => {
    COUPONS.forEach(({ id, discount, conditions: { distance, weight } }) => {
      it(`returns correct discount percentage for ${id} coupon`, () => {
        instance.distance = chance.integer({
          min: distance[0],
          max: distance[1],
        });
        instance.weight = chance.integer({ min: weight[0], max: weight[1] });
        instance.couponCode = id;
        expect(Reflect.get(instance, "discountPercentage")).toBe(discount);
      });
    });
  });
});
