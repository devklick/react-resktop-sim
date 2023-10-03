import "./WebBrowser.scss";

interface WebBrowserProps {}

// eslint-disable-next-line no-empty-pattern
function WebBrowser({}: WebBrowserProps) {
  return (
    <div className="web-browser">
      <iframe
        className="web-browser__contents"
        src="http://google.com"
        // referrerPolicy="no-referrer"
      ></iframe>
    </div>
  );
}

export default WebBrowser;
