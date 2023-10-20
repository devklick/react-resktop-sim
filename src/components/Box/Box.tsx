import "./Box.scss";

interface BoxProps {
  flow?: "horizontal" | "vertical";
  gap?: number;
}

function Box({
  flow = "vertical",
  gap = 10,
  children,
}: React.PropsWithChildren<BoxProps>) {
  return (
    <div
      className="box"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: flow == "horizontal" ? "row" : "column",
        gap,
        padding: gap,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

export default Box;
