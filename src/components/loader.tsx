import { Loader } from "rizzui";

export default function LoaderComponent() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader size="xl" color="info" />
    </div>
  );
}
