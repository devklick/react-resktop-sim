import useDateTime from "../../../hooks/useDateTime";
import useWindowManagerStore from "../../../stores/windowManagerStore";
import BorderedApp from "../../BorderedApp";
import "./ClockMenu.scss";
import { v4 as uuid } from "uuid";

const windowType = "clock";

interface ClockMenuProps {}

// eslint-disable-next-line no-empty-pattern
function ClockMenu({}: ClockMenuProps) {
  const winMan = useWindowManagerStore();
  const dateTime = useDateTime({
    tickFrequency: 1,
    tickFrequencyUnit: "minute",
    template: "hh:mm",
  });

  function handleClick() {
    const id = uuid();
    winMan.addWindow(windowType, id, {
      component: BorderedApp,
      props: {
        title: "Calendar",
        initialDimensions: { height: 500, width: 500 },
        type: windowType,
        id: id,
      },
      key: id,
    });
  }
  return (
    <div id="clock-menu" onClick={() => handleClick()}>
      <div id="clock-menu__time-container">
        <span id="clock-menu__time">{dateTime.formatted}</span>
      </div>
    </div>
  );
}

export default ClockMenu;
