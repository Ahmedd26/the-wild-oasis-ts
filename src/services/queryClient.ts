import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000, // 1 minute (sec * ms)
            staleTime: 0,
        },
    },
});

export default queryClient;
