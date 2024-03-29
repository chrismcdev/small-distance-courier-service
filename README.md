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
Usage: kiki <action> <file>
```

## Features

### Delivery Cost Estimation with Offers

Estimate the total delivery cost of each package with an offer code (if applicable).

**Example:**

```bash
kiki delivery-cost ./src/__mocks__/fetch-delivery-cost-input.json
```

### Delivery Time Estimation

Calculates the estimated delivery time for every package by maximizing number of packages in every shipment.

**Example:**

```bash
kiki delivery-time ./src/__mocks__/fetch-delivery-time-input.json
```

## Decisions

### JSON Schema Validation

The input file is validated with [JSON Schema](https://json-schema.org/specification.html) specific to each feature, schemas can be [found here](./src/assets/).

### Facade Structural Design Pattern

The facade [`SmallDistanceCourierService`](./src/services/small-distance-courier-service.ts) has two sub-systems [`Parcel`](./src/entities/parcel.ts) and [`Coupon`](./src/entities/coupon.ts) that are instantiated within the facade. This facade manages the full lifecycle of the objects it uses.

### First-fit-decreasing Bin Packing Algorithm

The [FFD algorithm](https://en.wikipedia.org/wiki/First-fit-decreasing_bin_packing) is used to decide how many shipments are needed and what parcels to load in each shipment based on weight.

---
