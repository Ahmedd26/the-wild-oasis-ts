import styled, { css } from "styled-components";

interface HeadingProps {
    variant?: "small" | "medium" | "large";
}
const Heading = styled.h1<HeadingProps>`
    ${(props) => {
        switch (props.variant) {
            case "large":
                return css`
                    font-size: 3rem;
                    font-weight: 600;
                `;
            case "medium":
                return css`
                    font-size: 2rem;
                    font-weight: 600;
                `;
            case "small":
                return css`
                    font-size: 1.4rem;
                    font-weight: 600;
                `;
        }
    }}
    line-height: 1.4;
`;
Heading.defaultProps = {
    as: "h1",
    variant: "medium",
};

export default Heading;
