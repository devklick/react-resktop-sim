import "./Row.scss";

interface RowProps {
  gap?: number;
  width?: string | number;
}

function Row({
  gap = 10,
  width = "100%",
  children,
}: React.PropsWithChildren<RowProps>) {
  return (
    <div
      className="row"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width,
        gap,
      }}
    >
      {children}
    </div>
  );
}

export default Row;
