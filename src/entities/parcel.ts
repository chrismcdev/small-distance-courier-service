import { COST_PER_KG, COST_PER_KM } from "../constants";
import SmallDistanceCourierService from "../services/small-distance-courier-service";
import { IParcel } from "../types";

/**
 * Class representing a parcel.
 */
export default class Parcel {
  id: string;
  weight: number;
  distance: number;
  couponCode: string;

  /**
   * Create a parcel.
   * @param parcel Parcel values.
   */
  constructor(parcel: IParcel) {
    this.id = parcel.id;
    this.weight = parcel.weight;
    this.distance = parcel.distance;
    this.couponCode = parcel.couponCode;
  }

  /**
   * The discount percentage of the coupon.
   * @param SmallDistanceCourierService The parent service that instantiated this object.
   * @returns The discount percentage if the coupon is provided and valid.
   */
  getDiscountPercentage({ coupons }: SmallDistanceCourierService) {
    const coupon = coupons.get(this.couponCode);
    return coupon?.isCouponValid({
      weight: this.weight,
      distance: this.distance,
    })
      ? coupon.discount
      : 0;
  }

  /**
   * The base delivery cost of the parcel.
   * @param SmallDistanceCourierService The parent service that instantiated this object.
   * @returns The delivery cost excluding discount.
   */
  getDeliveryCost({ baseDeliveryCost }: SmallDistanceCourierService) {
    return (
      baseDeliveryCost + this.weight * COST_PER_KG + this.distance * COST_PER_KM
    );
  }

  /**
   * The base delivery time of the parcel.
   * @param maxSpeed Maximum speed at which the parcel can be delivered.
   * @returns The delivery time in hours.
   */
  getDeliveryTime(maxSpeed: number) {
    return this.distance / maxSpeed;
  }
}
