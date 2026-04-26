interface ScrollArrowProps {
    direction: 'left' | 'right';
    visible: boolean;
    onClick: () => void;
}

export default function ScrollArrow({ direction, visible, onClick }: ScrollArrowProps) {
    return (
        <button
            onClick={onClick}
            aria-label={`Scroll ${direction}`}
            className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full
        bg-white/10 border border-white/10 text-gray-400
        hover:text-white hover:bg-white/20 transition-all duration-200
        ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
            </svg>
        </button>
    )
}
