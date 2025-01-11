import { createContext, useContext, useState, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

type TStyledList = {
    position: { x: number | string; y: number | string };
};

const StyledList = styled.ul<TStyledList>`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

type MenusContextType = {
    openId: string;
    open: (id: string) => void;
    close: () => void;
    position: { x: number; y: number } | null;
    setPosition: (position: { x: number; y: number } | null) => void;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function Menus({ children }: { children: React.ReactNode }) {
    const [openId, setIsOpenId] = useState("");
    const [position, setPosition] = useState<null | { x: number; y: number }>(
        null
    );
    const close = () => setIsOpenId("");
    const open = (id: string) => setIsOpenId(id);

    return (
        <MenusContext.Provider
            value={{ openId, open, close, position, setPosition }}
        >
            {children}
        </MenusContext.Provider>
    );
}

function Toggle({ id }: { id: string }) {
    const context = useContext(MenusContext);
    if (!context) {
        throw new Error("Toggle must be used within a Menus");
    }
    const { openId, open, close, setPosition } = context;
    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });
        openId === "" || openId !== id ? open(id) : close();
    }
    return (
        <StyledToggle onClick={handleClick}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

function List({ children, id }: { children: React.ReactNode; id: string }) {
    const context = useContext(MenusContext);
    if (!context) {
        throw new Error("List must be used within a Menus");
    }
    const { openId, position, close } = context;
    const ref = useOutsideClick<HTMLUListElement>(close, false);
    if (openId !== id) return null;
    return createPortal(
        <StyledList
            ref={ref}
            // as unknown as React.RefObject<HTMLUListElement>
            position={{ x: position!.x, y: position!.y }}
        >
            {children}
        </StyledList>,
        document.body
    );
}

function Button({
    children,
    icon,
    onClick,
    disabled = false,
}: {
    children: React.ReactNode;
    icon: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}) {
    const context = useContext(MenusContext);
    if (!context) {
        throw new Error("Button must be used within a Menus");
    }
    const { close } = context;
    function handleClick() {
        onClick?.();
        close();
    }
    return (
        <li>
            <StyledButton disabled={disabled} onClick={handleClick}>
                {icon} <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
