"use client";
import {
  Menu,
  X,
  Truck,
  Package,
  Users,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon,
  Star,
  Clock,
  Shield,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Track", href: "#track" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Neno Sacco
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all ${
                  activeSection === item.href.slice(1)
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="bg-gray-200 dark:bg-gray-700"
            />
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            <button
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white dark:bg-gray-800 py-4 transition-colors duration-300">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 ">
        {/* Hero Section */}
        <section
          id="home"
          className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20 md:py-32 overflow-hidden"
        >
          {/* Moving background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 opacity-30 animate-bg-pan"></div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 animate-slide-in-up">
              Welcome to Neno Sacco
            </h1>

            <p className="text-xl md:text-2xl mb-8 animate-fade-in text-gray-100">
              Revolutionizing Courier Services Since 1998
            </p>

            {/* Button Group with Animations */}
            <div className="flex justify-center space-x-6">
              {/* Get Started Button */}
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-100 transition-transform transform hover:scale-105 shadow-lg animate-fade-in"
              >
                <Link href="/auth">Get Started</Link>
              </Button>



              {/* Track Button */}
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-transform transform hover:scale-105 shadow-lg animate-fade-in-delay-2"
              >
                <Link href="#track">Track Parcel</Link>
              </Button>
            </div>
          </div>
        </section>

        <style jsx>{`
          .animate-bg-pan {
            background-size: 200% 200%;
            animation: bgPan 10s infinite alternate ease-in-out;
          }

          @keyframes bgPan {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }

          .animate-slide-in-up {
            opacity: 0;
            transform: translateY(50px);
            animation: slideInUp 1.5s forwards;
          }

          @keyframes slideInUp {
            0% {
              opacity: 0;
              transform: translateY(50px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            opacity: 0;
            animation: fadeIn 1.5s forwards;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          .animate-fade-in-delay-1 {
            opacity: 0;
            animation: fadeIn 1.5s forwards 0.5s;
          }

          .animate-fade-in-delay-2 {
            opacity: 0;
            animation: fadeIn 1.5s forwards 1s;
          }
        `}</style>

        {/* About Section */}
        <section
          id="about"
          className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 "
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Our Journey
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                  height={400}
                  width={400}
                  src="/images/cargo1.jpg"
                  alt="Neno Sacco History"
                  className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square object-cover"
                />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <p className="text-lg mb-4 dark:text-gray-300">
                  Founded in 1998, Neno Sacco started as a vision shared by a
                  group of entrepreneurs in Nairobi's CBD. From managing a
                  single matatu, we've grown into a trusted courier service with
                  over 10,000 annual clients.
                </p>
                <p className="text-lg mb-4 dark:text-gray-300">
                  Our journey is a testament to the power of collaboration and
                  innovation in the transport sector.
                </p>
                <Button asChild variant="outline" className="group">
                  <Link href="#services" className="inline-flex items-center">
                    Discover Our Services
                    <ChevronRight
                      size={20}
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Truck size={48} className="text-blue-500" />,
                  title: "Express Delivery",
                  description:
                    "Fast and reliable delivery across Nairobi and beyond.",
                },
                {
                  icon: <Package size={48} className="text-purple-500" />,
                  title: "Secure Packaging",
                  description:
                    "Professional packaging to ensure your items arrive safely.",
                },
                {
                  icon: <Users size={48} className="text-green-500" />,
                  title: "Customer Support",
                  description:
                    "24/7 support to track and manage your deliveries.",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="mb-4 flex justify-center">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-center">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 "
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Why Choose Neno Sacco
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Star className="text-yellow-500" />,
                  title: "Real-time Tracking",
                  description:
                    "Monitor your parcel's journey from pickup to delivery.",
                },
                {
                  icon: <Shield className="text-green-500" />,
                  title: "Secure Transactions",
                  description:
                    "Your data and payments are protected with advanced encryption.",
                },
                {
                  icon: <Clock className="text-blue-500" />,
                  title: "Flexible Scheduling",
                  description: "Choose delivery times that suit your schedule.",
                },
                {
                  icon: <ThumbsUp className="text-purple-500" />,
                  title: "Eco-friendly Options",
                  description:
                    "We offer green delivery choices to reduce our carbon footprint.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="border-l-4 border-gradient-to-r from-blue-600 to-purple-600 pl-4 hover:bg-white dark:hover:bg-gray-800 p-4 rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    {feature.icon}
                    <h3 className="text-xl font-semibold ml-2">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "John Doe",
                  role: "Business Owner",
                  quote:
                    "Neno Sacco has transformed how I manage my deliveries. Their efficiency is unmatched!",
                },
                {
                  name: "Jane Smith",
                  role: "Online Seller",
                  quote:
                    "The real-time tracking feature gives me and my customers peace of mind. Highly recommended!",
                },
                {
                  name: "Mike Johnson",
                  role: "Event Planner",
                  quote:
                    "Their flexible scheduling has been a game-changer for my business. Neno Sacco is my go-to courier service.",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white text-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <p className="mb-4 italic">"{testimonial.quote}"</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Track Parcel Section */}
        <section
          id="track"
          className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Track Your Parcel
            </h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter Tracking Number"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Track Parcel
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 "
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Our Pricing Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic",
                  price: "500",
                  features: [
                    "Up to 5kg",
                    "City-wide delivery",
                    "24-hour delivery",
                  ],
                },
                {
                  name: "Pro",
                  price: "1000",
                  features: [
                    "Up to 15kg",
                    "Nationwide delivery",
                    "Same-day delivery",
                    "Insurance included",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: [
                    "Unlimited weight",
                    "International delivery",
                    "Priority support",
                    "Customized solutions",
                  ],
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold  text-center">
                      {plan.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-center mb-4">
                      {plan.price === "Custom"
                        ? plan.price
                        : `KES ${plan.price}`}
                      {plan.price !== "Custom" && (
                        <span className="text-sm font-normal">/month</span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <ArrowRight
                            size={16}
                            className="mr-2 text-green-500"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 "
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Get in Touch
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  ></textarea>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <p className="flex items-center">
                    <Mail size={20} className="mr-2 text-blue-500" />{" "}
                    info@nenosacco.com
                  </p>
                  <p className="flex items-center">
                    <Phone size={20} className="mr-2 text-green-500" /> +254 123
                    456 789
                  </p>
                  <p className="flex items-center">
                    <MapPin size={20} className="mr-2 text-red-500" /> Team
                    Room, Nairobi CBD, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 "
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "How do I track my parcel?",
                  answer:
                    "You can track your parcel using the tracking number provided at the time of booking on our website or mobile app.",
                },
                {
                  question: "What areas do you serve?",
                  answer:
                    "We primarily serve Nairobi and its surrounding areas, with plans to expand to other major cities in Kenya.",
                },
                {
                  question: "How can I become a Neno Sacco member?",
                  answer:
                    "To become a member, visit our office in Nairobi CBD with the required documentation and a small joining fee.",
                },
                {
                  question: "Do you offer international shipping?",
                  answer:
                    "Currently, we focus on domestic deliveries within Kenya. We're exploring international options for the future.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Neno Sacco</h3>
              <p className="text-sm">
                Neno Sacco has been providing reliable courier services since
                1998. We're committed to innovation and customer satisfaction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-blue-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 text-blue-400" />{" "}
                  info@nenosacco.com
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-green-400" /> +254 123
                  456 789
                </li>
                <li className="flex items-center">
                  <MapPin size={16} className="mr-2 text-red-400" /> Team Room,
                  Nairobi CBD, Kenya
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Facebook
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Neno Sacco. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
