
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, Users, Activity, Award, HeartPulse } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Patient-Centered",
      description: "We design our solutions with patients' needs at the forefront."
    },
    {
      icon: <Activity className="h-8 w-8 text-primary" />,
      title: "Efficiency",
      description: "We strive for operational excellence and streamlined workflows."
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-primary" />,
      title: "Healthcare Quality",
      description: "We contribute to better healthcare experiences and outcomes."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "We continuously improve our solution with cutting-edge technology."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="page-container">
          <div className="py-12 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                About MediQueue
              </h1>
              <p className="text-xl text-gray-600">
                We're revolutionizing hospital queue management with innovative technology that improves patient experiences and hospital efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="page-container">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At MediQueue, our mission is to transform healthcare operations by eliminating inefficiencies in patient flow and queue management, allowing healthcare providers to focus on what matters most: patient care.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We believe that technology can play a vital role in improving healthcare access and experiences. Our queue management system is designed to reduce wait times, enhance patient satisfaction, and streamline hospital operations.
              </p>
              <p className="text-lg text-gray-600">
                By providing real-time visibility into queues and wait times, we empower both patients and healthcare providers with the information they need to make better decisions and improve outcomes.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Hospital staff collaborating" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our innovation and service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="section">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The evolution of MediQueue from concept to healthcare transformation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {/* Item 1 */}
                <div className="relative pl-12 md:pl-0">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">2020</h3>
                      <h4 className="text-lg font-medium mb-2">Inception</h4>
                      <p className="text-gray-600">MediQueue was founded with a vision to revolutionize hospital queue management and improve patient experiences.</p>
                    </div>
                    <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary"></div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-2"></div>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="relative pl-12 md:pl-0">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-2"></div>
                    <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary"></div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">2021</h3>
                      <h4 className="text-lg font-medium mb-2">First Implementation</h4>
                      <p className="text-gray-600">Successfully deployed our solution in three major hospitals, reducing wait times by 30% on average.</p>
                    </div>
                  </div>
                </div>
                
                {/* Item 3 */}
                <div className="relative pl-12 md:pl-0">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">2022</h3>
                      <h4 className="text-lg font-medium mb-2">Feature Expansion</h4>
                      <p className="text-gray-600">Added mobile notifications, multi-language support, and advanced analytics to better serve diverse hospital needs.</p>
                    </div>
                    <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary"></div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-2"></div>
                  </div>
                </div>
                
                {/* Item 4 */}
                <div className="relative pl-12 md:pl-0">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-2"></div>
                    <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary"></div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-1 md:order-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">Today</h3>
                      <h4 className="text-lg font-medium mb-2">Global Impact</h4>
                      <p className="text-gray-600">Now serving over 100 healthcare facilities worldwide, with continuous innovation to meet evolving healthcare needs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="page-container">
          <div className="text-center py-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Healthcare Revolution</h2>
            <p className="text-xl mb-8">
              Experience the benefits of efficient queue management and improved patient satisfaction with MediQueue.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
