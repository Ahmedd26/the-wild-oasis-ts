import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { queryKeys } from "../../types/queryKey";
import { ICabinBase } from "../../types/cabin.interface";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: (newCabinData: ICabinBase & { image: string | File }) =>
            createEditCabin(newCabinData),
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: [queryKeys.CABINS] });
        },
        onError: (error: Error) => toast.error(error.message),
    });
    return { createCabin, isCreating };
}
