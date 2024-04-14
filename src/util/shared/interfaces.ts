export interface IpInfo {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
}

export interface Strike extends IpInfo {
  client: string;
  createdAt: Date;
}

export interface Meta {
  name: string;
  property: string;
  content: string;
}
