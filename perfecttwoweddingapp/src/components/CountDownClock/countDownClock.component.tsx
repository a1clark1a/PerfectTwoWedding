import React, { useCallback, useEffect, useState } from "react";

const CountDownClock = (): React.JSX.Element => {
  const targetDate = new Date("September 23, 2024 15:00:00").getTime();

  const calculateTimeRemaining = useCallback(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }, [targetDate]);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateTimeRemaining]);

  return (
    <div>
      <h2>Clock</h2>
      <div>
        <div>{timeRemaining.days} days</div>
        <div>{timeRemaining.hours} hours</div>
        <div>{timeRemaining.minutes} minutes</div>
        <div>{timeRemaining.seconds} seconds</div>
      </div>
    </div>
  );
};

export default CountDownClock;
