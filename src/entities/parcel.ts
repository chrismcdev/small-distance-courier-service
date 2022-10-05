import SmallDistanceCourierService from "../small-distance-courier-service";
import { truncateNumber } from "../helpers";
import { IParcel } from "../types";
import { COST_PER_KG, COST_PER_KM } from "../constants";

/**
 * Class representing a parcel.
 */
export default class Parcel {
  private readonly context: SmallDistanceCourierService;
  public id: string;
  public weight: number;
  public distance: number;
  public couponCode: string;

  /**
   * Create a parcel.
   * @param context The parent service that instantiated this object.
   * @param parcel Parcel values.
   */
  constructor(context: SmallDistanceCourierService, parcel: IParcel) {
    this.context = context;
    this.id = parcel.id;
    this.weight = parcel.weight;
    this.distance = parcel.distance;
    this.couponCode = parcel.couponCode;
  }

  /**
   * The discount percentage of the coupon, if the coupon was provided and valid.
   */
  private get discountPercentage() {
    const coupon = this.context.coupons.get(this.couponCode);
    return coupon?.isCouponValid({
      weight: this.weight,
      distance: this.distance,
    })
      ? coupon.discount
      : 0;
  }

  /**
   * The delivery amount of the parcel excluding discount.
   */
  private get deliveryCost() {
    return (
      this.context.baseDeliveryCost +
      this.weight * COST_PER_KG +
      this.distance * COST_PER_KM
    );
  }

  /**
   * The discount amount.
   */
  public get discount() {
    return truncateNumber(this.deliveryCost * this.discountPercentage);
  }

  /**
   * The total delivery amount.
   */
  public get totalDeliveryCost() {
    return truncateNumber(
      this.deliveryCost - this.deliveryCost * this.discountPercentage
    );
  }
}
