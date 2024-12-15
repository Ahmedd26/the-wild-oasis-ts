import styled, { css } from "styled-components";

const Form = styled.form<{ type?: "modal" }>`
    ${(props) => {
        switch (props.type) {
            case "modal":
                return css`
                    padding: 2.4rem 4rem;
                    /* Box */
                    background-color: var(--color-grey-0);
                    border: 1px solid var(--color-grey-100);
                    border-radius: var(--border-radius-md);
                `;
            default:
                return css`
                    width: 80rem;
                `;
        }
    }}

    overflow: hidden;
    font-size: 1.4rem;
`;

export default Form;
