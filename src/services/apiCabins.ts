import supabase from "./supabase";

// Get All Cabins
export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be retrieved");
    }
    return data;
}