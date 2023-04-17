import { useState, useEffect } from "react";

/**
 * This is an alternative approach to solving the problem.
 * Only the Counter component really requires the "countdown" state. By moving this into a separate component,
 * the state management and any re-rendering caused by the countdown state is isolated. This means that if
 * "countdown" state updates via the "setInterval", the parent component "ItemDetail" won't actually care since
 * it does not care about the state "countdown" in the Counter component.
 *
 * This ensures that there are no unnecessasry code running in the ItemDetail component (e.g. the thumbNails(itemObj) function)
 */
function Counter(props) {
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // Set a countdown timer to display how much time is left until the bidding closes
    const countdownDate = new Date(props.end_date);
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = countdownDate.getTime() - now.getTime();
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      // If the countdown is complete, clear the interval and display a message
      if (timeDifference < 0) {
        clearInterval(interval);
        setCountdown("Bids are closed!");
      } else {
        // Check if any value is NaN before displaying countdown
        const countdownValues = [days, hours, minutes, seconds];
        const countdownString = countdownValues.some(isNaN)
          ? null
          : `Only ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left!`;
        setCountdown(countdownString);
      }
    }, 1000);

    // Clear the countdown interval on unmount to prevent memory leaks
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span className="countdown-timer">{countdown}</span>;
}

export default Counter;
