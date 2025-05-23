
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Calendar as CalendarIcon } from "lucide-react";

interface AppointmentCardProps {
  appointment: {
    id: string;
    department: string;
    doctor: string;
    date: string;
    time: string;
    status: string;
    notes?: string;
  };
  type: 'upcoming' | 'past';
  onReschedule?: (appointment: any) => void;
  onCancel?: (id: string) => void;
  onShowQueueStatus?: (id: string) => void;
  hasQueueStatus?: boolean;
}

const AppointmentCard = ({ 
  appointment, 
  type, 
  onReschedule, 
  onCancel, 
  onShowQueueStatus,
  hasQueueStatus 
}: AppointmentCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">Scheduled</Badge>;
      case 'waiting':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 hover:bg-yellow-50">Waiting</Badge>;
      case 'called':
        return <Badge className="bg-primary">Called</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(appointment.id);
    }
  };

  const handleReschedule = () => {
    if (onReschedule) {
      onReschedule(appointment);
    }
  };

  const handleShowQueueStatus = () => {
    if (onShowQueueStatus) {
      onShowQueueStatus(appointment.id);
    }
  };

  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">{appointment.department}</h3>
          </div>
          {getStatusBadge(appointment.status)}
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Doctor</p>
            <p className="font-medium">{appointment.doctor}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{formatDate(appointment.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">{appointment.time}</p>
            </div>
          </div>
          
          {appointment.notes && (
            <div>
              <p className="text-sm text-gray-500">Notes</p>
              <p className="text-gray-700 p-3 bg-gray-50 rounded-md">{appointment.notes}</p>
            </div>
          )}
          
          {type === 'upcoming' && (
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleReschedule}
                >
                  Reschedule
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
              
              {hasQueueStatus && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={handleShowQueueStatus}
                >
                  Queue Status
                </Button>
              )}
            </div>
          )}
          
          {type === 'past' && (
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Request Follow-up
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
