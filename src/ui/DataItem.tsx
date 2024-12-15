import styled from "styled-components";

const StyledDataItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
    padding: 0.8rem 0;
`;

const Label = styled.span`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-weight: 500;

    & svg {
        width: 2rem;
        height: 2rem;
        color: var(--color-brand-600);
    }
`;
// TODO: Add type for icon

interface IProps {
    icon: string;
    label: string;
    children?: React.ReactNode;
}
function DataItem({ icon, label, children }: IProps) {
    return (
        <StyledDataItem>
            <Label>
                {icon}
                <span>{label}</span>
            </Label>
            {children}
        </StyledDataItem>
    );
}

export default DataItem;
