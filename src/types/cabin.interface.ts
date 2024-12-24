export interface ICabinBase {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
}
export interface ICabin extends ICabinBase {
    image: File;
}
export interface ICabinRes extends ICabinBase {
    id: number;
    image: string;
    created_at: string;
}

type ErrorType = { type: string; message: string };
export type CabinValidationError = Record<keyof ICabin, ErrorType>;
