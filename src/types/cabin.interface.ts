export interface ICabin {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
    description: string;
}
export interface ICabinRes extends ICabin {
    id: number;
    created_at: string;
}
