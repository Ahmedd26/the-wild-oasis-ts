import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
    return (
        <TableOperations>
            <Filter
                filterField="status"
                options={["all", "checked-out", "checked-in", "unconfirmed"]}
            />

            <SortBy
                options={[
                    {
                        value: "startDate-desc",
                        label: "Date (recent)",
                    },
                    {
                        value: "startDate-asc",
                        label: "Date (earlier)",
                    },
                    {
                        value: "totalPrice-desc",
                        label: "Amount (high to low)",
                    },
                    {
                        value: "totalPrice-asc",
                        label: "Amount (low to high)",
                    },
                ]}
            />
        </TableOperations>
    );
}

export default BookingTableOperations;
