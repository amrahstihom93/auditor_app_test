
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, ClipboardList, Ticket, BookCopy, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LandingNav = () => (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2 text-primary-foreground">
                <Shield size={24} />
            </div>
            <h1 className="text-xl font-headline font-semibold">
              AuditAce
            </h1>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Get Started</Link>
            </Button>
        </div>
    </nav>
);


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingNav />

        <main>
            {/* Hero Section */}
            <section className="text-center py-20 px-4 sm:py-32">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-6xl">
                        Streamline Your Auditing Process with AI
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                        AuditAce helps you manage compliance, track findings, and generate reports effortlessly. Focus on what matters, not the paperwork.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" asChild>
                            <Link href="/register">
                                Get Started for Free <ArrowRight className="ml-2"/>
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="#">Learn More</Link>
                        </Button>
                    </div>
                </div>
                <div className="mt-16 flow-root sm:mt-24">
                  <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                    <Image
                      src="https://placehold.co/1200x600.png"
                      alt="App screenshot"
                      width={1200}
                      height={600}
                      data-ai-hint="dashboard application"
                      className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-muted/40 sm:py-32">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-headline font-bold sm:text-4xl">Why AuditAce?</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Everything you need to conduct efficient and insightful audits.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground">
                                <Sparkles />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">AI-Powered Summaries</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Instantly summarize complex audit findings into clear, actionable insights.</p>
                        </div>
                         <div className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground">
                                <ClipboardList />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">Centralized Management</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Track all your processes, from start to finish, in one organized dashboard.</p>
                        </div>
                         <div className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground">
                                <Ticket />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">Collaborative Ticketing</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Assign and manage remediation tasks with an integrated ticketing system.</p>
                        </div>
                         <div className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground">
                                <BookCopy />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">AI Template Generation</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Create reusable templates for different roles and needs with a single click.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        {/* Footer */}
        <footer className="py-10 px-4 border-t">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} AuditAce. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                    <Link href="#" className="hover:text-primary">Terms of Service</Link>
                </div>
            </div>
        </footer>
    </div>
  );
}
