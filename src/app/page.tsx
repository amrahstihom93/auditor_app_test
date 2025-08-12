
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Bot, GanttChartSquare, Ticket, BookCopy, Zap, BarChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LandingNav = () => (
    <header className="sticky top-4 z-50 w-full">
        <div className="container mx-auto flex h-16 items-center justify-between rounded-full border border-white/10 bg-black/20 p-4 backdrop-blur-lg">
            <div className="flex">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="font-bold text-white">AuditAce</span>
                </Link>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
                <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                    <Link href="/register">Get Started</Link>
                </Button>
            </div>
        </div>
    </header>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex flex-col items-center p-6 text-center border border-white/10 bg-white/5 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:scale-105">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
        </div>
        <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-base text-white/70">{description}</p>
    </div>
)


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground animated-gradient">
        <LandingNav />

        <main className="flex-1">
            {/* Hero Section */}
            <section className="container grid grid-cols-1 items-center gap-10 py-20 text-center md:py-32">
                <div className="flex flex-col items-center gap-6">
                    <h1 className="text-5xl font-headline font-extrabold tracking-tight md:text-6xl lg:text-7xl text-white">
                        Stop Drowning in Compliance Chaos.
                    </h1>
                    <p className="max-w-[700px] text-lg text-white/80">
                        AuditAce is the AI-powered platform that transforms your GRC (Governance, Risk, and Compliance) from a manual nightmare into a streamlined, automated, and insightful process.
                    </p>
                    <div className="flex w-full items-center justify-center gap-4 md:w-auto">
                        <Button size="lg" asChild className="rounded-full text-lg">
                            <Link href="/register">
                                Claim Your Free Audit <ArrowRight className="ml-2"/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

             {/* Features Section */}
            <section id="features" className="w-full py-20 lg:py-32">
                <div className="container mx-auto">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                         <h2 className="text-4xl font-headline font-bold sm:text-5xl text-white">From Cluttered Spreadsheets to Clear Insights</h2>
                        <p className="mt-6 text-xl text-white/70">
                            Auditing, ticketing, and onboarding are complex. AuditAce brings AI-powered simplicity to every step.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                       <FeatureCard
                            icon={<Zap size={28} />}
                            title="AI-Powered Auditing"
                            description="Instantly summarize findings, identify risks, and generate reports. Let AI do the heavy lifting."
                        />
                        <FeatureCard
                            icon={<Ticket size={28} />}
                            title="Integrated Ticketing"
                            description="Turn findings into actionable tickets automatically. Assign, track, and resolve issues without leaving the platform."
                        />
                         <FeatureCard
                            icon={<BookCopy size={28} />}
                            title="Smart Onboarding"
                            description="Generate role-specific onboarding checklists with AI to ensure compliance from day one."
                        />
                         <FeatureCard
                            icon={<GanttChartSquare size={28} />}
                            title="Centralized Control"
                            description="Manage all processes, evidence, and communication in one organized, secure dashboard."
                        />
                         <FeatureCard
                            icon={<Bot size={28} />}
                            title="Continuous Compliance"
                            description="Stay ahead of regulations with continuous monitoring and proactive alerts on potential compliance gaps."
                        />
                         <FeatureCard
                            icon={<BarChart size={28} />}
                            title="Insightful Reporting"
                            description="Visualize your compliance posture with intuitive charts and dashboards for stakeholders."
                        />
                    </div>
                </div>
            </section>
            
            {/* Visual Showcase */}
            <section className="container py-20 lg:py-32">
                 <div className="relative rounded-2xl shadow-2xl ring-1 ring-white/10 backdrop-blur-xl border border-white/10 p-4">
                     <Image
                      src="https://placehold.co/1200x800.png"
                      alt="App screenshot"
                      width={1200}
                      height={800}
                      data-ai-hint="dashboard application"
                      className="rounded-xl ring-1 ring-white/10"
                    />
                </div>
            </section>
        </main>

        {/* Footer */}
        <footer className="py-10 container border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
                <p>&copy; {new Date().getFullYear()} AuditAce Inc. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                    <Link href="#" className="hover:text-primary">Terms of Service</Link>
                </div>
            </div>
        </footer>
    </div>
  );
}
