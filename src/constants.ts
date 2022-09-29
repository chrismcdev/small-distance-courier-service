import { ICoupon } from "./types";

export const COST_PER_KG = 10;
export const COST_PER_KM = 5;
export const COUPONS: ICoupon[] = [
  {
    id: "OFR001",
    discount: 0.1,
    conditions: {
      distance: [0, 200],
      weight: [70, 200],
    },
  },
  {
    id: "OFR002",
    discount: 0.07,
    conditions: {
      distance: [50, 150],
      weight: [100, 250],
    },
  },
  {
    id: "OFR003",
    discount: 0.05,
    conditions: {
      distance: [50, 250],
      weight: [10, 150],
    },
  },
];
