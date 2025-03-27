import { memo } from "react";

 function LoginButton({onclick, type}) {
  return (
    <button
    onClick={onclick}
      className="w-full p-3 my-2 text-xl text-white bg-red-600 rounded-xl hover:bg-red-700"
    > {type}</button>
  );
}
export default memo(LoginButton)