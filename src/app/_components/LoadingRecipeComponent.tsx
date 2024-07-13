import { ColorRing } from "react-loader-spinner";

export const LoadingRecipeComponent = () => {
  return (
    <>
      <div className="text-lg font-semibold">
        Henter oppskrift... Dette kan ta litt tid
      </div>
      <ColorRing />
    </>
  );
};
