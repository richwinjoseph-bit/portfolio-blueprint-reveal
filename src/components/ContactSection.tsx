import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
  };

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Big title */}
        <div className="overflow-hidden mb-20">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[clamp(3rem,10vw,8rem)] leading-[0.9] text-foreground"
          >
            LET'S WORK
            <br />
            <span className="text-accent-blue">TOGETHER</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Services list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {["Graphic Design", "Branding Design", "Logo Design", "Print Media Design"].map(
              (service, i) => (
                <div key={service} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-body text-base md:text-lg uppercase tracking-[0.1em] text-foreground/70">
                    {service}
                  </span>
                </div>
              )
            )}

            <div className="pt-8 space-y-3">
              <p className="font-body text-sm text-muted-foreground">www.richwin.design</p>
              <p className="font-body text-sm text-muted-foreground">@richwinjoseph</p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-border py-4 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-border py-4 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-border py-4 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="group relative inline-flex items-center gap-3 font-body text-sm uppercase tracking-[0.15em] text-foreground px-8 py-4 border border-foreground/30 rounded-full overflow-hidden transition-colors duration-500 hover:text-primary-foreground"
            >
              <span className="absolute inset-0 bg-foreground transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Send Message</span>
              <Send className="relative z-10 w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-7xl mx-auto mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">
          © 2026 Richwin Joseph
        </span>
        <span className="font-body text-xs text-muted-foreground tracking-wider">
          Creative Designer Portfolio
        </span>
      </motion.div>
    </section>
  );
};

export default ContactSection;
