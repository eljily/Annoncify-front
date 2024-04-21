import { Category } from "./Category";
import { Image } from "./Image";
import { VendorDetails } from "./VendorDetails";

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    createDate: Date;
    updateDate: Date;
    hit:number;
    images: Image[];
    vendorDetails : VendorDetails;
    category : string;
    adress : string;
    subadress :string;
  }