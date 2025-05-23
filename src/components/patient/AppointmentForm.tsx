
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PhoneCall } from "lucide-react";

const appointmentSchema = z.object({
  department: z.string().min(1, "Department is required"),
  doctor: z.string().min(1, "Doctor is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  time: z.string().min(1, "Time slot is required"),
  notes: z.string().optional(),
  isEmergency: z.enum(["yes", "no"]),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormValues) => void;
}

const AppointmentForm = ({ onSubmit }: AppointmentFormProps) => {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      department: "",
      doctor: "",
      notes: "",
      time: "",
      isEmergency: "no",
    },
  });

  const handleSubmit = (data: AppointmentFormValues) => {
    if (data.isEmergency === "yes") {
      setShowEmergencyDialog(true);
    } else {
      onSubmit(data);
    }
  };

  const handleConfirmEmergency = () => {
    setShowEmergencyDialog(false);
    onSubmit(form.getValues());
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Book a New Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                <FormLabel>Is this an emergency?</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex space-x-8"
                    onValueChange={(value) => form.setValue("isEmergency", value as "yes" | "no")}
                    defaultValue="no"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="emergency-yes" />
                      <FormLabel htmlFor="emergency-yes" className="font-normal cursor-pointer">Yes</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="emergency-no" />
                      <FormLabel htmlFor="emergency-no" className="font-normal cursor-pointer">No</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage>{form.formState.errors.isEmergency?.message}</FormMessage>
              </FormItem>
              
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
              
              <Button type="submit" className="w-full">
                Request Appointment
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

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
