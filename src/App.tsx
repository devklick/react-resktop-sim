import { Global, css } from "@emotion/react";

import Desktop from "./components/Desktop";
import useSystemSettings from "./stores/systemSettingsStore";

function App() {
  const settings = useSystemSettings();
  return (
    <div className="App">
      <Global
        styles={css`
          body {
            color: ${settings.fontColor};
          }
        `}
      />
      <Desktop />
    </div>
  );
}

export default App;
