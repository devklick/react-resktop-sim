import Calculator from "..";
import Launcher from "../../../components/BottomBar/Launcher";
import "./CalculatorLauncher.scss";

interface CalculatorLauncherProps {}

const windowType = "calculator";

// eslint-disable-next-line no-empty-pattern
function CalculatorLauncher({}: CalculatorLauncherProps) {
  return (
    <Launcher
      windowType={windowType}
      WindowTitle="Calculator"
      initialDimensions={{ height: 400, width: 400 }}
      icon=""
      menus={[]}
      appContent={<Calculator />}
    ></Launcher>
  );
}

export default CalculatorLauncher;
