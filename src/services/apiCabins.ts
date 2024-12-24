import { ICabin, ICabinRes } from "../types/cabin.interface";
import { queryKeys } from "../types/queryKey";
import supabase, { supabaseUrl } from "./supabase";

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
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { data, error } = await supabase
        .from(queryKeys.CABINS)
        .insert([{ ...newCabin, image: imagePath }])
        .single<ICabinRes>();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // 2. Upload image
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error uploading the image
    if (storageError) {
        await supabase.from(queryKeys.CABINS).delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin Image could not be uploaded, and the cabin was not created"
        );
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
