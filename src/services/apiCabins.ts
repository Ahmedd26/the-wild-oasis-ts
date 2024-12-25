import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { ICabinBase, ICabinRes } from "../types/cabin.interface";
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

export async function createEditCabin(
    newCabin: ICabinBase & { image: string | File },
    id?: number
) {
    const imageName =
        newCabin.image instanceof File
            ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
            : newCabin.image.replace(
                  `${supabaseUrl}/storage/v1/object/public/cabin-images/`,
                  ""
              );

    const imagePath =
        typeof newCabin.image === "string"
            ? newCabin.image
            : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // A) Create
    let response;
    if (!id)
        response = await supabase
            .from(queryKeys.CABINS)
            .insert([{ ...newCabin, image: imagePath }])
            .select()
            .single<ICabinRes>();
    // B) Edit
    if (id)
        response = await supabase
            .from(queryKeys.CABINS)
            .update({ ...newCabin, image: imagePath })
            .eq("id", id)
            .select()
            .single<ICabinRes>();

    const { data, error } = response as PostgrestSingleResponse<ICabinRes>;

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }
    if (typeof newCabin.image === "string") return data;

    if (newCabin.image instanceof File) {
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
