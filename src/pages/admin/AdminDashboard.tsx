import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Calendar, 
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
  CheckCircle,
  AlertCircle,
  View,
  Edit
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const adminData = {
  name: "Admin User",
  role: "System Administrator"
};

const departmentStats = [
  {
    id: "d1",
    name: "Cardiology",
    patientsToday: 45,
    avgWaitTime: 22,
    staffAvailable: 8,
    status: "normal"
  },
  {
    id: "d2",
    name: "Neurology",
    patientsToday: 32,
    avgWaitTime: 18,
    staffAvailable: 6,
    status: "normal"
  },
  {
    id: "d3",
    name: "Pediatrics",
    patientsToday: 51,
    avgWaitTime: 35,
    staffAvailable: 7,
    status: "busy"
  },
  {
    id: "d4",
    name: "Orthopedics",
    patientsToday: 29,
    avgWaitTime: 15,
    staffAvailable: 5,
    status: "normal"
  },
  {
    id: "d5",
    name: "Dermatology",
    patientsToday: 22,
    avgWaitTime: 12,
    staffAvailable: 4,
    status: "low"
  },
  {
    id: "d6",
    name: "General Medicine",
    patientsToday: 63,
    avgWaitTime: 42,
    staffAvailable: 10,
    status: "critical"
  }
];

const staffList = [
  {
    id: "s1",
    name: "Dr. Sarah Smith",
    role: "Cardiologist",
    department: "Cardiology",
    status: "active"
  },
  {
    id: "s2",
    name: "Dr. Michael Johnson",
    role: "Neurologist",
    department: "Neurology",
    status: "active"
  },
  {
    id: "s3",
    name: "Dr. Emily Chen",
    role: "Pediatrician",
    department: "Pediatrics",
    status: "offline"
  },
  {
    id: "s4",
    name: "Dr. Robert Williams",
    role: "Orthopedic Surgeon",
    department: "Orthopedics",
    status: "active"
  },
  {
    id: "s5",
    name: "Nurse Jessica Brown",
    role: "Head Nurse",
    department: "Cardiology",
    status: "active"
  },
  {
    id: "s6",
    name: "Nurse Thomas Miller",
    role: "Registered Nurse",
    department: "General Medicine",
    status: "active"
  }
];

const systemMetrics = {
  totalPatients: 242,
  totalAppointments: 310,
  avgWaitTime: 28,
  patientSatisfaction: 4.7
};

