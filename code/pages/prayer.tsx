import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/UiButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UiCard";
import { Input } from "../components/UiInput";
import { Textarea } from "../components/UiTextarea";
import { Checkbox } from "../components/UiCheckbox";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/UiForm";
import { useToast } from "../helpers/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { publicPrayerRequestSchema } from "../helpers/siteSchema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../helpers/queryClient";
import { z } from "zod";

type PrayerFormData = z.infer<typeof publicPrayerRequestSchema>;

export default function Prayer() {
  const { toast } = useToast();
  const form = useForm<PrayerFormData>({
    resolver: zodResolver(publicPrayerRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      request: "",
      isAnonymous: false,
    },
  });

  const isAnonymous = form.watch("isAnonymous");

  const submitMutation = useMutation({
    mutationFn: (data: PrayerFormData) => {
      // If anonymous, clear name and email before submitting
      if (data.isAnonymous) {
        return apiRequest("POST", "/api/prayer-requests", {
          ...data,
          name: undefined,
          email: undefined,
        });
      }
      return apiRequest("POST", "/api/prayer-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Prayer request submitted",
        description: "Thank you for sharing your prayer request with us. We will be praying for you.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error submitting your prayer request. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-bold mb-4" data-testid="text-prayer-heading">
              Prayer Requests
            </h1>
            <p className="text-xl text-muted-foreground">
              We believe in the power of prayer. Share your request with us and our church community will pray for you.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle data-testid="text-prayer-form-title">Submit a Prayer Request</CardTitle>
              <CardDescription>
                Your request will be received by our prayer team. You can choose to remain anonymous if you prefer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => submitMutation.mutate(data))} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="isAnonymous"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-prayer-anonymous"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Keep my request anonymous</FormLabel>
                          <FormDescription>
                            We'll pray for you without collecting your name or email
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  {!isAnonymous && (
                    <>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                value={field.value || ""}
                                data-testid="input-prayer-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                {...field}
                                value={field.value || ""}
                                data-testid="input-prayer-email"
                              />
                            </FormControl>
                            <FormDescription>
                              We'll only use this to follow up if needed
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  <FormField
                    control={form.control}
                    name="request"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prayer Request</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your prayer request..."
                            className="min-h-[150px]"
                            {...field}
                            data-testid="input-prayer-request"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitMutation.isPending}
                    data-testid="button-prayer-submit"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Prayer Request"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
