import React from "react";

const LoadingState = () => {
  return (
    <div className="mx-auto max-w-4xl bg-white p-6">
      <div className="animate-pulse">
        <div className="mb-4 h-8 w-3/4 rounded bg-gray-300"></div>
        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 rounded bg-gray-300"></div>
          ))}
        </div>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-300"></div>
            <div>
              <div className="mb-1 h-4 w-20 rounded bg-gray-300"></div>
              <div className="h-3 w-16 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="h-96 rounded-lg bg-gray-300"></div>
      </div>
    </div>
  );
};

export default LoadingState;
