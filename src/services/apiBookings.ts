import {
    IBookingSales,
    IStay,
} from "../features/dashboard/dashboard.interfaces";
import { IBookingRes } from "../types/booking.interface";
import { queryKeys } from "../types/queryKey";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

interface getBookingsParams {
    filter: {
        field: string;
        value: string;
    } | null;
    sortBy: {
        field: keyof IBookingRes;
        direction: "asc" | "desc";
    };
    page: number;
}

export async function getBookings({ filter, sortBy, page }: getBookingsParams) {
    let query = supabase
        .from(queryKeys.BOOKINGS)
        .select(
            `id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, ${queryKeys.CABINS}(name), ${queryKeys.GUESTS}(fullName, email)`,
            { count: "exact" }
        );

    // Filter
    if (filter) {
        query = query.eq(filter?.field, filter?.value);
    }
    // Sort
    if (sortBy) {
        query = query.order(sortBy.field, {
            ascending: sortBy.direction === "asc",
        });
    }
    // Pagination
    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        query = query.range(from, to);
    }

    const { data, error, count } = await query;
    if (error) {
        console.error(error);
        throw new Error("Bookings could not be retrieved");
    }
    return { data, count };
}

export async function getBooking(id: string) {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, cabins(*), guests(*)")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking not found");
    }

    return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// Date needs to ISOString format for supabase specifications.
export async function getBookingsAfterDate(
    date: string
): Promise<IBookingSales[]> {
    const { data, error } = await supabase
        .from("bookings")
        .select("created_at, totalPrice, extrasPrice")
        .gte("created_at", date)
        .lte("created_at", getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string): Promise<IStay[]> {
    const { data, error } = await supabase
        .from("bookings")
        // .select('*')
        .select("*, guests(fullName)")
        .gte("startDate", date)
        .lte("startDate", getToday());

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(fullName, nationality, countryFlag)")
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
        )
        .order("created_at");

    // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
    // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
    // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }
    return data;
}

interface checkInOutObj {
    status: "checked-in" | "checked-out";
    isPaid?: boolean;
}
export async function updateBooking(id: string, obj: checkInOutObj) {
    const { data, error } = await supabase
        .from("bookings")
        .update(obj)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }
    return data;
}

export async function deleteBooking(id: string) {
    // REMEMBER RLS POLICIES
    const { data, error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    return data;
}
