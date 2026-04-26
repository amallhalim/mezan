import { CheckIcon } from 'lucide-react'
import React from 'react'

export default function Buttons({ title, icon, onClick, isSelected, className }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-row justify-center items-center
         gap-2  font-bold px-4 py-2 rounded-full
          border-1 border-primary/20 
           whitespace-nowrap
          ${isSelected ? "bg-primary text-secondary" : "bg-primary/20 text-gray-300"}
          ${className}
          `}>
            {icon}
            {title}
            {isSelected && <CheckIcon className="size-4" />}
        </button>
    )
}
