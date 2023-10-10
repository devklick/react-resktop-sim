import "./AppSideBar.scss";

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
    <div className="app-side-bar">
      <div className="app-side-bar__items">
        {items.map((item) => {
          return (
            <div
              className={`app-side-bar__item ${item.isActive ? "active" : ""} `}
              onClick={item.onClick}
              key={item.title}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AppSideBar;
