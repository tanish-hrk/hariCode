"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "./ui/button";
import { ArrowRight, Code2 } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.from(heroRef.current.querySelectorAll(".gsap-hero"), {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <Code2 className="h-16 w-16 mx-auto text-primary" />
          </motion.div>
          
          <h1 className="gsap-hero text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Transforming Ideas into Digital Reality
          </h1>
          
          <p className="gsap-hero text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Expert software development and consulting services to bring your vision to life. 
            Specializing in modern web applications and innovative solutions.
          </p>
          
          <div className="gsap-hero flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              View Portfolio
            </Button>
          </div>
          
          <div className="gsap-hero mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}