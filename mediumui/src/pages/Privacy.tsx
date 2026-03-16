import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, FileText, ArrowRight, CheckCircle, Database, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();
  const principles = [
    {
      icon: Eye,
      title: "Transparency",
      description: "We clearly explain what data we collect and why we collect it."
    },
    {
      icon: Lock,
      title: "Security",
      description: "We use industry-standard encryption and security measures to protect your data."
    },
    {
      icon: UserCheck,
      title: "Control",
      description: "You have control over your personal data and can manage your preferences."
    },
    {
      icon: Shield,
      title: "Privacy by Design",
      description: "Privacy is built into our products from the ground up."
    }
  ];

  const dataCategories = [
    {
      title: "Information You Provide",
      items: [
        "Name, email address, and password",
        "Profile information (bio, avatar, social links)",
        "Content you create (articles, comments, claps)",
        "Communication preferences and settings"
      ]
    },
    {
      title: "Automatically Collected Information",
      items: [
        "Device and browser information",
        "IP address and location data",
        "Usage patterns and interactions",
        "Performance and diagnostic data"
      ]
    },
    {
      title: "Information from Third Parties",
      items: [
        "Social media connections (when you link accounts)",
        "Payment information (processed securely by third parties)",
        "Analytics and advertising data from partners"
      ]
    }
  ];

  const yourRights = [
    {
      title: "Access and Portability",
      description: "You can request a copy of your personal data at any time."
    },
    {
      title: "Correction and Deletion",
      description: "You can correct inaccurate data or request deletion of your personal information."
    },
    {
      title: "Data Portability",
      description: "You can export your data in a machine-readable format."
    },
    {
      title: "Opt-Out",
      description: "You can opt out of marketing communications and certain data collection."
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Your privacy is fundamental to our mission
            </p>
            <p className="text-muted-foreground">
              Last updated: March 10, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">Our Privacy Principles</h2>
            <p className="text-lg text-muted-foreground">The values that guide our approach to privacy</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
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

      {/* Data We Collect */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">Data We Collect</h2>
            <p className="text-lg text-muted-foreground">Understanding what information we gather and why</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {dataCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
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

      {/* How We Use Your Data */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">How We Use Your Data</h2>
            <p className="text-lg text-muted-foreground">The purposes behind data collection and usage</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="service" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Provide and Maintain Our Service
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We use your data to create and maintain your account, process your articles, 
                  provide personalized content recommendations, and ensure the platform works smoothly. 
                  This includes storing your content, tracking reading progress, and managing your preferences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="communication" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Communication and Support
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We use your email address and preferences to send important updates about your account, 
                  respond to your inquiries, provide customer support, and communicate about service changes 
                  that may affect you.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="personalization" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Personalization and Recommendations
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We analyze your reading habits, interests, and interactions to recommend articles you might enjoy, 
                  personalize your feed, and improve your overall experience on Webemalu.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="analytics" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Analytics and Improvement
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We analyze usage patterns and aggregate data to understand how people use Webemalu, 
                  identify trends, improve our features, and develop new products that better serve our community.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="safety" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-lg">
                  Safety and Security
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  We use data to detect and prevent fraud, abuse, and security threats, 
                  enforce our terms of service, and maintain a safe environment for all users.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold mb-4">Your Rights</h2>
            <p className="text-lg text-muted-foreground">Control over your personal information</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {yourRights.map((right, index) => (
              <motion.div
                key={right.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{right.title}</h3>
                      <p className="text-muted-foreground text-sm">{right.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-3xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                If you have questions about this Privacy Policy or how we handle your data, 
                we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" onClick={() => navigate('/contact')}>
                  Contact Privacy Team
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

export default Privacy;
