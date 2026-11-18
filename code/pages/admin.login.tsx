import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "../helpers/useToast";
import { queryClient, apiRequest } from "../helpers/queryClient";
import { loginSchema } from "../helpers/siteSchema";
import { z } from "zod";

type LoginInput = z.infer<typeof loginSchema>;
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/UiCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/UiForm";
import { Input } from "../components/UiInput";
import { Button } from "../components/UiButton";

export default function AdminLogin() {
  const setLocation = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // On a brand-new site there are no accounts yet: the first person to sign in
  // here creates the first admin account (only possible while none exist).
  const { data: setup } = useQuery<{ needsSetup: boolean }>({
    queryKey: ["/api/auth/setup-status"],
  });
  const needsSetup = setup?.needsSetup === true;

  const loginMutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      if (needsSetup) {
        if (data.password.length < 10) throw new Error("Use a password of at least 10 characters");
        await apiRequest('POST', '/api/auth/setup', data);
        queryClient.invalidateQueries({ queryKey: ["/api/auth/setup-status"] });
        return;
      }
      return await apiRequest('POST', '/api/auth/login', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/session'] });
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
      setLocation("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <title>Admin Login | DCLM East Midlands</title>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{needsSetup ? "Create the admin account" : "Admin Login"}</CardTitle>
          <CardDescription>
            {needsSetup
              ? "No admin account exists yet. Choose a username and a password of at least 10 characters."
              : "Enter your credentials to access the admin dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your username"
                        autoComplete="username"
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        autoComplete={needsSetup ? "new-password" : "current-password"}
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
                data-testid="button-login"
              >
                {loginMutation.isPending ? "Please wait..." : needsSetup ? "Create account" : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
