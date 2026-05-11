import React from 'react'
import useCount from './useCount'

interface CounterProps {
    count?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onReset?: () => void;
}

export default function Counter({ 
    count: propsCount, 
    onIncrement, 
    onDecrement, 
    onReset 
}: CounterProps) {
    // 1. We call the hook, but we prioritize the Props if they are provided
    // This makes the component "Testable"
    const hook = useCount();
    
    const count = propsCount ?? hook.count;
    const increment = onIncrement ?? hook.increment;
    const decrement = onDecrement ?? hook.decrement;
    const reset = onReset ?? hook.reset;

    return (
        <div className="p-8 rounded-3xl border-2 border-primary/20 bg-white/5 backdrop-blur-md mb-12">
            <h2 className="text-2xl font-bold mb-4">Counter Interaction</h2>
            <p className="text-lg mb-6">Current count is: <span className="font-mono text-primary">{count}</span></p>
            
            <div className="flex gap-4 flex-wrap">
                <button
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90"
                    onClick={increment}
                >
                    Increment
                </button>
                <button
                    className="px-6 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20"
                    onClick={decrement}
                >
                    Decrement
                </button>
                {/* --- NEW RESET BUTTON --- */}
                <button
                    className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl font-bold hover:bg-red-500/30 transition-all"
                    onClick={reset}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}
