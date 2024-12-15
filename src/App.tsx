import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Heading from "./ui/Heading";

const StyledApp = styled.div`
    padding: 20px;
`;

export default function App() {
    return (
        <>
            <GlobalStyles />
            <StyledApp>
                <Heading>The Wild Oasis</Heading>
            </StyledApp>
        </>
    );
}
