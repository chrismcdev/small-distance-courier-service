import { ConditionMap, ICoupon } from "../types";

export default class Coupon {
  id: string;
  discount: number;
  conditions: ConditionMap;

  constructor(coupon: ICoupon) {
    this.id = coupon.id;
    this.discount = coupon.discount;
    this.conditions = coupon.conditions;
  }

  isCouponValid(conditionValues: { [conditionName: string]: number }) {
    return Object.entries(this.conditions).every(
      ([conditionName, [min, max]]) => {
        const value = conditionValues[conditionName];
        return value >= min && value <= max;
      }
    );
  }
}
