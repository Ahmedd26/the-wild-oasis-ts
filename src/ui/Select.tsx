import styled from "styled-components";

const StyledSelect = styled.select<{ type: string }>`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid
        ${(props) =>
            props.type === "white"
                ? "var(--color-grey-100)"
                : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

interface Props {
    options: { value: string; label: string }[];
    value: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ options, value, type, onChange }: Props) {
    return (
        <StyledSelect type={type} value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
}

export default Select;
