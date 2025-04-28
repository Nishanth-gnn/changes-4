import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QueueStatusCard from "@/components/patient/QueueStatusCard";
import QueueStatusIndicator from "@/components/patient/QueueStatusIndicator";
import AppointmentCard from "@/components/patient/AppointmentCard";
import AppointmentForm from "@/components/patient/AppointmentForm";

const PatientDashboard = () => {
  const [activeAppointment, setActiveAppointment] = useState<any>(null);
  const [currentStatus, setCurrentStatus] = useState<'waiting' | 'called' | 'completed'>('waiting');
  const [queuePosition, setQueuePosition] = useState(3);

  // Mock patient data
  const patientData = {
    name: "Alex Johnson",
    patientId: "P10045872"
  };

  // Mock queue status
  const queueStatus = {
    position: queuePosition,
    estimatedWaitTime: 15,
    totalInQueue: 8,
    department: "Cardiology",
    averageProcessingTime: 12
  };

  // Demo function to simulate status changes
  const simulateStatusChange = () => {
    if (currentStatus === 'waiting') {
      setCurrentStatus('called');
      toast.success("You've been called! Please proceed to your designated room.");
    } else if (currentStatus === 'called') {
      setCurrentStatus('completed');
      toast.success("Your appointment has been completed!");
    } else {
      setCurrentStatus('waiting');
      setQueuePosition(Math.floor(Math.random() * 5) + 1);
      toast.info("You've been added to the waiting queue.");
    }
  };

  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: "apt1",
      department: "Cardiology",
      doctor: "Dr. Sarah Smith",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "scheduled",
      notes: "Annual heart checkup"
    },
    {
      id: "apt2",
      department: "General Medicine",
      doctor: "Dr. Michael Johnson",
      date: "2023-06-28",
      time: "2:30 PM",
      status: "scheduled"
    }
  ];
  
  // Mock past appointments
  const pastAppointments = [
    {
      id: "apt3",
      department: "Dermatology",
      doctor: "Dr. Emily Chen",
      date: "2023-05-20",
      time: "11:15 AM",
      status: "completed",
      notes: "Skin condition follow-up"
    },
    {
      id: "apt4",
      department: "Orthopedics",
      doctor: "Dr. Robert Williams",
      date: "2023-04-10",
      time: "9:00 AM",
      status: "completed"
    }
  ];

  const handleSubmitAppointment = (data: any) => {
    console.log("New appointment request:", data);
    toast.success("Appointment request submitted successfully!");
  };

  const handleReschedule = (id: string) => {
    console.log("Reschedule appointment:", id);
    toast.info("Reschedule request submitted.");
  };

  const handleCancel = (id: string) => {
    console.log("Cancel appointment:", id);
    toast.success("Appointment cancelled successfully.");
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome, {patientData.name} • ID: {patientData.patientId}</p>
          </div>
        </div>

        {/* Queue Status Section with the indicator */}
        <QueueStatusIndicator 
          status={currentStatus} 
          position={currentStatus === 'waiting' ? queuePosition : undefined} 
        />
        
        {currentStatus === 'waiting' && (
          <QueueStatusCard queueStatus={queueStatus} />
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="upcoming" className="mt-6">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
            <TabsTrigger value="book">Book Appointment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id}
                  appointment={appointment}
                  type="upcoming"
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id}
                  appointment={appointment}
                  type="past"
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="book">
            <div className="max-w-2xl mx-auto">
              <AppointmentForm onSubmit={handleSubmitAppointment} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
