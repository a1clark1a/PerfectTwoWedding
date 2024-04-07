import React, { useCallback, useEffect, useState } from "react";

import "./countDownClock.styles.scss";

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

    // Add leading zero if the number is under 10
    const formattedDays = days < 10 ? `0${days}` : days;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return {
      days: formattedDays,
      hours: formattedHours,
      minutes: formattedMinutes,
      seconds: formattedSeconds,
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
    <div className="countdownClockContainer">
      <div className="individualHandContainer">
        <div className="clockNumber">{timeRemaining.days}</div>
        <div className="clockName">Days</div>
      </div>
      <div className="individualHandContainer">
        <div className="colon">:</div>
      </div>
      <div className="individualHandContainer">
        <div className="clockNumber">{timeRemaining.hours}</div>
        <div className="clockName">Hours</div>
      </div>
      <div className="individualHandContainer">
        <div className="colon">:</div>
      </div>
      <div className="individualHandContainer">
        <div className="clockNumber">{timeRemaining.minutes}</div>
        <div className="clockName"> Min</div>
      </div>
      <div className="individualHandContainer">
        <div className="colon">:</div>
      </div>
      <div className="individualHandContainer">
        <div className="clockNumber">{timeRemaining.seconds}</div>
        <div className="clockName"> Secs</div>
      </div>
    </div>
  );
};

export default CountDownClock;
