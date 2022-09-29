import Coupon from "../entities/coupon";
import Parcel from "../entities/parcel";
import { DispatchedParcel, IParcel } from "../types";
import { packParcelsIntoShipments, truncateNumber } from "../helpers";
import { COUPONS } from "../constants";

export default class SmallDistanceCourierService {
  public baseDeliveryCost: number;
  public parcels: Map<string, Parcel>;
  public coupons: Map<string, Coupon>;

  /**
   *
   * @param baseDeliveryCost
   * @param parcels
   */
  constructor(baseDeliveryCost: number, parcels: IParcel[]) {
    this.baseDeliveryCost = baseDeliveryCost;
    this.parcels = new Map(
      parcels.map((parcel) => [parcel.id, new Parcel(parcel)])
    );
    this.coupons = new Map(
      COUPONS.map((coupon) => [coupon.id, new Coupon(coupon)])
    );
  }

  private get parcelValues(): Parcel[] {
    return Array.from(this.parcels.values());
  }

  /**
   * Fetch the total delivery cost of each package with an offer code (if applicable).
   * @returns Dispatched parcels.
   */
  public fetchDeliveryCost(): DispatchedParcel[] {
    return this.parcelValues.map((parcel) => {
      const deliveryCost = parcel.getDeliveryCost(this);
      const discountPercentage: number = parcel.getDiscountPercentage(this);

      return {
        id: parcel.id,
        discount: truncateNumber(deliveryCost * discountPercentage),
        totalDeliveryCost: truncateNumber(
          deliveryCost - deliveryCost * discountPercentage
        ),
      };
    });
  }

  /**
   * Fetch the estimated delivery time for every parcel by maximizing number of packages packed into each shipment.
   * @param maxVehicles Maximum number of dispatched vehicles at a single time.
   * @param maxSpeed  Maximum vehicle speed in kilometers.
   * @param maxWeight Maximum weight a vehicle can carry in kilograms.
   * @returns Dispatched parcels.
   */
  public fetchDeliveryTime(
    maxVehicles: number,
    maxSpeed: number,
    maxWeight: number
  ): DispatchedParcel[] {
    let vehicleFleetUptime: number[] = new Array(maxVehicles).fill(0);

    return packParcelsIntoShipments(this.parcelValues, maxWeight).flatMap(
      (shipment) => {
        // Select vehicle with the lowest uptime.
        const vehicleId = vehicleFleetUptime.indexOf(
          Math.min(...vehicleFleetUptime)
        );

        const parcels = shipment.parcels.map((parcel) => {
          const deliveryCost: number = parcel.getDeliveryCost(this);
          const discountPercentage: number = parcel.getDiscountPercentage(this);
          const duration: number = parcel.getDeliveryTime(maxSpeed);

          return {
            id: parcel.id,
            discount: truncateNumber(deliveryCost * discountPercentage),
            totalDeliveryCost: truncateNumber(
              deliveryCost - deliveryCost * discountPercentage
            ),
            estimatedDeliveryTimeInHours: truncateNumber(
              vehicleFleetUptime[vehicleId] + duration
            ),
          };
        });

        // Add estimated return time of shipment to overall vehicle uptime.
        const estimatedReturnTimeInHours =
          2 * truncateNumber(shipment.distance / maxSpeed);
        vehicleFleetUptime[vehicleId] += estimatedReturnTimeInHours;

        return parcels;
      }
    );
  }
}
