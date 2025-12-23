import {useEffect, useState} from 'react';
import type {ClockType} from '../../lib/weatherTypes';

interface ClockProps {
    type: ClockType;
}

export default function Clock({type}: ClockProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (type === 'digital') {
        return <DigitalClock time={time} />;
    }

    return <AnalogClock time={time} />;
}

function DigitalClock({time}: {time: Date}) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl lg:text-6xl font-light text-white tabular-nums">
                {hours}:{minutes}
            </span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-light text-white/70 tabular-nums">
                :{seconds}
            </span>
        </div>
    );
}

function AnalogClock({time}: {time: Date}) {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Calculate angles (12 o'clock is 0 degrees, clockwise)
    const secondAngle = (seconds * 6) - 90; // 360/60 = 6 degrees per second
    const minuteAngle = (minutes * 6 + seconds * 0.1) - 90; // 360/60 = 6 degrees per minute
    const hourAngle = (hours * 30 + minutes * 0.5) - 90; // 360/12 = 30 degrees per hour

    return (
        <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
            {/* Clock face */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Outer circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1"
                />

                {/* Hour markers */}
                {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const isMainHour = i % 3 === 0;
                    const length = isMainHour ? 8 : 4;
                    const width = isMainHour ? 2 : 1;
                    const x1 = 50 + Math.cos(angle) * (48 - length);
                    const y1 = 50 + Math.sin(angle) * (48 - length);
                    const x2 = 50 + Math.cos(angle) * 48;
                    const y2 = 50 + Math.sin(angle) * 48;

                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(255, 255, 255, 0.5)"
                            strokeWidth={width}
                            strokeLinecap="round"
                        />
                    );
                })}

                {/* Hour hand */}
                <line
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(hourAngle * Math.PI / 180) * 25}
                    y2={50 + Math.sin(hourAngle * Math.PI / 180) * 25}
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Minute hand */}
                <line
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(minuteAngle * Math.PI / 180) * 35}
                    y2={50 + Math.sin(minuteAngle * Math.PI / 180) * 35}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Second hand */}
                <line
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(secondAngle * Math.PI / 180) * 38}
                    y2={50 + Math.sin(secondAngle * Math.PI / 180) * 38}
                    stroke="rgba(59, 130, 246, 0.8)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* Center dot */}
                <circle cx="50" cy="50" r="3" fill="white" />
            </svg>
        </div>
    );
}
