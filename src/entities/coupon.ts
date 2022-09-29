import { ConditionMap, ICoupon } from "../types";

/**
 * Class representing a coupon.
 */
export default class Coupon {
  id: string;
  discount: number;
  conditions: ConditionMap;

  /**
   * Create a coupon.
   * @param coupon Coupon values.
   */
  constructor(coupon: ICoupon) {
    this.id = coupon.id;
    this.discount = coupon.discount;
    this.conditions = coupon.conditions;
  }

  /**
   * Checks if the coupon is valid for the provided conditions.
   * @param conditionValues The condition key value pairs to validate.
   * @returns True if the coupon is valid.
   */
  isCouponValid(conditionValues: { [conditionName: string]: number }): boolean {
    return Object.entries(this.conditions).every(
      ([conditionName, [min, max]]) => {
        const value = conditionValues[conditionName];
        return value >= min && value <= max;
      }
    );
  }
}
