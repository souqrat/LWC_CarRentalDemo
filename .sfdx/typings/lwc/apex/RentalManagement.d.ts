declare module "@salesforce/apex/RentalManagement.getAllCars" {
  export default function getAllCars(): Promise<any>;
}
declare module "@salesforce/apex/RentalManagement.getAvailableCars" {
  export default function getAvailableCars(param: {carType: any, minPrice: any, maxPrice: any}): Promise<any>;
}
