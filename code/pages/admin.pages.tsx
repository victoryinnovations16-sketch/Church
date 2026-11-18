import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Input } from "../components/UiInput";
import { Textarea } from "../components/UiTextarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../helpers/useToast";
import { queryClient, apiRequest } from "../helpers/queryClient";
import type { Page, InsertPage } from "../helpers/siteSchema";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/UiForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPageSchema } from "../helpers/siteSchema";
import { useState } from "react";

const defaultPages = [
  { slug: "about", title: "About Us", description: "Information about the church" },
  { slug: "contact", title: "Contact", description: "Contact information and form" },
];

export default function AdminPages() {
  const { toast } = useToast();
  const [selectedSlug, setSelectedSlug] = useState("about");

  const { data: page } = useQuery<Page>({
    queryKey: ["/api/pages", selectedSlug],
  });

  const form = useForm<InsertPage>({
    resolver: zodResolver(insertPageSchema),
    defaultValues: {
      slug: selectedSlug,
      title: "",
      content: "",
    },
  });

  const upsertMutation = useMutation({
    mutationFn: (data: InsertPage) => {
      if (page) {
        return apiRequest("PATCH", `/api/pages/${page.id}`, data);
      } else {
        return apiRequest("POST", "/api/pages", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      toast({ title: "Page saved successfully!" });
    },
  });

  const handleSubmit = (data: InsertPage) => {
    upsertMutation.mutate({ ...data, slug: selectedSlug });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-pages-admin-heading">Pages</h1>
        <p className="text-muted-foreground">Manage static page content for your website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Page Selector */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {defaultPages.map((p) => (
              <Button
                key={p.slug}
                variant={selectedSlug === p.slug ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedSlug(p.slug);
                  form.reset({
                    slug: p.slug,
                    title: page?.title || p.title,
                    content: page?.content || "",
                  });
                }}
                data-testid={`button-select-page-${p.slug}`}
              >
                {p.title}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Page Editor */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Edit Page</CardTitle>
            <CardDescription>
              Update content for the {defaultPages.find(p => p.slug === selectedSlug)?.title} page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Page title" 
                          {...field}
                          defaultValue={page?.title || defaultPages.find(p => p.slug === selectedSlug)?.title}
                          data-testid="input-page-title" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Page content (supports plain text)" 
                          className="min-h-96 font-mono text-sm"
                          {...field}
                          defaultValue={page?.content || ""}
                          data-testid="input-page-content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" data-testid="button-save-page">
                  Save Page
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
