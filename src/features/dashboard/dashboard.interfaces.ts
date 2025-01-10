import { TStatus } from "../../types/booking.interface";

export interface IStay {
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numNights: number;
    numGuests: number;
    cabinPrice: number;
    extrasPrice: number;
    totalPrice: number;
    status: TStatus;
    hasBreakfast: boolean;
    isPaid: boolean;
    observations: string;
    cabinId: number;
    guestId: number;
    guests: {
        fullName: string;
    };
}
export interface IBookingSales {
    created_at: string;
    totalPrice: number;
    extrasPrice: number;
}

export interface IActivity extends Omit<IStay, "guests"> {
    guests: { fullName: string; nationality: string; countryFlag: string };
}
