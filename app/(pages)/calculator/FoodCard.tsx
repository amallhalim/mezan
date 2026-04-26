import { CheckIcon, Plus } from 'lucide-react'
import React from 'react'

export default function FoodCard({ food, onSelect, isSelected }: any) {
    return (
        <div 
            onClick={() => onSelect(food)}
            className={`group relative flex flex-row justify-between items-center bg-white/5 
                hover:bg-white/10 border border-white/5 hover:border-primary/50
                rounded-2xl m-1 p-4 transition-all cursor-pointer overflow-hidden
                ${isSelected ? 'bg-primary/10 border-primary/40' : ''}`}
        >
            <div className='flex items-center gap-4'>
                <div className='flex justify-center items-center text-2xl
                 bg-white/5 rounded-2xl size-14 shadow-inner group-hover:scale-110 transition-transform'>
                    {food.icon}
                </div>
                
                <div className="flex flex-col">
                    <h3 className='text-white font-black text-base leading-tight'>{food.name}</h3>
                    <h4 className='text-primary/70 font-bold text-xs leading-none mt-0.5' dir="rtl">{food.nameAr}</h4>
                    <div className='flex flex-wrap gap-x-3 gap-y-1 mt-2'>
                        <span className="text-primary font-bold text-sm">{food.caloriesPer100} <span className="text-[10px] opacity-70 uppercase tracking-tighter">kcal</span></span>
                        <div className="flex gap-2 text-[10px] font-bold text-gray-500 uppercase">
                            <span className="flex items-center gap-1"><div className="size-1 rounded-full bg-blue-400" /> P: {food.proteinPer100}g</span>
                            <span className="flex items-center gap-1"><div className="size-1 rounded-full bg-amber-400" /> C: {food.carbsPer100}g</span>
                            <span className="flex items-center gap-1"><div className="size-1 rounded-full bg-rose-400" /> F: {food.fatPer100}g</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">per 100g</p>
                </div>
                <div className={`size-8 rounded-full flex items-center justify-center transition-all
                    ${isSelected ? 'bg-primary text-secondary' : 'bg-white/10 text-gray-400 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                    {isSelected ? <CheckIcon className="size-5" /> : <Plus className="size-5" />}
                </div>
            </div>
        </div>
    )
}
