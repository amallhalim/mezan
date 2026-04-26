"use client";
import { useScroller } from '@/app/hooks/useScroller';
import { category } from '@/app/lib/data';
import ScrollArrow from '../../common/ScrollArrow';
import Button from '../../Common/Button';
import Buttons from '../../common/Buttons';

interface FoodCategoryTabsProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function FoodCategoryTabs({ selectedId, onSelect }: FoodCategoryTabsProps) {
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useScroller({ selectedId });

  return (
    <div className="relative flex items-center gap-1">

      <ScrollArrow direction="left" visible={canScrollLeft} onClick={scrollLeft} />

      <div className="relative flex-1 overflow-hidden">


        <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
          {category.map((item) => (
            <Buttons
              key={item.id}
              isSelected={selectedId === item.id}
              onClick={() => onSelect(item.id)}
              title={item.name}
              icon={item.icon}
            >
              {item.icon} {item.name}
            </Buttons>
          ))}
        </div>
      </div>

      <ScrollArrow direction="right" visible={canScrollRight} onClick={scrollRight} />
    </div>
  );
}

