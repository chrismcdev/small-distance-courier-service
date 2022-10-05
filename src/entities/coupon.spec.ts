import { chance } from "jest-chance";
import Coupon from "./coupon";

describe("Coupon", () => {
  let instance: Coupon;

  beforeEach(() => {
    instance = new Coupon({
      id: chance.unique(chance.syllable, 1)[0],
      discount: chance.floating({ min: 0, max: 1 }),
      conditions: {
        distance: [chance.integer({ max: 100 }), chance.integer({ min: 100 })],
        weight: [chance.integer({ max: 100 }), chance.integer({ min: 100 })],
      },
    });
  });

  describe("isCouponValid", () => {
    it("returns true if all the conditions are met", () => {
      const weight = chance.integer({
        min: instance.conditions.weight[0],
        max: instance.conditions.weight[1],
      });
      const distance = chance.integer({
        min: instance.conditions.distance[0],
        max: instance.conditions.distance[1],
      });
      expect(
        instance.isCouponValid({
          weight,
          distance,
        })
      ).toBe(true);
    });

    it("returns false if only one of the conditions are met", () => {
      const weight = chance.integer({
        min: instance.conditions.weight[0],
        max: instance.conditions.weight[1],
      });
      const distance = chance.integer({
        min: instance.conditions.distance[1],
      });
      expect(
        instance.isCouponValid({
          weight,
          distance,
        })
      ).toBe(false);
    });
  });
});
