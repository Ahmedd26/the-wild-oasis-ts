import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICabinBase } from "../../types/cabin.interface";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { queryKeys } from "../../types/queryKey";

export function useEditCabin() {
    const queryClient = useQueryClient();
    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({
            newCabinData,
            id,
        }: {
            newCabinData: ICabinBase & { image: string | File };
            id: number;
        }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin successfully updated");
            queryClient.invalidateQueries({ queryKey: [queryKeys.CABINS] });
        },
        onError: (error: Error) => toast.error(error.message),
    });

    return { editCabin, isEditing };
}
