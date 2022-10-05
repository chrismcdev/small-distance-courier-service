import Coupon from "./entities/coupon";
import Parcel from "./entities/parcel";
import { DispatchedParcel, IParcel } from "./types";
import { loadParcelsIntoShipments, truncateNumber } from "./helpers";
import { COUPONS } from "./constants";

/**
 * Class representing the small distance courier service.
 */
export default class SmallDistanceCourierService {
  public baseDeliveryCost: number;
  public coupons: Map<string, Coupon>;
  public parcels: Array<Parcel>;

  /**
   * Create the small distance courier service.
   * @param baseDeliveryCost Base delivery cost on all parcels to be dispatched.
   * @param parcels Parcels to be dispatched.
   */
  constructor(baseDeliveryCost: number, parcels: IParcel[]) {
    this.baseDeliveryCost = baseDeliveryCost;
    this.coupons = new Map(COUPONS.map((coupon) => [coupon.id, new Coupon(coupon)]));
    this.parcels = parcels.map((parcel) => new Parcel(this, parcel));
  }

  /**
   * Fetch the total delivery cost of each package with an offer code (if applicable).
   * @returns Dispatched parcels.
   */
  public fetchDeliveryCost(): DispatchedParcel[] {
    return this.parcels.map(({ id, discount, totalDeliveryCost }) => ({
      id,
      discount,
      totalDeliveryCost,
    }));
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

    return loadParcelsIntoShipments(this.parcels, maxWeight).flatMap((shipment) => {
      // Get vehicle with the lowest uptime.
      const vehicleId = vehicleFleetUptime.indexOf(Math.min(...vehicleFleetUptime));

      // Get shipment parcels and calculate delivery time of each parcel.
      const parcels = shipment.parcels.map(
        ({ id, discount, totalDeliveryCost, distance }) => ({
          id,
          discount,
          totalDeliveryCost,
          estimatedDeliveryTimeInHours: truncateNumber(
            vehicleFleetUptime[vehicleId] + distance / maxSpeed
          ),
        })
      );

      // Add estimated return time of shipment to overall vehicle uptime.
      const estimatedReturnTimeInHours = 2 * truncateNumber(shipment.distance / maxSpeed);
      vehicleFleetUptime[vehicleId] += estimatedReturnTimeInHours;

      return parcels;
    });
  }
}
