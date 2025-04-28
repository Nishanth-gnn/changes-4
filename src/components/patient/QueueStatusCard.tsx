
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
    <Card className="mb-8 border-primary/20 bg-primary/5 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Current Queue Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Department</span>
            <span className="text-lg font-medium">{queueStatus.department}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Your Position</span>
            <span className="text-lg font-medium">{queueStatus.position} of {queueStatus.totalInQueue}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Estimated Wait Time</span>
            <span className="text-lg font-medium">{queueStatus.estimatedWaitTime} minutes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Avg. Process Time</span>
            <span className="text-lg font-medium">{queueStatus.averageProcessingTime} min/patient</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Queue Progress</span>
            <span>{Math.round(percentComplete)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default QueueStatusCard;
