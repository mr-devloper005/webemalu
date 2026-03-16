import { motion } from "framer-motion";
import { Users, BookOpen, Globe, Heart, ArrowRight, Award, Target, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { siteConfig } from "@/config/siteConfig";

const About = () => {
  const navigate = useNavigate();
  const stats = [
    { label: "Active Writers", value: "100M+", icon: Users },
    { label: "Articles Published", value: "500M+", icon: BookOpen },
    { label: "Monthly Readers", value: "200M+", icon: Globe },
    { label: "Monthly Readers", value: "200M+", icon: TrendingUp },
    { label: "Countries Reached", value: "195+", icon: Globe },
  ];

  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We prioritize meaningful content over clickbait and engagement metrics."
    },
    {
      icon: Shield,
      title: "Safe Space",
      description: "Creating an inclusive environment where diverse voices can thrive."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Celebrating and rewarding the best thinking and storytelling."
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {siteConfig.heroes.about.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {siteConfig.heroes.about.subtitle}
            </p>
            <Button size="lg" className="gap-2" onClick={() => { navigate('/write'); window.scrollTo(0, 0); }}>
              {siteConfig.heroes.about.cta}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-4xl font-bold mb-6"
            >
              Our Mission
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              To deepen people's understanding of the world and help them share ideas that matter.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-8 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold mb-6">How It Works</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Write Freely</h3>
                  <p className="text-muted-foreground">Anyone can write on Webemalu. Our editor is designed for focus and clarity.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Get Discovered</h3>
                  <p className="text-muted-foreground">The best stories are surfaced by human curation and smart algorithms.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Build Your Audience</h3>
                  <p className="text-muted-foreground">Connect with readers who value thoughtful, in-depth content.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold mb-4">Ready to Share Your Story?</h2>
            <p className="text-xl mb-8 opacity-90">Join millions of writers and readers on Webemalu</p>
            <Button size="lg" variant="secondary" className="gap-2" onClick={() => { navigate('/write'); window.scrollTo(0, 0); }}>
              {siteConfig.buttons.common.getStarted}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
