import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SensorGauge from "./SensorGauge";
import SensorChart from "./SensorChart";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SensorData {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  pressure: number;
}

const Dashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    soilMoisture: 0,
    temperature: 0,
    humidity: 0,
    pressure: 0,
  });
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "https://irigation-backend.onrender.com/events",
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensorData(data);
      setHistoricalData((prev) => [...prev.slice(-20), data]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>System Status</AlertTitle>
        <AlertDescription>
          {sensorData.soilMoisture < 30
            ? "Low soil moisture detected. Irrigation activated."
            : "All systems normal."}
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SensorGauge
          title="Soil Moisture"
          value={sensorData.soilMoisture}
          unit="%"
          icon="💧"
          min={0}
          max={100}
        />
        <SensorGauge
          title="Temperature"
          value={sensorData.temperature}
          unit="°C"
          icon="🌡️"
          min={0}
          max={50}
        />
        <SensorGauge
          title="Humidity"
          value={sensorData.humidity}
          unit="%"
          icon="💨"
          min={0}
          max={100}
        />
        <SensorGauge
          title="Pressure"
          value={sensorData.pressure}
          unit="hPa"
          icon="🔽"
          min={900}
          max={1100}
        />
      </div>
      <Tabs defaultValue="temperature" className="w-full">
        <TabsList>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="humidity">Humidity</TabsTrigger>
          <TabsTrigger value="pressure">Pressure</TabsTrigger>
          <TabsTrigger value="soilMoisture">Soil Moisture</TabsTrigger>
        </TabsList>
        <TabsContent value="temperature">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <SensorChart
                data={historicalData}
                dataKey="temperature"
                unit="°C"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="humidity">
          <Card>
            <CardHeader>
              <CardTitle>Humidity Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <SensorChart data={historicalData} dataKey="humidity" unit="%" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pressure">
          <Card>
            <CardHeader>
              <CardTitle>Pressure Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <SensorChart
                data={historicalData}
                dataKey="pressure"
                unit="hPa"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="soilMoisture">
          <Card>
            <CardHeader>
              <CardTitle>Soil Moisture Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <SensorChart
                data={historicalData}
                dataKey="soilMoisture"
                unit="%"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
