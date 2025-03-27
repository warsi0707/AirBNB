import { memo } from "react";

function UserInput({placeholder, type, refs}) {
  return (
    <input
    ref={refs}
      type={type}
      className="w-full p-3.5 rounded-lg  hover:rounded-lg   border-2 "
      placeholder={placeholder}
    />
  );
}
export default memo(UserInput);
