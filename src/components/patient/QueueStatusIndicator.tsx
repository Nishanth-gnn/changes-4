
import React from 'react';
import { Check, Clock, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface QueueStatusIndicatorProps {
  status: 'waiting' | 'called' | 'completed';
  position?: number;
}

const QueueStatusIndicator: React.FC<QueueStatusIndicatorProps> = ({ status, position }) => {
  const getStatusDetails = () => {
    switch (status) {
      case 'waiting':
        return {
          icon: <Clock className="h-10 w-10 text-yellow-500" />,
          color: 'bg-yellow-100 border-yellow-300',
          textColor: 'text-yellow-700',
          title: 'Waiting',
          description: position ? `You are number ${position} in the queue` : 'Please wait until you are called'
        };
      case 'called':
        return {
          icon: <PhoneCall className="h-10 w-10 text-primary" />,
          color: 'bg-blue-100 border-blue-300',
          textColor: 'text-blue-700',
          title: 'Called',
          description: 'Please proceed to your designated room'
        };
      case 'completed':
        return {
          icon: <Check className="h-10 w-10 text-green-500" />,
          color: 'bg-green-100 border-green-300',
          textColor: 'text-green-700',
          title: 'Completed',
          description: 'Your appointment has been completed'
        };
      default:
        return {
          icon: <Clock className="h-10 w-10 text-gray-500" />,
          color: 'bg-gray-100 border-gray-300',
          textColor: 'text-gray-700',
          title: 'Unknown',
          description: 'Status information unavailable'
        };
    }
  };

  const { icon, color, textColor, title, description } = getStatusDetails();

  return (
    <Card className={`border-2 ${color} animate-fade-in mb-8`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-xl font-bold ${textColor}`}>Current Status: </h3>
              <Badge className={status === 'waiting' ? 'bg-yellow-500' : 
                            status === 'called' ? 'bg-primary' : 'bg-green-500'}>
                {title}
              </Badge>
            </div>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QueueStatusIndicator;
