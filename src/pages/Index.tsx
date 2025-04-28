
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  Calendar, 
  Clock, 
  User, 
  BarChart3,
  BellRing,
  CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Easy Appointment Booking",
      description: "Schedule appointments online by selecting departments, doctors, and convenient time slots."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Real-Time Queue Updates",
      description: "Track your position in the queue and receive estimated wait times from anywhere."
    },
    {
      icon: <BellRing className="h-8 w-8 text-primary" />,
      title: "Smart Notifications",
      description: "Receive timely SMS/email reminders for appointments and queue status changes."
    },
    {
      icon: <User className="h-8 w-8 text-primary" />,
      title: "Profile Management",
      description: "Easily update personal details, medical history, and contact information."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Staff Analytics",
      description: "Access comprehensive dashboards for queue management and patient flow."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Feedback System",
      description: "Share your experience and help us improve our services continuously."
    }
  ];

  const testimonials = [
    {
      quote: "This system has transformed our patient experience. Wait times are down by 40% and patient satisfaction is at an all-time high.",
      author: "Dr. Sarah Johnson",
      position: "Medical Director, City Hospital"
    },
    {
      quote: "As a patient with chronic conditions, MediQueue has made my frequent hospital visits so much easier. I can plan my day better knowing exactly when I'll be seen.",
      author: "Michael Chen",
      position: "Patient"
    },
    {
      quote: "The administrative burden has been significantly reduced since implementing this system. Our staff can focus more on patient care rather than queue management.",
      author: "Emily Rodriguez",
      position: "Head Nurse, Memorial Healthcare"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="page-container">
          <div className="flex flex-col md:flex-row md:items-center py-12 md:py-24 gap-8">
            <div className="md:w-1/2 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Smart Hospital Queue Management System
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Streamline patient flow, reduce wait times, and enhance healthcare experiences with our innovative queue management solution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Hospital queue management system" 
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive solution offers everything you need to optimize patient flow and healthcare operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-blue-50 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Overview */}
      <section className="section bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tailored Solutions For Everyone</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers dedicated portals for patients, staff, and administrators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Patient Portal</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Book and manage appointments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Track queue position in real-time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Receive notifications and updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Manage personal information</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Button asChild>
                    <Link to="/patient">Patient Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <Clock className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Staff Portal</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Manage patient queues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Update appointment statuses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Access patient information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>View performance metrics</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Button asChild>
                    <Link to="/staff">Staff Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <BarChart3 className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Admin Portal</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Configure system settings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Manage departments and staff</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Generate comprehensive reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Monitor system performance</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Button asChild>
                    <Link to="/admin">Admin Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how MediQueue has transformed healthcare experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white">
        <div className="page-container">
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hospital Operations?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join hospitals nationwide that have reduced wait times by up to 40% and improved patient satisfaction with MediQueue.
            </p>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link to="/register">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
