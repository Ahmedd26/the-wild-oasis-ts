export interface IBooking {
    startDate: string;
    endDate: string;
    cabinId: number;
    guestId: number;
    hasBreakfast: boolean;
    observations: string;
    isPaid: boolean;
    numGuests: number;
}
export interface IBookingRes {
    id: bigint;
    created_at: string;
    startDate: string;
    endDate: string;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    isPaid: boolean;
    status: TStatus;
    cabins: {
        name: string;
    };
    guests: {
        fullName: string;
        email: string;
    };
}
export type TStatus = "unconfirmed" | "checked-in" | "checked-out";
