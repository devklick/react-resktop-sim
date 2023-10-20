import {
  StyledItem,
  StyledItemContainer,
  StyledSideBar,
} from "./Styled.AppSideBar";

interface SideBarItem {
  title: string;
  onClick: () => void;
  isActive?: boolean;
}

interface AppSideBarProps {
  items: Array<SideBarItem>;
}

function AppSideBar({ items }: AppSideBarProps) {
  return (
    <StyledSideBar>
      <StyledItemContainer>
        {items.map((item) => (
          <StyledItem onClick={item.onClick} key={item.title}>
            {item.title}
          </StyledItem>
        ))}
      </StyledItemContainer>
    </StyledSideBar>
  );
}

export default AppSideBar;
