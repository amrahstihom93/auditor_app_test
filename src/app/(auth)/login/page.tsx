"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login } = auth;

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // For this demo, we'll just log the user in and redirect.
    login();
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Shield size={32} />
            </div>
            <CardTitle className="text-3xl font-headline">
              Welcome to AuditAce
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue="alice@innovate.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full bg-background text-foreground border border-primary hover:bg-primary/10"
              type="submit"
            >
              <Lock className="mr-2 h-4 w-4" /> Login
            </Button>
            <p className="text-xs text-muted-foreground">
                Don't have an account? <Link href="/register" className="text-primary underline">Sign Up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
