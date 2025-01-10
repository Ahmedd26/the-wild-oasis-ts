export const queryKeys = {
    CABINS: "cabins",
    BOOKINGS: "bookings",
    BOOKING: "booking",
    USERS: "users",
    USER: "user",
    GUESTS: "guests",
    SETTINGS: "settings",
    TODAY_ACTIVITY: "today-activity",
} as const;

export type QueryKeys = (typeof queryKeys)[keyof typeof queryKeys];
