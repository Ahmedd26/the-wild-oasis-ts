export interface ICabin {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: File;
    description: string;
}
export interface ICabinRes extends ICabin {
    id: number;
    created_at: string;
}

type ErrorType = { type: string; message: string };
export type CabinValidationError = Record<keyof ICabin, ErrorType>;
