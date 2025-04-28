
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, CheckCircle, AlertCircle, Calendar as CalendarIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock data
const userData = {
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
  estimatedWaitTime: 25, // minutes
  totalInQueue: 8,
  department: "Cardiology",
  averageProcessingTime: 8 // minutes per patient
};

const PatientDashboard = () => {
  const [progress, setProgress] = useState(0);
  const percentComplete = 100 - ((queueStatus.position / queueStatus.totalInQueue) * 100);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentComplete), 500);
    return () => clearTimeout(timer);
  }, [percentComplete]);
  
  const cancelAppointment = (appointmentId: string) => {
    console.log("Cancelling appointment:", appointmentId);
    toast.success("Appointment cancelled successfully!");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {userData.name}</h1>
            <p className="text-gray-600">Patient ID: {userData.patientId}</p>
          </div>
          <Button className="mt-4 md:mt-0" asChild>
            <a href="#book">Book New Appointment</a>
          </Button>
        </div>

        {queueStatus.position > 0 && (
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
        )}

        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
            <TabsTrigger value="book" id="book">Book Appointment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-semibold">{appointment.department}</h3>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">
                        {appointment.status === "scheduled" ? "Scheduled" : "In Progress"}
                      </Badge>
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
                      
                      <div className="pt-2 flex gap-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          Reschedule
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {userData.upcomingAppointments.length === 0 && (
                <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600">No Upcoming Appointments</h3>
                  <p className="text-gray-500 mt-2">Schedule a new appointment to get started.</p>
                  <Button className="mt-4" asChild>
                    <a href="#book">Book Appointment</a>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.pastAppointments.map((appointment) => (
                <Card key={appointment.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="text-xl font-semibold">{appointment.department}</h3>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                        Completed
                      </Badge>
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
                      
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Request Follow-up
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
            <Card>
              <CardHeader>
                <CardTitle>Book a New Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        id="department"
                        name="department"
                        placeholder="Select a department"
                        options={[
                          { value: "cardiology", label: "Cardiology" },
                          { value: "dermatology", label: "Dermatology" },
                          { value: "neurology", label: "Neurology" },
                          { value: "orthopedics", label: "Orthopedics" },
                          { value: "pediatrics", label: "Pediatrics" },
                          { value: "general", label: "General Medicine" }
                        ]}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Doctor</Label>
                      <Select
                        id="doctor"
                        name="doctor"
                        placeholder="Select a doctor"
                        options={[
                          { value: "dr-smith", label: "Dr. Sarah Smith" },
                          { value: "dr-johnson", label: "Dr. Michael Johnson" },
                          { value: "dr-chen", label: "Dr. Emily Chen" },
                          { value: "dr-patel", label: "Dr. Raj Patel" }
                        ]}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <div className="flex">
                        <Button variant="outline" className="w-full flex justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Pick a date</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Select
                        id="time"
                        name="time"
                        placeholder="Select a time slot"
                        options={[
                          { value: "9am", label: "9:00 AM" },
                          { value: "10am", label: "10:00 AM" },
                          { value: "11am", label: "11:00 AM" },
                          { value: "1pm", label: "1:00 PM" },
                          { value: "2pm", label: "2:00 PM" },
                          { value: "3pm", label: "3:00 PM" }
                        ]}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Please include any specific concerns or symptoms"
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => toast.success("Appointment requested successfully! You'll receive a confirmation shortly.")}
                  >
                    Request Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Helper components for the form
const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium">
      {children}
    </label>
  );
};

const Select = ({ 
  id, 
  name, 
  placeholder,
  options
}: { 
  id: string; 
  name: string; 
  placeholder: string;
  options: { value: string; label: string }[]
}) => {
  return (
    <select
      id={id}
      name={name}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="" disabled selected>{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

const Textarea = ({ 
  id, 
  name, 
  placeholder,
  rows = 3
}: { 
  id: string; 
  name: string; 
  placeholder: string;
  rows?: number;
}) => {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      rows={rows}
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
};

export default PatientDashboard;
