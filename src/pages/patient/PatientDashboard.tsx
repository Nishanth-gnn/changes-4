
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, CheckCircle, AlertCircle, Calendar as CalendarIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import DatePicker from "@/components/DatePicker";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  estimatedWaitTime: 25, // minutes
  totalInQueue: 8,
  department: "Cardiology",
  averageProcessingTime: 8 // minutes per patient
};

// Validation schema for appointment booking
const appointmentSchema = z.object({
  department: z.string().min(1, "Department is required"),
  doctor: z.string().min(1, "Doctor is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  time: z.string().min(1, "Time slot is required"),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const PatientDashboard = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const percentComplete = 100 - ((queueStatus.position / queueStatus.totalInQueue) * 100);
  
  // Initialize the form with validation
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      department: "",
      doctor: "",
      notes: "",
      time: "",
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentComplete), 500);
    return () => clearTimeout(timer);
  }, [percentComplete]);
  
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const onSubmit = (data: AppointmentFormValues) => {
    // Create a new appointment from form data
    const newAppointment = {
      id: `a${Date.now()}`,
      department: data.department,
      doctor: getDoctorName(data.doctor),
      date: data.date.toISOString().split('T')[0],
      time: data.time,
      status: "scheduled"
    };

    // Add to user's upcoming appointments
    setUserData(prev => ({
      ...prev,
      upcomingAppointments: [...prev.upcomingAppointments, newAppointment]
    }));

    // Reset form and show success message
    form.reset();
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

  const getQueueStatusBadge = (status: string) => {
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

  const signOut = () => {
    setIsAuthenticated(false);
    toast.success("Signed out successfully!");
    // In a real app, redirect to login page
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

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
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
                      {getQueueStatusBadge(appointment.status)}
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
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1" 
                          onClick={() => rescheduleAppointment(appointment.id)}
                        >
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
                <Card key={appointment.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="text-xl font-semibold">{appointment.department}</h3>
                      </div>
                      {getQueueStatusBadge('completed')}
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...form.register("department")}
                          >
                            <option value="">Select a department</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="dermatology">Dermatology</option>
                            <option value="neurology">Neurology</option>
                            <option value="orthopedics">Orthopedics</option>
                            <option value="pediatrics">Pediatrics</option>
                            <option value="general">General Medicine</option>
                          </select>
                        </FormControl>
                        <FormMessage>{form.formState.errors.department?.message}</FormMessage>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...form.register("doctor")}
                          >
                            <option value="">Select a doctor</option>
                            <option value="dr-smith">Dr. Sarah Smith</option>
                            <option value="dr-johnson">Dr. Michael Johnson</option>
                            <option value="dr-chen">Dr. Emily Chen</option>
                            <option value="dr-patel">Dr. Raj Patel</option>
                          </select>
                        </FormControl>
                        <FormMessage>{form.formState.errors.doctor?.message}</FormMessage>
                      </FormItem>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <DatePicker 
                            date={form.getValues("date")} 
                            onDateChange={(date) => form.setValue("date", date as Date, { shouldValidate: true })}
                          />
                        </FormControl>
                        <FormMessage>{form.formState.errors.date?.message}</FormMessage>
                      </FormItem>
                      
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...form.register("time")}
                          >
                            <option value="">Select a time slot</option>
                            <option value="9:00 AM">9:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:00 AM">11:00 AM</option>
                            <option value="1:00 PM">1:00 PM</option>
                            <option value="2:00 PM">2:00 PM</option>
                            <option value="3:00 PM">3:00 PM</option>
                          </select>
                        </FormControl>
                        <FormMessage>{form.formState.errors.time?.message}</FormMessage>
                      </FormItem>
                    </div>
                    
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <textarea
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Please include any specific concerns or symptoms"
                          rows={3}
                          {...form.register("notes")}
                        />
                      </FormControl>
                      <FormMessage>{form.formState.errors.notes?.message}</FormMessage>
                    </FormItem>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                    >
                      Request Appointment
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
