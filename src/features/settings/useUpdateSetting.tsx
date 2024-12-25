import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryKeys } from "../../types/queryKey";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting updated successfully");
            queryClient.invalidateQueries({ queryKey: [queryKeys.SETTINGS] });
        },
        onError: (error: Error) => toast.error(error.message),
    });

    return { updateSetting, isUpdating };
}
