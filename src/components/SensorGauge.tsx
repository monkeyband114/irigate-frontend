import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialProgress } from "./RadialProgress";

interface SensorGaugeProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
  min: number;
  max: number;
}

const SensorGauge: React.FC<SensorGaugeProps> = ({
  title,
  value,
  unit,
  icon,
  min,
  max,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-2xl">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <RadialProgress value={percentage} size={120} strokeWidth={10}>
            <div className="text-2xl font-bold">{value.toFixed(2)}</div>
            <div className="text-xs">{unit}</div>
          </RadialProgress>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorGauge;
