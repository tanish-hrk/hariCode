"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Layout, Server, Smartphone, Globe, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Layout,
    title: "Web Development",
    description: "Modern, responsive websites built with the latest technologies",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Scalable server solutions and API development",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Cross-platform mobile applications for iOS and Android",
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored software solutions for your business needs",
  },
  {
    icon: Globe,
    title: "Cloud Solutions",
    description: "Cloud architecture and deployment strategies",
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Efficient database architecture and optimization",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll(".service-card"), {
      opacity: 0,
      y: 100,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Services & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Comprehensive software development services tailored to your needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="service-card hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}