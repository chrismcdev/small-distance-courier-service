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

export interface DeliveryCostPayload {
  baseDeliveryCost: number;
  parcels: IParcel[];
}

export interface DeliveryTimePayload extends DeliveryCostPayload {
  noOfVehicles: number;
  maxSpeed: number;
  maxCarriableWeight: number;
}

export interface DispatchedParcel {
  id: string;
  discount: number;
  totalDeliveryCost: number;
  estimatedDeliveryTimeInHours?: number;
}

export enum Action {
  ESTIMATE_DELIVERY_TIME = "delivery-time",
  ESTIMATE_DELIVERY_COST = "delivery-cost",
}
