export interface ISettingsBase {
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
}

export interface ISettings extends ISettingsBase {
    id: number;
    created_at: string;
}
type SettingsKeys = keyof ISettingsBase;
export type SingleSetting = { [K in SettingsKeys]?: ISettingsBase[K] };
