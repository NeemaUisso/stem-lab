import React from 'react';

export default function BiologyLab() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-lg text-gray-700 mb-4">
        Click on a virtual microscope or cell to explore!
      </p>
      <div className="w-full h-[400px] bg-white border-4 border-green-300 rounded-lg shadow-inner flex items-center justify-center">
        <p className="text-gray-400">[ 3D Simulation Canvas will go here ]</p>
      </div>
    </div>
  );
}
