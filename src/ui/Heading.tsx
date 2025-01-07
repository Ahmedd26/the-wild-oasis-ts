import styled, { css } from "styled-components";

interface HeadingProps {
    $variant?: "small" | "medium" | "large";
    $textAlign?: "center" | "left" | "right";
}
const Heading = styled.h1<HeadingProps>`
    ${(props) => {
        switch (props.$variant) {
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
    text-align: ${(props) => props.$textAlign};
    line-height: 1.4;
`;
Heading.defaultProps = {
    as: "h1",
    $variant: "medium",
    $textAlign: "center",
};

export default Heading;
