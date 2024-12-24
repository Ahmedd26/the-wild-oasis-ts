import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../types/queryKey";
import { getCabins } from "../../services/apiCabins";
import { type ICabinRes } from "../../types/cabin.interface";

export function useCabins() {
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery<ICabinRes[]>({
        queryKey: [queryKeys.CABINS],
        queryFn: getCabins,
    });
    return { isLoading, cabins, error };
}
