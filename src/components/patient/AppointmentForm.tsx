
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/DatePicker";

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

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormValues) => void;
}

const AppointmentForm = ({ onSubmit }: AppointmentFormProps) => {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      department: "",
      doctor: "",
      notes: "",
      time: "",
    },
  });

  return (
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
            
            <Button type="submit" className="w-full">
              Request Appointment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
