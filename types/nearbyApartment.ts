import { Apartment } from "./apartment";

export interface NearbyApartment extends Apartment {
  distance: number;
  walkingTime: number;
  bikeTime: number;
}