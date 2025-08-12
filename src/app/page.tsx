
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Bot, GanttChartSquare, Ticket, BookCopy, Zap, BarChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LandingNav = () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="font-bold">AuditAce</span>
                </Link>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Get Started</Link>
                </Button>
            </div>
        </div>
    </header>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
        </div>
        <h3 className="mt-2 text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
)


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
        <LandingNav />

        <main className="flex-1">
            {/* Hero Section */}
            <section className="container grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-2 md:py-32">
                <div className="flex flex-col items-start gap-6">
                    <h1 className="text-4xl font-headline font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                        Stop Drowning in Compliance Chaos.
                    </h1>
                    <p className="max-w-[700px] text-lg text-muted-foreground">
                        AuditAce is the AI-powered platform that transforms your GRC (Governance, Risk, and Compliance) from a manual nightmare into a streamlined, automated, and insightful process.
                    </p>
                    <div className="flex w-full items-center gap-4 md:w-auto">
                        <Button size="lg" asChild>
                            <Link href="/register">
                                Claim Your Free Audit <ArrowRight className="ml-2"/>
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-primary/10 blur-3xl"></div>
                     <Image
                      src="https://placehold.co/1200x800.png"
                      alt="App screenshot"
                      width={1200}
                      height={800}
                      data-ai-hint="dashboard application"
                      className="relative rounded-xl shadow-2xl ring-1 ring-border"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-20 lg:py-32 bg-muted/40">
                <div className="container mx-auto">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <h2 className="text-3xl font-headline font-bold sm:text-4xl">From Cluttered Spreadsheets to Clear Insights</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Auditing, ticketing, and onboarding are complex. AuditAce brings AI-powered simplicity to every step.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                       <FeatureCard
                            icon={<Zap size={24} />}
                            title="AI-Powered Auditing"
                            description="Instantly summarize findings, identify risks, and generate reports. Let AI do the heavy lifting."
                        />
                        <FeatureCard
                            icon={<Ticket size={24} />}
                            title="Integrated Ticketing"
                            description="Turn findings into actionable tickets automatically. Assign, track, and resolve issues without leaving the platform."
                        />
                         <FeatureCard
                            icon={<BookCopy size={24} />}
                            title="Smart Onboarding"
                            description="Generate role-specific onboarding checklists with AI to ensure compliance from day one."
                        />
                         <FeatureCard
                            icon={<GanttChartSquare size={24} />}
                            title="Centralized Control"
                            description="Manage all processes, evidence, and communication in one organized, secure dashboard."
                        />
                         <FeatureCard
                            icon={<Bot size={24} />}
                            title="Continuous Compliance"
                            description="Stay ahead of regulations with continuous monitoring and proactive alerts on potential compliance gaps."
                        />
                         <FeatureCard
                            icon={<BarChart size={24} />}
                            title="Insightful Reporting"
                            description="Visualize your compliance posture with intuitive charts and dashboards for stakeholders."
                        />
                    </div>
                </div>
            </section>
        </main>

        {/* Footer */}
        <footer className="py-10 container border-t">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
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
