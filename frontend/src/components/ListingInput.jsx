import { memo } from "react"

 function ListingInput({title,type,placeholder,refs}) {
  return (
    <div className="flex flex-col gap-2">
    <label htmlFor="" className="text-lg">
      {title}
    </label>
    <input
    ref={refs}
      type={type}
      className="px-3 py-2 border border-gray-200 rounded-md text-md"
      placeholder={placeholder}
    />
  </div>
  )
}
export default memo(ListingInput)