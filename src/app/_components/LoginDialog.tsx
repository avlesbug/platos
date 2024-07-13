import { signInWithGooglePopup } from "../../utils/firebase.utils";
import { Button } from "~/components/ui/button";

export const LoginDialog = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <div className="login-dialog">
      <div className="h-1/6 content-center justify-center p-6 text-xl font-bold">
        <h2>Logg inn for å komme i gang!</h2>
      </div>
      <div className="h-5/6 content-center justify-center">
        <Button onClick={logGoogleUser}>Logg inn med Google</Button>
      </div>
    </div>
  );
};
