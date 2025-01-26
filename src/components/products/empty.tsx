import { Empty, EmptyProductBoxIcon } from "rizzui";

export function EmptyData() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Empty image={<EmptyProductBoxIcon />} text="No Product Available" />;
    </div>
  );
}
