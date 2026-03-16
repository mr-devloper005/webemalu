import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ImageWithFallback from "@/components/ImageWithFallback";
import { siteConfig } from "@/config/siteConfig";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <ImageWithFallback src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-full mx-auto object-cover" />
          <h1 className="font-display text-2xl font-bold">You're signed in as {currentUser.name}</h1>
          <Link to={`/profile/${currentUser.id}`} className="text-primary hover:underline text-sm">Go to profile</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    signIn(email, password);
    toast.success("Welcome back!");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-2">Welcome back.</h1>
          <p className="text-muted-foreground text-sm">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder={siteConfig.ui.placeholders.email} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder={siteConfig.ui.placeholders.password} />
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            {siteConfig.buttons.auth.signIn}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
          <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or</span></div>
        </div>

        <div className="space-y-2">
          <button type="button" onClick={() => { signIn("sarahchen@example.com", ""); toast.success("Welcome back!"); navigate("/"); }}
            className="w-full py-2.5 border rounded-full text-sm font-medium hover:bg-secondary transition-colors">
            Sign in with Google
          </button>
          <button type="button" onClick={() => { signIn("jamesmorrison@example.com", ""); toast.success("Welcome back!"); navigate("/"); }}
            className="w-full py-2.5 border rounded-full text-sm font-medium hover:bg-secondary transition-colors">
            Sign in with Apple
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">Create one</Link>
        </p>
      </form>
    </motion.div>
  );
};

export default SignIn;
