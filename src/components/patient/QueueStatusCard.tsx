
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface QueueStatusProps {
  queueStatus: {
    position: number;
    estimatedWaitTime: number;
    totalInQueue: number;
    department: string;
    averageProcessingTime: number;
  };
}

const QueueStatusCard = ({ queueStatus }: QueueStatusProps) => {
  const [progress, setProgress] = useState(0);
  const percentComplete = 100 - ((queueStatus.position / queueStatus.totalInQueue) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentComplete), 500);
    return () => clearTimeout(timer);
  }, [percentComplete]);

  return (
    <Card className="w-full border-primary/20 bg-primary/5 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-center md:text-left">Current Queue Status</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500 block mb-1">Department</span>
            <span className="text-lg font-medium text-primary">{queueStatus.department}</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500 block mb-1">Your Position</span>
            <span className="text-lg font-medium text-primary">{queueStatus.position} of {queueStatus.totalInQueue}</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500 block mb-1">Estimated Wait Time</span>
            <span className="text-lg font-medium text-primary">{queueStatus.estimatedWaitTime} minutes</span>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500 block mb-1">Avg. Process Time</span>
            <span className="text-lg font-medium text-primary">{queueStatus.averageProcessingTime} min/patient</span>
          </div>
        </div>
        <div className="space-y-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Queue Progress</span>
            <span className="font-medium text-primary">{Math.round(percentComplete)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-100" />
        </div>
      </CardContent>
    </Card>
  );
};

export default QueueStatusCard;
