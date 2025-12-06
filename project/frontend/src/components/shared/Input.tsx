import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function Input({label, error, className = '', ...props}: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <input
                className={`w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${error ? 'border-red-500 focus:ring-red-500' : ''}
                      ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}