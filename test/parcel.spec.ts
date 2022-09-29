import { chance } from "jest-chance";
import { COST_PER_KG, COST_PER_KM, COUPONS } from "../src/constants";
import SmallDistanceCourierService from "../src/services/small-distance-courier-service";
import Parcel from "../src/entities/parcel";

describe("Parcel", () => {
  let service: SmallDistanceCourierService;
  let instance: Parcel;

  beforeEach(() => {
    service = new SmallDistanceCourierService(chance.integer({ min: 0 }), []);
    instance = new Parcel({
      id: chance.syllable(),
      distance: chance.integer(),
      weight: chance.integer(),
      couponCode: chance.syllable(),
    });
  });

  describe("getDiscountPercentage", () => {
    COUPONS.forEach(({ id, discount, conditions: { distance, weight } }) => {
      it(`returns correct discount percentage for ${id} coupon`, () => {
        instance.distance = chance.integer({
          min: distance[0],
          max: distance[1],
        });
        instance.weight = chance.integer({ min: weight[0], max: weight[1] });
        instance.couponCode = id;
        expect(instance.getDiscountPercentage(service)).toBe(discount);
      });
    });
  });

  describe("getDeliveryCost", () => {
    it("returns the correct delivery cost for every coupon", () => {
      COUPONS.forEach(({ id }) => {
        instance.couponCode = id;
        expect(instance.getDeliveryCost(service)).toBe(
          service.baseDeliveryCost +
            instance.weight * COST_PER_KG +
            instance.distance * COST_PER_KM
        );
      });
    });
  });

  describe("getDeliveryTime", () => {
    it("returns the correct delivery time", () => {
      const maxSpeed = chance.integer({ min: 0 });
      expect(instance.getDeliveryTime(maxSpeed)).toBe(
        instance.distance / maxSpeed
      );
    });
  });
});
