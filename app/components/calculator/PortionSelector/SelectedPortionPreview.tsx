import React from 'react';
import { Share2 } from 'lucide-react';
import { getCalorieColor, getHealthInsight } from '@/app/lib/calculatorUtils';

interface SelectedPortionPreviewProps {
  quantity: number;
  sizeLabel: string;
  foodName: string;
  nameAr: string;
  totalAmount: number;
  unit: string;
  isRaw: boolean;
  calories: number;
  icon: string;
}

export default function SelectedPortionPreview({ 
  foodName, 
  nameAr,
  totalAmount, 
  unit, 
  isRaw, 
  calories,
  icon
}: SelectedPortionPreviewProps) {
  
  const calorieColor = getCalorieColor(calories);
  const insight = getHealthInsight(calories);
  const InsightIcon = insight.icon;

  const handleShare = async () => {
    const text = `I'm eating ${totalAmount}${unit} of ${foodName} / ${nameAr} (${calories} kcal)! Tracked via MEZAN.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Meal - MEZAN',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#161B21]/80 backdrop-blur-md rounded-[2rem] p-5 border border-white/10 flex items-center justify-between transition-all animate-in zoom-in-95 duration-300 relative group shadow-2xl">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-[2.1rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="size-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col mb-1">
            <h3 className="text-xl font-black text-white leading-tight truncate">{foodName}</h3>
            <h4 className="text-sm font-bold text-primary/80 leading-none" dir="rtl">{nameAr}</h4>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 ${insight.color} text-[8px] font-black uppercase tracking-widest`}>
              <InsightIcon className="size-3" /> {insight.text}
            </div>
            <p className="text-gray-500 font-bold text-[9px] uppercase tracking-widest opacity-70">
              {totalAmount}{unit} • {isRaw ? 'RAW' : 'COOKED'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-5 relative z-10">
        <div className="text-right">
          <p className={`text-4xl font-black ${calorieColor} flex items-baseline gap-1 drop-shadow-sm`}>
            {calories}
            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">KCAL</span>
          </p>
        </div>
        
        <button 
          onClick={handleShare}
          className="size-10 rounded-full bg-white/5 border border-white/5 hover:bg-primary hover:text-secondary flex items-center justify-center text-gray-400 transition-all active:scale-90 shadow-lg"
          title="Share Choice"
        >
          <Share2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
