import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

function HeaderMenu() {
    const navigate = useNavigate();
    return (
        <StyledHeaderMenu>
            <ButtonIcon role="link" onClick={() => navigate(routes.ACCOUNT)}>
                <HiOutlineUser />
            </ButtonIcon>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
}
export default HeaderMenu;
