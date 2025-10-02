import { memo } from "react"

 function ListingInput({label,type,placeholder,value, onchange}) {
  return (
    <div className="flex flex-col w-full gap-2">
    <label htmlFor="" className="text-lg">
      {label}
    </label>
    <input
    value={value}
    onChange={onchange}
      type={type}
      className="px-3 py-2 border border-gray-300 rounded-md outline-none text-md"
      placeholder={placeholder}
    />
  </div>
  )
}
export default memo(ListingInput)