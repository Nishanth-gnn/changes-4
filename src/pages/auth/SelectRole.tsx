
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { User, Calendar, BarChart3 } from "lucide-react";

const SelectRole = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  if (!user) {
    return (
      <Layout>
        <div className="page-container py-12 text-center">
          <p>Please sign in to continue.</p>
        </div>
      </Layout>
    );
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleSubmit = () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }

    // Navigate based on selected role
    switch (selectedRole) {
      case "patient":
        navigate("/patient");
        break;
      case "staff":
        navigate("/staff");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        toast.error("Invalid role selection");
    }
  };

  return (
    <Layout>
      <div className="page-container py-12 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* User Profile Card */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white rounded-full p-2 w-24 h-24 flex items-center justify-center">
                  {user.imageUrl ? (
                    <img src={user.imageUrl} alt={user.fullName || "User"} className="rounded-full w-20 h-20 object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-primary" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{user.fullName || "Welcome"}</h2>
                  <p className="text-blue-100">{user.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-lg font-medium text-center mb-2">Successfully authenticated with Clerk!</p>
                <p className="text-center text-gray-600">Please select your role to continue.</p>
              </div>
            </CardContent>
          </Card>

          <CardTitle className="text-2xl mb-6">Select Your Role</CardTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${selectedRole === "patient" ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleRoleSelect("patient")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-4 mb-2">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Patient</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Book appointments, track your queue position, and manage your healthcare.
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${selectedRole === "staff" ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleRoleSelect("staff")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-4 mb-2">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage patient queues, update appointments, and access patient information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover:shadow-lg ${selectedRole === "admin" ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleRoleSelect("admin")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-4 mb-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Configure system settings, manage departments and staff, and monitor performance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleSubmit} size="lg" className="px-8">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SelectRole;
