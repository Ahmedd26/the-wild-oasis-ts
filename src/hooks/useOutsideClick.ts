import { useEffect, useRef } from "react";

function useOutsideClick<T extends HTMLElement>(
    handler: () => void,
    listenCapturing = true
) {
    const ref = useRef<T>(null);
    useEffect(
        function () {
            function handleClick(e: MouseEvent) {
                if (ref.current && !ref.current.contains(e.target as Node)) {
                    handler();
                }
            }

            document.addEventListener("click", handleClick, listenCapturing);

            return () => document.removeEventListener("click", handleClick);
        },
        [handler, listenCapturing]
    );
    return ref;
}
export default useOutsideClick;
