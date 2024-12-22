import { ICabin, ICabinRes } from "../types/cabin.interface";
import { queryKeys } from "../types/queryKey";
import supabase from "./supabase";

// Get All Cabins
export async function getCabins() {
    const { data, error } = await supabase.from(queryKeys.CABINS).select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be retrieved");
    }
    return data;
}

export async function createCabin(newCabin: ICabin) {
    // const { data, error }: { data: ICabinRes[] | null, error: Error | null } = await supabase.from("cabins").insert([newCabin]);
    const { data, error } = await supabase
        .from(queryKeys.CABINS)
        .insert([newCabin]);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    return data;
}

export async function deleteCabin(cabinId: number) {
    const { data, error } = await supabase
        .from(queryKeys.CABINS)
        .delete()
        .eq("id", cabinId);
    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
    return data;
}
