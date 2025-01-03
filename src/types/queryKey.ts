export const queryKeys = {
    CABINS: "cabins",
    BOOKINGS: "bookings",
    USERS: "users",
    SETTINGS: "settings",
} as const;

export type QueryKeys = (typeof queryKeys)[keyof typeof queryKeys];
