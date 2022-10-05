import SmallDistanceCourierService from "./small-distance-courier-service";
import deliveryCostInput from "./__mocks__/fetch-delivery-cost-input.json";
import deliveryTimeInput from "./__mocks__/fetch-delivery-time-input.json";

describe("SmallDistanceCourierService", () => {
  let instance: SmallDistanceCourierService;

  describe("fetchDeliveryCost", () => {
    const { baseDeliveryCost, parcels } = deliveryCostInput;
    instance = new SmallDistanceCourierService(baseDeliveryCost, parcels);

    it("returns the correct delivery cost for each parcel", () => {
      expect(instance.fetchDeliveryCost()).toMatchSnapshot();
    });
  });

  describe("fetchDeliveryTime", () => {
    const { baseDeliveryCost, noOfVehicles, maxSpeed, maxCarriableWeight, parcels } =
      deliveryTimeInput;
    instance = new SmallDistanceCourierService(baseDeliveryCost, parcels);

    it("returns the correct delivery time for each parcel", () => {
      expect(
        instance.fetchDeliveryTime(noOfVehicles, maxSpeed, maxCarriableWeight)
      ).toMatchSnapshot();
    });
  });
});
