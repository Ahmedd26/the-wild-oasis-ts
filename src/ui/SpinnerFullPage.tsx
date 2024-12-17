import styled from "styled-components";
import Spinner from "./Spinner";

const StyledSpinnerFullPage = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-grey-500);
`;

function SpinnerFullPage() {
    return (
        <StyledSpinnerFullPage>
            <Spinner />
        </StyledSpinnerFullPage>
    );
}

export default SpinnerFullPage;
