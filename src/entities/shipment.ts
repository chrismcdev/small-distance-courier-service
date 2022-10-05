import Parcel from "./parcel";

/**
 * Class representing a shipment.
 */
export default class Shipment {
  public readonly parcels: Parcel[];

  /**
   * Create a shipment.
   */
  constructor(parcels: Parcel[] = []) {
    this.parcels = parcels;
  }

  /**
   * Adds a parcel to the shipment.
   * @param parcel The parcel to add.
   * @returns The instance on which this method was called.
   */
  addParcel(parcel: Parcel): Shipment {
    this.parcels.push(parcel);
    return this;
  }

  /**
   * The total weight of the shipment.
   */
  get weight(): number {
    return this.parcels.reduce<number>((weight, parcel) => weight + parcel.weight, 0);
  }

  /**
   * The distance of the furthest parcel.
   */
  get distance(): number {
    return this.parcels.reduce<number>(
      (distance, parcel) => (parcel.distance > distance ? parcel.distance : distance),
      0
    );
  }
}
