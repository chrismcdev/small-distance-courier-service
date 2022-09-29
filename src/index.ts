#!/usr/bin/env ts-node
import Ajv from "ajv";
import { readFile } from "fs/promises";
import SmallDistanceCourierService from "./services/small-distance-courier-service";
import { EstimateDeliveryCostInput, EstimateDeliveryTimeInput } from "./types";
import estimateDeliveryCostSchema from "./assets/estimate-delivery-cost-schema.json";
import estimateDeliveryTimeSchema from "./assets/estimate-delivery-time-schema.json";

enum Action {
  GET_DELIVERY_TIME = "delivery-time",
  GET_DELIVERY_COST = "delivery-cost",
}

const ajv = new Ajv();
const [action, filePath] = process.argv.slice(2);

readFile(filePath, { encoding: "utf-8" })
  .then((file) => {
    const data = JSON.parse(file);

    // Estimate Delivery Cost
    if (action === Action.GET_DELIVERY_COST) {
      const validate = ajv.compile<EstimateDeliveryCostInput>(
        estimateDeliveryCostSchema
      );
      if (!validate(data)) {
        return console.error(validate.errors);
      }
      const service = new SmallDistanceCourierService(
        data.baseDeliveryCost,
        data.parcels
      );
      return console.info(service.fetchDeliveryCost());
    }

    // Estimate Delivery Time
    if (action === Action.GET_DELIVERY_TIME) {
      const validate = ajv.compile<EstimateDeliveryTimeInput>(
        estimateDeliveryTimeSchema
      );
      if (!validate(data)) {
        return console.error(validate.errors);
      }
      const service = new SmallDistanceCourierService(
        data.baseDeliveryCost,
        data.parcels
      );
      return console.info(
        service.fetchDeliveryTime(
          data.noOfVehicles,
          data.maxSpeed,
          data.maxCarriableWeight
        )
      );
    }
  })
  .catch((error) => console.error(error));
