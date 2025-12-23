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

    // Digital clocks
    if (type === 'digital-thin') {
        return <DigitalClockThin time={time} />;
    }
    if (type === 'digital-bold') {
        return <DigitalClockBold time={time} />;
    }
    if (type === 'digital-segment') {
        return <DigitalClockSegment time={time} />;
    }

    // Analog clocks
    if (type === 'analog-minimal') {
        return <AnalogClockMinimal time={time} />;
    }
    if (type === 'analog-apple') {
        return <AnalogClockApple time={time} />;
    }

    return <DigitalClockThin time={time} />;
}

// Digital Clock - Thin (original)
function DigitalClockThin({time}: {time: Date}) {
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

// Digital Clock - Bold
function DigitalClockBold({time}: {time: Date}) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl lg:text-7xl font-black text-white tabular-nums tracking-tight">
                {hours}:{minutes}
            </span>
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/70 tabular-nums">
                :{seconds}
            </span>
        </div>
    );
}

// Digital Clock - Segment (LCD style)
function DigitalClockSegment({time}: {time: Date}) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <div className="flex items-center gap-1 bg-black/40 px-4 py-2 rounded-lg">
            <span
                className="text-4xl md:text-5xl lg:text-6xl font-mono text-green-400 tabular-nums"
                style={{
                    fontFamily: '"Courier New", Courier, monospace',
                    textShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
                }}
            >
                {hours}:{minutes}:{seconds}
            </span>
        </div>
    );
}

// Analog Clock - Minimal (original)
function AnalogClockMinimal({time}: {time: Date}) {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const secondAngle = (seconds * 6) - 90;
    const minuteAngle = (minutes * 6 + seconds * 0.1) - 90;
    const hourAngle = (hours * 30 + minutes * 0.5) - 90;

    return (
        <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
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

// Analog Clock - Apple Style
function AnalogClockApple({time}: {time: Date}) {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const secondAngle = (seconds * 6) - 90;
    const minuteAngle = (minutes * 6 + seconds * 0.1) - 90;
    const hourAngle = (hours * 30 + minutes * 0.5) - 90;

    return (
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* White background circle */}
                <circle cx="50" cy="50" r="48" fill="white" />

                {/* Outer border */}
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.1)"
                    strokeWidth="0.5"
                />

                {/* Hour numbers */}
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const radius = 35;
                    const x = 50 + Math.cos(angle) * radius;
                    const y = 50 + Math.sin(angle) * radius;

                    return (
                        <text
                            key={num}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="black"
                            fontSize="8"
                            fontWeight="500"
                            fontFamily="system-ui, -apple-system, sans-serif"
                        >
                            {num}
                        </text>
                    );
                })}

                {/* Hour markers (small dots) */}
                {[...Array(60)].map((_, i) => {
                    if (i % 5 === 0) return null; // Skip where numbers are
                    const angle = (i * 6 - 90) * (Math.PI / 180);
                    const x = 50 + Math.cos(angle) * 44;
                    const y = 50 + Math.sin(angle) * 44;

                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="0.5"
                            fill="rgba(0, 0, 0, 0.3)"
                        />
                    );
                })}

                {/* Hour hand - black, thick, rounded */}
                <line
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(hourAngle * Math.PI / 180) * 20}
                    y2={50 + Math.sin(hourAngle * Math.PI / 180) * 20}
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Minute hand - black, medium, rounded */}
                <line
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(minuteAngle * Math.PI / 180) * 30}
                    y2={50 + Math.sin(minuteAngle * Math.PI / 180) * 30}
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Second hand - orange/red like Apple */}
                {/* Tail part (goes backwards) */}
                <line
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos((secondAngle + 180) * Math.PI / 180) * 8}
                    y2={50 + Math.sin((secondAngle + 180) * Math.PI / 180) * 8}
                    stroke="#FF6B35"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                {/* Main part (goes forward) */}
                <line
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(secondAngle * Math.PI / 180) * 36}
                    y2={50 + Math.sin(secondAngle * Math.PI / 180) * 36}
                    stroke="#FF6B35"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* Center dot - orange */}
                <circle cx="50" cy="50" r="3" fill="#FF6B35" />
                <circle cx="50" cy="50" r="1.5" fill="white" />
            </svg>
        </div>
    );
}
