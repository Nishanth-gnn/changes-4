
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/DatePicker";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PhoneCall } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const regularAppointmentSchema = z.object({
  department: z.string().min(1, "Department is required"),
  doctor: z.string().min(1, "Doctor is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  time: z.string().min(1, "Time slot is required"),
  notes: z.string().optional(),
});

const emergencyAppointmentSchema = z.object({
  emergencyType: z.enum(["injury", "accident", "disease"], {
    required_error: "Emergency type is required",
  }),
  notes: z.string().optional(),
});

type RegularAppointmentFormValues = z.infer<typeof regularAppointmentSchema>;
type EmergencyAppointmentFormValues = z.infer<typeof emergencyAppointmentSchema>;

interface AppointmentFormProps {
  onSubmit: (data: any) => void;
}

const AppointmentForm = ({ onSubmit }: AppointmentFormProps) => {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  
  const regularForm = useForm<RegularAppointmentFormValues>({
    resolver: zodResolver(regularAppointmentSchema),
    defaultValues: {
      department: "",
      doctor: "",
      notes: "",
      time: "",
    },
  });

  const emergencyForm = useForm<EmergencyAppointmentFormValues>({
    resolver: zodResolver(emergencyAppointmentSchema),
    defaultValues: {
      notes: "",
      emergencyType: "injury",
    },
  });

  const handleRegularSubmit = (data: RegularAppointmentFormValues) => {
    onSubmit({
      ...data,
      isEmergency: "no"
    });
  };

  const handleEmergencySubmit = (data: EmergencyAppointmentFormValues) => {
    setShowEmergencyDialog(true);
    // The final submission will happen after dialog confirmation
  };

  const handleConfirmEmergency = () => {
    setShowEmergencyDialog(false);
    onSubmit({
      ...emergencyForm.getValues(),
      // Set default values for required fields in the appointment object
      department: "emergency",
      doctor: "emergency doctor",
      date: new Date(),
      time: "ASAP",
      isEmergency: "yes"
    });
  };

  return (
    <>
      <Tabs defaultValue="regular" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="regular" className="flex-1">Regular Appointment</TabsTrigger>
          <TabsTrigger value="emergency" className="flex-1">Emergency Booking</TabsTrigger>
        </TabsList>

        <TabsContent value="regular">
          <Card>
            <CardHeader>
              <CardTitle>Book a Regular Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...regularForm}>
                <form onSubmit={regularForm.handleSubmit(handleRegularSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...regularForm.register("department")}
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
                      <FormMessage>{regularForm.formState.errors.department?.message}</FormMessage>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Doctor</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...regularForm.register("doctor")}
                        >
                          <option value="">Select a doctor</option>
                          <option value="dr-smith">Dr. Sarah Smith</option>
                          <option value="dr-johnson">Dr. Michael Johnson</option>
                          <option value="dr-chen">Dr. Emily Chen</option>
                          <option value="dr-patel">Dr. Raj Patel</option>
                        </select>
                      </FormControl>
                      <FormMessage>{regularForm.formState.errors.doctor?.message}</FormMessage>
                    </FormItem>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePicker 
                          date={regularForm.getValues("date")} 
                          onDateChange={(date) => regularForm.setValue("date", date as Date, { shouldValidate: true })}
                        />
                      </FormControl>
                      <FormMessage>{regularForm.formState.errors.date?.message}</FormMessage>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...regularForm.register("time")}
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
                      <FormMessage>{regularForm.formState.errors.time?.message}</FormMessage>
                    </FormItem>
                  </div>
                  
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Please include any specific concerns or symptoms"
                        rows={3}
                        {...regularForm.register("notes")}
                      />
                    </FormControl>
                    <FormMessage>{regularForm.formState.errors.notes?.message}</FormMessage>
                  </FormItem>
                  
                  <Button type="submit" className="w-full">
                    Request Appointment
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency">
          <Card className="border-orange-300">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-orange-700">Emergency Booking</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...emergencyForm}>
                <form onSubmit={emergencyForm.handleSubmit(handleEmergencySubmit)} className="space-y-6">
                  <FormItem>
                    <FormLabel>Select Type of Emergency</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-col space-y-3"
                        onValueChange={(value) => emergencyForm.setValue("emergencyType", value as "injury" | "accident" | "disease")}
                        defaultValue="injury"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="injury" id="emergency-injury" />
                          <FormLabel htmlFor="emergency-injury" className="font-normal cursor-pointer">Injury</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="accident" id="emergency-accident" />
                          <FormLabel htmlFor="emergency-accident" className="font-normal cursor-pointer">Accident</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="disease" id="emergency-disease" />
                          <FormLabel htmlFor="emergency-disease" className="font-normal cursor-pointer">Disease</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage>{emergencyForm.formState.errors.emergencyType?.message}</FormMessage>
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Please describe your emergency in detail"
                        rows={3}
                        {...emergencyForm.register("notes")}
                      />
                    </FormControl>
                    <FormMessage>{emergencyForm.formState.errors.notes?.message}</FormMessage>
                  </FormItem>
                  
                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                    Request Emergency Appointment
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Emergency Dialog */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-600 flex items-center gap-2">
              <PhoneCall className="h-5 w-5" /> Emergency Contact
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <p className="mb-4 text-center">For emergency situations, please contact the hospital staff immediately:</p>
            <p className="text-2xl font-bold text-center text-orange-600">+1 (555) 123-4567</p>
            <p className="mt-4 text-sm text-gray-500 text-center">Our emergency response team is available 24/7</p>
            <p className="mt-4 text-sm text-orange-600 font-semibold text-center">Please reach the hospital within an hour</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmergencyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmEmergency} className="bg-orange-600 hover:bg-orange-700">
              Continue with Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentForm;
