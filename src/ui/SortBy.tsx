import { useSearchParams } from "react-router-dom";
import Select from "./Select";

type valueType =
    | "name-asc"
    | "name-desc"
    | "regularPrice-asc"
    | "regularPrice-desc"
    | "maxCapacity-asc"
    | "maxCapacity-desc";

interface option {
    value: valueType;
    label: string;
}
interface Props {
    options: option[];
}

function SortBy({ options }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortBy = searchParams.get("sortBy") || "";

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }
    return (
        <Select
            options={options}
            value={sortBy}
            type="white"
            onChange={handleChange}
        />
    );
}

export default SortBy;
