import React from "react";

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
}

const SensorCard: React.FC<SensorCardProps> = ({
  title,
  value,
  unit,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="text-4xl mb-2">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-3xl font-bold text-green-600">
        {value.toFixed(1)} {unit}
      </div>
    </div>
  );
};

export default SensorCard;
