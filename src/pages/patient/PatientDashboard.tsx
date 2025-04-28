
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import QueueStatusCard from "@/components/patient/QueueStatusCard";
import AppointmentCard from "@/components/patient/AppointmentCard";
import AppointmentForm from "@/components/patient/AppointmentForm";

// Mock data
const initialUserData = {
  name: "John Doe",
  patientId: "P12345",
  upcomingAppointments: [
    {
      id: "a1",
      department: "Cardiology",
      doctor: "Dr. Sarah Smith",
      date: "2025-05-05",
      time: "09:30 AM",
      status: "scheduled"
    },
    {
      id: "a2",
      department: "Neurology",
      doctor: "Dr. Michael Johnson",
      date: "2025-05-15",
      time: "02:00 PM",
      status: "scheduled"
    }
  ],
  pastAppointments: [
    {
      id: "a0",
      department: "General Medicine",
      doctor: "Dr. Emily Chen",
      date: "2025-04-20",
      time: "10:00 AM",
      status: "completed",
      notes: "Annual checkup completed. Blood work ordered."
    }
  ]
};

const queueStatus = {
  position: 3,
  estimatedWaitTime: 25,
  totalInQueue: 8,
  department: "Cardiology",
  averageProcessingTime: 8
};

const PatientDashboard = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const cancelAppointment = (appointmentId: string) => {
    setUserData(prev => ({
      ...prev,
      upcomingAppointments: prev.upcomingAppointments.filter(apt => apt.id !== appointmentId)
    }));
    toast.success("Appointment cancelled successfully!");
  };

  const rescheduleAppointment = (appointmentId: string) => {
    setActiveTab("book");
    toast.info("Fill in the form to reschedule your appointment");
  };

  const handleAppointmentSubmit = (data: any) => {
    const newAppointment = {
      id: `a${Date.now()}`,
      department: data.department,
      doctor: getDoctorName(data.doctor),
      date: data.date.toISOString().split('T')[0],
      time: data.time,
      status: "scheduled"
    };

    setUserData(prev => ({
      ...prev,
      upcomingAppointments: [...prev.upcomingAppointments, newAppointment]
    }));

    toast.success("Appointment booked successfully!");
    setActiveTab("upcoming");
  };

  const getDoctorName = (doctorId: string): string => {
    const doctors: Record<string, string> = {
      "dr-smith": "Dr. Sarah Smith",
      "dr-johnson": "Dr. Michael Johnson",
      "dr-chen": "Dr. Emily Chen",
      "dr-patel": "Dr. Raj Patel"
    };
    return doctors[doctorId] || doctorId;
  };

  const signOut = () => {
    setIsAuthenticated(false);
    toast.success("Signed out successfully!");
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name}</h1>
            <p className="text-gray-600">Patient ID: {userData.patientId}</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button className="mt-4 md:mt-0" asChild>
              <a href="#book">Book New Appointment</a>
            </Button>
            {isAuthenticated && (
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {queueStatus.position > 0 && (
          <QueueStatusCard queueStatus={queueStatus} />
        )}

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
            <TabsTrigger value="book" id="book">Book Appointment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  type="upcoming"
                  onReschedule={rescheduleAppointment}
                  onCancel={cancelAppointment}
                />
              ))}

              {userData.upcomingAppointments.length === 0 && (
                <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600">No Upcoming Appointments</h3>
                  <p className="text-gray-500 mt-2">Schedule a new appointment to get started.</p>
                  <Button className="mt-4" onClick={() => setActiveTab("book")}>
                    Book Appointment
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  type="past"
                />
              ))}

              {userData.pastAppointments.length === 0 && (
                <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600">No Past Appointments</h3>
                  <p className="text-gray-500 mt-2">Your appointment history will appear here.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="book">
            <AppointmentForm onSubmit={handleAppointmentSubmit} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
