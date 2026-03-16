import { motion } from "framer-motion";
import { FileText, Shield, Users, AlertTriangle, ArrowRight, CheckCircle, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();
  const keyPrinciples = [
    {
      icon: Shield,
      title: "Safety First",
      description: "We maintain a safe environment for all users through clear guidelines and enforcement."
    },
    {
      icon: Users,
      title: "Respect & Inclusion",
      description: "We foster a community where diverse voices are heard and respected."
    },
    {
      icon: Scale,
      title: "Fair Platform",
      description: "We apply our policies consistently and transparently across all users."
    },
    {
      icon: FileText,
      title: "Clear Guidelines",
      description: "Our rules are straightforward and easy to understand."
    }
  ];

  const responsibilities = [
    {
      title: "Content Responsibilities",
      items: [
        "You own the content you create and publish",
        "You must have the right to share any content you post",
        "You're responsible for the accuracy of your content",
        "You must comply with all applicable laws"
      ]
    },
    {
      title: "Community Guidelines",
      items: [
        "Respect other users and their opinions",
        "No harassment, hate speech, or discrimination",
        "No spam, fraud, or misleading content",
        "Respect intellectual property rights"
      ]
    },
    {
      title: "Platform Usage",
      items: [
        "Use the platform for legitimate purposes only",
        "Don't attempt to compromise system security",
        "Don't use automated bots without permission",
        "Don't interfere with others' use of the service"
      ]
    }
  ];

  const whatWeProvide = [
    {
      title: "Service Availability",
      description: "We strive to maintain high availability but cannot guarantee 100% uptime."
    },
    {
      title: "Content Moderation",
      description: "We moderate content to ensure a safe and respectful environment."
    },
    {
      title: "User Support",
      description: "We provide support to help you resolve issues and answer questions."
    },
    {
      title: "Platform Improvements",
      description: "We continuously update and improve the service based on user feedback."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-slate-50 dark:bg-slate-900"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground mb-4">
              The rules that govern our community and platform
            </p>
            <p className="text-muted-foreground">
              Last updated: March 10, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">Our Key Principles</h2>
            <p className="text-lg text-muted-foreground">The foundation of our community guidelines</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <principle.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{principle.title}</h3>
                    <p className="text-muted-foreground text-sm">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Responsibilities */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">Your Responsibilities</h2>
            <p className="text-lg text-muted-foreground">What we expect from our community members</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {responsibilities.map((responsibility, index) => (
              <motion.div
                key={responsibility.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      {responsibility.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {responsibility.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Terms */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">Service Terms</h2>
            <p className="text-lg text-muted-foreground">Important information about using our platform</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="account" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Account Creation and Security
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  You must provide accurate information when creating an account. You're responsible for 
                  maintaining the confidentiality of your account credentials and for all activities that occur 
                  under your account. You must notify us immediately of any unauthorized use.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="content" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Content and Intellectual Property
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  You retain ownership of content you create. By publishing content, you grant us 
                  a license to use, display, and distribute it on our platform. You must have 
                  the right to share all content you post and must not infringe on others' intellectual property.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="privacy" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Privacy and Data Use
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  Your privacy is important to us. Our collection and use of personal information 
                  is governed by our Privacy Policy. By using our service, you consent to the 
                  collection and use of information as described in our Privacy Policy.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="prohibited" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Prohibited Activities
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  You may not use our service for illegal activities, harassment, spam, fraud, 
                  or to distribute malware. You may not attempt to gain unauthorized access to our 
                  systems or interfere with the proper functioning of the platform.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="termination" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Account Termination
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We reserve the right to suspend or terminate accounts that violate these terms. 
                  You may close your account at any time. Upon termination, your right to use 
                  the service ceases immediately.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">What We Provide</h2>
            <p className="text-lg text-muted-foreground">Our commitments to you as a user</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whatWeProvide.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="font-display text-3xl font-bold mb-4">Important Legal Notice</h2>
              <p className="text-lg text-muted-foreground mb-8">
                These terms constitute a legally binding agreement. By using our service, 
                you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" onClick={() => navigate('/contact')}>
                  Contact Legal Team
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Terms;
