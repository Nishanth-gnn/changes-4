import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  Users, 
  Calendar,
  CheckCircle, 
  AlertCircle,
  ArrowUp,
  ArrowDown,
  ArrowRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock data
const staffData = {
  name: "Dr. Sarah Smith",
  department: "Cardiology",
  role: "Specialist"
};

const queueData = {
  current: [
    {
      id: "p1",
      name: "John Doe",
      patientId: "P12345",
      time: "10:00 AM",
      waitTime: 5,
      status: "in-consultation"
    },
    {
      id: "p2",
      name: "Jane Smith",
      patientId: "P12346",
      time: "10:15 AM",
      waitTime: 20,
      status: "waiting"
    },
    {
      id: "p3",
      name: "Robert Johnson",
      patientId: "P12347",
      time: "10:30 AM",
      waitTime: 35,
      status: "waiting"
    },
    {
      id: "p4",
      name: "Emily Davis",
      patientId: "P12348",
      time: "10:45 AM",
      waitTime: 50,
      status: "waiting"
    }
  ],
  upcoming: [
    {
      id: "p5",
      name: "Michael Brown",
      patientId: "P12349",
      time: "11:00 AM",
      appointmentType: "Follow-up"
    },
    {
      id: "p6",
      name: "Sarah Wilson",
      patientId: "P12350",
      time: "11:15 AM",
      appointmentType: "New Patient"
    },
    {
      id: "p7",
      name: "James Taylor",
      patientId: "P12351",
      time: "11:30 AM",
      appointmentType: "Annual Check-up"
    }
  ]
};

const departmentStats = {
  totalPatients: 32,
  completedToday: 15,
  averageWaitTime: 24,
  peakHours: "10:00 AM - 12:00 PM"
};

const StaffDashboard = () => {
  const [queue, setQueue] = useState(queueData.current);
  
  const movePatient = (patientId: string, direction: 'up' | 'down') => {
    const newQueue = [...queue];
    const index = newQueue.findIndex(patient => patient.id === patientId);
    
    if (direction === 'up' && index > 0) {
      [newQueue[index - 1], newQueue[index]] = [newQueue[index], newQueue[index - 1]];
      setQueue(newQueue);
      toast.success("Queue order updated");
    } else if (direction === 'down' && index < newQueue.length - 1) {
      [newQueue[index], newQueue[index + 1]] = [newQueue[index + 1], newQueue[index]];
      setQueue(newQueue);
      toast.success("Queue order updated");
    }
  };

  const updatePatientStatus = (patientId: string, newStatus: string) => {
    const newQueue = queue.map(patient => 
      patient.id === patientId ? { ...patient, status: newStatus } : patient
    );
    setQueue(newQueue);
    
    if (newStatus === 'completed') {
      setTimeout(() => {
        setQueue(prev => prev.filter(patient => patient.id !== patientId));
        toast.success(`Patient ${patientId} checkout complete`);
      }, 1000);
    } else {
      toast.success(`Patient status updated to ${newStatus}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-consultation':
        return <Badge className="bg-primary">In Consultation</Badge>;
      case 'waiting':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600">Waiting</Badge>;
      case 'no-show':
        return <Badge variant="destructive">No Show</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Staff Dashboard</h1>
            <p className="text-gray-600">{staffData.name} • {staffData.department} • {staffData.role}</p>
          </div>
        </div>

        {/* Department Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Patients Today</span>
                <span className="text-3xl font-bold">{departmentStats.totalPatients}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Completed Consultations</span>
                <span className="text-3xl font-bold">{departmentStats.completedToday}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Average Wait Time</span>
                <span className="text-3xl font-bold">{departmentStats.averageWaitTime} min</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Peak Hours</span>
                <span className="text-3xl font-bold">{departmentStats.peakHours}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current-queue">
          <TabsList className="mb-6">
            <TabsTrigger value="current-queue">Current Queue</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current-queue">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>Patient Queue</CardTitle>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Search patients..." 
                          className="max-w-[200px]"
                        />
                        <Button variant="outline" size="sm">
                          Add Patient
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {queue.length > 0 ? (
                        queue.map((patient, index) => (
                          <div 
                            key={patient.id} 
                            className={`p-4 border rounded-md ${
                              patient.status === 'in-consultation' ? 'bg-primary/5 border-primary/20' : 'bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-4">
                                  <AvatarFallback>{patient.name.charAt(0)}{patient.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{patient.name}</p>
                                  <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="text-sm">Appointment: <span className="font-medium">{patient.time}</span></p>
                                  <p className="text-sm text-gray-500">Waiting: {patient.waitTime} min</p>
                                </div>
                                {getStatusBadge(patient.status)}
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  disabled={index === 0}
                                  onClick={() => movePatient(patient.id, 'up')}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                  <span className="sr-only">Move up</span>
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  disabled={index === queue.length - 1}
                                  onClick={() => movePatient(patient.id, 'down')}
                                >
                                  <ArrowDown className="h-4 w-4" />
                                  <span className="sr-only">Move down</span>
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                {patient.status === 'waiting' && (
                                  <Button 
                                    size="sm" 
                                    onClick={() => updatePatientStatus(patient.id, 'in-consultation')}
                                  >
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    Start Consultation
                                  </Button>
                                )}
                                {patient.status === 'in-consultation' && (
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updatePatientStatus(patient.id, 'completed')}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Complete
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant={patient.status === 'no-show' ? 'default' : 'outline'}
                                  className={patient.status === 'no-show' ? 'bg-destructive' : ''}
                                  onClick={() => updatePatientStatus(patient.id, patient.status === 'no-show' ? 'waiting' : 'no-show')}
                                >
                                  {patient.status === 'no-show' ? 'Mark Present' : 'No Show'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-600">No Patients in Queue</h3>
                          <p className="text-gray-500 mt-2">All patients have been seen or no appointments are scheduled.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:w-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle>Queue Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Patients in queue</span>
                          <span className="font-medium">{queue.length}</span>
                        </div>
                        <Progress value={queue.length > 0 ? (100 / 10) * queue.length : 0} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Currently in consultation</span>
                          <span className="font-medium">
                            {queue.filter(p => p.status === 'in-consultation').length}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Waiting</span>
                          <span className="font-medium">
                            {queue.filter(p => p.status === 'waiting').length}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">No-shows</span>
                          <span className="font-medium">
                            {queue.filter(p => p.status === 'no-show').length}
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Department Status</h4>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span>Normal Operations</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Current wait time is below average. No delays reported.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queueData.upcoming.map((patient) => (
                    <div key={patient.id} className="p-4 border rounded-md bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarFallback>{patient.name.charAt(0)}{patient.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-500">ID: {patient.patientId}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm">Appointment: <span className="font-medium">{patient.time}</span></p>
                            <p className="text-sm text-gray-500">{patient.appointmentType}</p>
                          </div>
                          <Badge variant="outline" className="bg-gray-50">Scheduled</Badge>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex justify-end items-center gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setQueue(prev => [...prev, {
                              ...patient,
                              waitTime: 0,
                              status: 'waiting'
                            }]);
                            toast.success(`${patient.name} added to current queue`);
                          }}
                        >
                          Add to Queue
                        </Button>
                      </div>
                    </div>
                  ))}

                  {queueData.upcoming.length === 0 && (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-600">No Upcoming Appointments</h3>
                      <p className="text-gray-500 mt-2">There are no more appointments scheduled for today.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StaffDashboard;
