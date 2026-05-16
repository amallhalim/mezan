"use client";
import { useLocale } from "next-intl";
import { useScroller } from "@/app/hooks/useScroller";
import { category } from "@/app/lib/data";
import ScrollArrow from "../../common/ScrollArrow";
import Buttons from "../../common/Buttons";

interface FoodCategoryTabsProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function FoodCategoryTabs({
  selectedId,
  onSelect,
}: FoodCategoryTabsProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useScroller({ selectedId });

  return (
    <div className="relative flex items-center gap-1">
      <ScrollArrow
        direction="left"
        visible={canScrollLeft}
        onClick={scrollLeft}
      />

      <div className="relative flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto px-1 pb-2"
        >
          {category.map((item) => {
            const displayName = isArabic ? item?.nameAr : item?.name;
            return (
              <Buttons
                key={item?.id}
                isSelected={selectedId === item?.id}
                onClick={() => onSelect(item?.id)}
                title={displayName}
                icon={item?.icon}
              >
                {item?.icon} {displayName}
              </Buttons>
            );
          })}
        </div>
      </div>

      <ScrollArrow
        direction="right"
        visible={canScrollRight}
        onClick={scrollRight}
      />
    </div>
  );
}
