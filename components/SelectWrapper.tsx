import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export  function SelectWrapper({ value, onChange, options, placeholder, ...props}: any) {
  return (
    <Select value={value} onValueChange={onChange} >
      <SelectTrigger className={`border-brand-green/30   focus:ring-brand-green/20 w-full h-10! `} >
        <SelectValue placeholder={placeholder || "Selecciona una opción"} />
      </SelectTrigger>
      <SelectContent className="bg-white ">
        {options?.map((option: any) => (
          <SelectItem className="hover:bg-black/5 cursor-pointer" key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