const AdminDashboard = () => {
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchStaff, setSearchStaff] = useState("");
  
  const filteredDepartments = departmentStats.filter(dep =>
    dep.name.toLowerCase().includes(searchDepartment.toLowerCase())
  );
  
  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(searchStaff.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchStaff.toLowerCase())
  );

  const getDepartmentStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-green-500">Normal</Badge>;
      case 'busy':
        return <Badge className="bg-yellow-500">Busy</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Low Traffic</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStaffStatusIndicator = (status: string) => {
    return (
      <div className="flex items-center">
        <div className={`h-2 w-2 rounded-full mr-2 ${
          status === 'active' ? 'bg-green-500' : 'bg-gray-400'
        }`}></div>
        <span>{status === 'active' ? 'Online' : 'Offline'}</span>
      </div>
    );
  };

  const handleViewDetails = (type: 'department' | 'staff', name: string) => {
    toast.success(`Viewing details for ${name}`, {
      description: `Opening ${type} details view`,
      action: {
        label: "Close",
        onClick: () => console.log("Closed toast")
      }
    });
  };

  const handleEdit = (type: 'department' | 'staff', name: string) => {
    toast.success(`Editing ${name}`, {
      description: `Opening ${type} edit form`,
      action: {
        label: "Close",
        onClick: () => console.log("Closed toast")
      }
    });
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {adminData.name} • {adminData.role}</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Patients Today</span>
                <span className="text-3xl font-bold">{systemMetrics.totalPatients}</span>
                <span className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" /> 12% from yesterday
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Appointments</span>
                <span className="text-3xl font-bold">{systemMetrics.totalAppointments}</span>
                <span className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" /> 8% from yesterday
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Average Wait Time</span>
                <span className="text-3xl font-bold">{systemMetrics.avgWaitTime} min</span>
                <span className="text-sm text-red-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" /> 5% from yesterday
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Patient Satisfaction</span>
                <span className="text-3xl font-bold">{systemMetrics.patientSatisfaction}/5</span>
                <span className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" /> 0.2 from last week
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="departments">
          <TabsList className="mb-6">
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="departments">
            <Card>
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3">
                <div>
                  <CardTitle>Department Overview</CardTitle>
                  <CardDescription>Monitor and manage department performance</CardDescription>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Input 
                    placeholder="Search departments..." 
                    className="max-w-[250px]"
                    value={searchDepartment}
                    onChange={(e) => setSearchDepartment(e.target.value)}
                  />
                  <Button variant="outline" onClick={() => toast.success("Department report generated!")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Patients Today</TableHead>
                      <TableHead>Avg. Wait Time</TableHead>
                      <TableHead>Staff Available</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDepartments.length > 0 ? (
                      filteredDepartments.map((department) => (
                        <TableRow key={department.id}>
                          <TableCell className="font-medium">{department.name}</TableCell>
                          <TableCell>{department.patientsToday}</TableCell>
                          <TableCell>{department.avgWaitTime} min</TableCell>
                          <TableCell>{department.staffAvailable}</TableCell>
                          <TableCell>{getDepartmentStatusBadge(department.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleViewDetails('department', department.name)}
                              >
                                <View className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit('department', department.name)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                          No departments found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Busiest Department</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">General Medicine</p>
                          <p className="text-gray-500">63 patients today</p>
                        </div>
                        <Activity className="h-10 w-10 text-red-500" />
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-500">Recommendation</p>
                        <p className="text-sm font-medium text-red-600">Consider reassigning staff to help with high volume</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Most Efficient</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">Dermatology</p>
                          <p className="text-gray-500">12 min avg. wait time</p>
                        </div>
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-500">Performance</p>
                        <p className="text-sm font-medium text-green-600">25% faster than hospital average</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Needs Attention</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold">Pediatrics</p>
                          <p className="text-gray-500">35 min avg. wait time</p>
                        </div>
                        <AlertCircle className="h-10 w-10 text-yellow-500" />
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-500">Recommendation</p>
                        <p className="text-sm font-medium text-yellow-600">Review scheduling process to reduce wait times</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="staff">
            <Card>
              <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3">
                <div>
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>Manage hospital staff and access</CardDescription>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Input 
                    placeholder="Search staff or department..." 
                    className="max-w-[250px]"
                    value={searchStaff}
                    onChange={(e) => setSearchStaff(e.target.value)}
                  />
                  <Button onClick={() => toast.success("New staff member form opened")}>
                    <Users className="h-4 w-4 mr-2" />
                    Add Staff
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.length > 0 ? (
                      filteredStaff.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell className="font-medium">{staff.name}</TableCell>
                          <TableCell>{staff.role}</TableCell>
                          <TableCell>{staff.department}</TableCell>
                          <TableCell>{getStaffStatusIndicator(staff.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleViewDetails('staff', staff.name)}
                              >
                                <View className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit('staff', staff.name)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                          No staff members found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure hospital queue management system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">General Settings</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="hospital-name">Hospital Name</Label>
                        <Input id="hospital-name" defaultValue="General Hospital" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Hospital Address</Label>
                        <Input id="address" defaultValue="123 Healthcare Avenue, Medical District" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" defaultValue="info@generalhospital.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Contact Phone</Label>
                        <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Queue Settings</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="operating-hours">Operating Hours</Label>
                        <Select defaultValue="8am-6pm">
                          <SelectTrigger id="operating-hours">
                            <SelectValue placeholder="Select operating hours" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Hours</SelectLabel>
                              <SelectItem value="8am-5pm">8:00 AM - 5:00 PM</SelectItem>
                              <SelectItem value="8am-6pm">8:00 AM - 6:00 PM</SelectItem>
                              <SelectItem value="9am-5pm">9:00 AM - 5:00 PM</SelectItem>
                              <SelectItem value="9am-6pm">9:00 AM - 6:00 PM</SelectItem>
                              <SelectItem value="24hours">24 Hours</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="appointment-duration">Default Appointment Duration</Label>
                        <Select defaultValue="15">
                          <SelectTrigger id="appointment-duration">
                            <SelectValue placeholder="Select appointment duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Minutes</SelectLabel>
                              <SelectItem value="10">10 minutes</SelectItem>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="20">20 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="45">45 minutes</SelectItem>
                              <SelectItem value="60">60 minutes</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notification-time">Notification Time Before Appointment</Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="notification-time">
                            <SelectValue placeholder="Select notification time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Minutes</SelectLabel>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                              <SelectItem value="1440">1 day</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="max-appointments">Maximum Daily Appointments</Label>
                        <Input id="max-appointments" type="number" defaultValue="500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Notification Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          checked
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          onChange={() => toast.success("Email notification settings updated")}
                        />
                        <Label htmlFor="email-notifications">Enable Email Notifications</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="sms-notifications"
                          checked
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          onChange={() => toast.success("SMS notification settings updated")}
                        />
                        <Label htmlFor="sms-notifications">Enable SMS Notifications</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="queue-updates"
                          checked
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          onChange={() => toast.success("Queue update settings updated")}
                        />
                        <Label htmlFor="queue-updates">Send Real-Time Queue Updates</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="appointment-reminders"
                          checked
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          onChange={() => toast.success("Appointment reminder settings updated")}
                        />
                        <Label htmlFor="appointment-reminders">Send Appointment Reminders</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => toast.info("Settings reset to defaults")}>
                      Reset to Default
                    </Button>
                    <Button onClick={() => toast.success("Settings saved successfully!")}>
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
