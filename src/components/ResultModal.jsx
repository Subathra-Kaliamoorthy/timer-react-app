import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({ref, targetTime, remainingTime, onReset}) {

    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" >
            {userLost && <h2>You lost!</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                Your target time was <strong>{targetTime}</strong> second{targetTime > 1 ? "s" : ""}.</p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds</strong> left.</p>
            <form method="dialog" onSubmit={onReset}>
                <button>Play Again</button>
            </form> 
        </dialog>,
        document.getElementById("modal")
    );
}