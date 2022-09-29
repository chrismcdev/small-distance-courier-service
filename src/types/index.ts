import Parcel from "../entities/parcel";

export type ConditionMap = {
  [conditionName: string]: [minValue: number, maxValue: number];
};

export interface ICoupon {
  id: string;
  discount: number;
  conditions: ConditionMap;
}

export interface IParcel {
  id: string;
  weight: number;
  distance: number;
  couponCode: string;
}

export interface Shipment {
  parcels: Parcel[];
  weight: number;
  distance: number;
}

export interface DispatchedParcel {
  id: string;
  discount: number;
  totalDeliveryCost: number;
  estimatedDeliveryTimeInHours?: number;
}

export interface EstimateDeliveryCostInput {
  baseDeliveryCost: number;
  parcels: IParcel[];
}

export interface EstimateDeliveryTimeInput {
  baseDeliveryCost: number;
  parcels: IParcel[];
  noOfVehicles: number;
  maxSpeed: number;
  maxCarriableWeight: number;
}
