<h1 align="center">✨ Kiki's Delivery Service CLI ✨</h1>

<p align="center">Below you will find some information on how to setup and perform common tasks.</p>

<img width="33.33%" src="https://static.wikia.nocookie.net/studio-ghibli/images/5/5e/Kiki%27s_Delivery_Service_-_Map.jpg"><img width="33.33%" src="https://static.wikia.nocookie.net/studio-ghibli/images/c/cd/Kiki%27s_Delivery_Service_-_Koriko_Market.jpg"><img width="33.33%" src="https://static.wikia.nocookie.net/studio-ghibli/images/d/df/Kiki%27s_Delivery_Service_-_Risoto.jpg/revision/latest/scale-to-width-down/1000?cb=20200615220447" />

## Installation

Download this repository and install from source.

```bash
git clone https://github.com/chrismcdev/small-distance-courier-service.git
cd small-distance-courier-service
yarn install
yarn link
```

## CLI Usage

```yaml
Usage: small-distance-courier-cli <action> <file>
```

## Features

### Delivery Cost Estimation with Offers

Estimate the total delivery cost of each package with an offer code (if applicable).

**Example:**

```bash
small-distance-courier-cli delivery-cost ./test/__mocks__/fetch-delivery-cost-input.json
```

### Delivery Time Estimation

Calculates the estimated delivery time for every package by maximizing number of packages in every shipment.

**Example:**

```bash
small-distance-courier-cli delivery-time ./test/__mocks__/fetch-delivery-time-input.json
```

## Decisions

### JSON Schema Validation

Validates input file with [JSON Schema](https://json-schema.org/specification.html) specific to each feature, schemas can be [found here](./src/assets/).

### Facade Structural Design Pattern

The facade [`SmallDistanceCourierService`](./src/services/small-distance-courier-service.ts) has two sub-systems [`Parcel`](./src/entities/parcel.ts) and [`Coupon`](./src/entities/coupon.ts) that are instantiated within the facade. This facade manages the full lifecycle of the objects it uses.

---

_© 2021 Everest Engineering. All Rights Reserved. For Internal Use Only._
