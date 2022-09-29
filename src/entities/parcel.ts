import { COST_PER_KG, COST_PER_KM } from "../constants";
import SmallDistanceCourierService from "../services/small-distance-courier-service";
import { IParcel } from "../types";

export default class Parcel {
  id: string;
  weight: number;
  distance: number;
  couponCode: string;

  constructor(parcel: IParcel) {
    this.id = parcel.id;
    this.weight = parcel.weight;
    this.distance = parcel.distance;
    this.couponCode = parcel.couponCode;
  }

  getDiscountPercentage({ coupons }: SmallDistanceCourierService) {
    const coupon = coupons.get(this.couponCode);
    return coupon?.isCouponValid({
      weight: this.weight,
      distance: this.distance,
    })
      ? coupon.discount
      : 0;
  }

  getDeliveryCost({ baseDeliveryCost }: SmallDistanceCourierService) {
    return (
      baseDeliveryCost + this.weight * COST_PER_KG + this.distance * COST_PER_KM
    );
  }

  getDeliveryTime(maxSpeed: number) {
    return this.distance / maxSpeed;
  }
}
