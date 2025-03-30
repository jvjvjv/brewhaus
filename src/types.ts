export interface INavigationTab {
  name: string;
  icon: string;
  label: string;
}

export type BreweryType =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed";

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IBrewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  description?: string[]; // Added to store a Lorem Ipsum description
  image?: string;
  address_1: string;
  address_2: string;
  address_3: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  state: string;
  street: string;
}

export interface IBreweryQuery {
  page?: number;
  per_page?: number;
  sort?: "asc" | "desc";
  by_city?: string;
  by_country?: string;
  by_dist?: ILocation;
  by_ids?: string[];
  by_name?: string;
  by_state?: string;
  by_postal?: string;
  by_type?: BreweryType;
}

export type BaconIpsum = string[];
