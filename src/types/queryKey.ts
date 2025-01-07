export const queryKeys = {
    CABINS: "cabins",
    BOOKINGS: "bookings",
    BOOKING: "booking",
    USERS: "users",
    USER: "user",
    GUESTS: "guests",
    SETTINGS: "settings",
} as const;

export type QueryKeys = (typeof queryKeys)[keyof typeof queryKeys];
