// routes.ts
export const routes = {
    DASHBOARD: "/dashboard" as const,
    BOOKINGS: "bookings" as const,
    BOOKING: (bookingId: string | number) => `${bookingId}` as const,
    CHECKIN: "checkin" as const,
    CABINS: "cabins" as const,
    USERS: "users" as const,
    SETTINGS: "settings" as const,
    ACCOUNT: "account" as const,
    LOGIN: "login" as const,
    NOT_FOUND: "*" as const,
};

/*

APP: {
        ROOT: "" as const,
        CITIES: "" as const,
        CITy: (id: string | number) => `id}` as const,
        COUNTRIES: "" as const,
        FORM: "" as const,
    },

*/
