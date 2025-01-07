import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPayment, setConfirmPayment] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const moveBack = useMoveBack();
    const { checkin, isCheckingIn } = useChecking();
    const { booking, isLoading } = useBooking();
    const { settings, isLoading: isLoadingSettings } = useSettings();
    useEffect(() => setConfirmPayment(booking?.isPaid ?? false), [booking]);
    if (isLoading || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;
    const optionalBreakfastPrice =
        Number(settings?.breakfastPrice) * numNights * numGuests;
    function handleCheckin() {
        if (!confirmPayment) return;

        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkin({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />
            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);
                            setConfirmPayment(false);
                        }}
                        id="breakfast"
                        disabled={confirmPayment || isCheckingIn}
                    >
                        Want to add breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPayment}
                    onChange={() => setConfirmPayment((confirm) => !confirm)}
                    id="confirm"
                    disabled={confirmPayment || isCheckingIn}
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : ` ${formatCurrency(
                              totalPrice + optionalBreakfastPrice
                          )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )}) `}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPayment || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
