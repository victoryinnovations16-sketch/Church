import { useState } from "react";
import { Button } from "../components/UiButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UiCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/UiDialog";
import { Input } from "../components/UiInput";
import { Textarea } from "../components/UiTextarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../helpers/useToast";
import { queryClient, apiRequest } from "../helpers/queryClient";
import type { Devotional, InsertDevotional } from "../helpers/siteSchema";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/UiForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDevotionalSchema } from "../helpers/siteSchema";

export default function AdminDevotionals() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDevotional, setEditingDevotional] = useState<Devotional | null>(null);
  const { toast } = useToast();

  const { data: devotionals = [] } = useQuery<Devotional[]>({
    queryKey: ["/api/devotionals"],
  });

  const form = useForm<InsertDevotional>({
    resolver: zodResolver(insertDevotionalSchema),
    defaultValues: {
      title: "",
      scripture: "",
      content: "",
      date: new Date(),
      author: "Pastor W.F. Kumuyi",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertDevotional) => apiRequest("POST", "/api/devotionals", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/devotionals"] });
      toast({ title: "Devotional created successfully!" });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Devotional> }) =>
      apiRequest("PATCH", `/api/devotionals/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/devotionals"] });
      toast({ title: "Devotional updated successfully!" });
      setIsDialogOpen(false);
      setEditingDevotional(null);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/devotionals/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/devotionals"] });
      toast({ title: "Devotional deleted successfully!" });
    },
  });

  const handleEdit = (devotional: Devotional) => {
    setEditingDevotional(devotional);
    form.reset({
      title: devotional.title,
      scripture: devotional.scripture,
      content: devotional.content,
      date: new Date(devotional.date),
      author: devotional.author || "Pastor W.F. Kumuyi",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertDevotional) => {
    if (editingDevotional) {
      updateMutation.mutate({ id: editingDevotional.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-devotionals-admin-heading">Devotionals</h1>
          <p className="text-muted-foreground">Manage daily manna devotional content</p>
        </div>
        <Button onClick={() => {
          setEditingDevotional(null);
          form.reset();
          setIsDialogOpen(true);
        }} data-testid="button-add-devotional">
          <Plus className="h-4 w-4 mr-2" />
          Add Devotional
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Devotionals</CardTitle>
          <CardDescription>View and manage daily devotionals</CardDescription>
        </CardHeader>
        <CardContent>
          {devotionals.length > 0 ? (
            <div className="space-y-4">
              {devotionals.map((devotional) => (
                <div
                  key={devotional.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                  data-testid={`item-devotional-${devotional.id}`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg" data-testid={`text-devotional-title-${devotional.id}`}>
                      {devotional.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-devotional-scripture-${devotional.id}`}>
                      {devotional.scripture}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-devotional-date-${devotional.id}`}>
                      {new Date(devotional.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(devotional)}
                      data-testid={`button-edit-devotional-${devotional.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteMutation.mutate(devotional.id)}
                      data-testid={`button-delete-devotional-${devotional.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground" data-testid="text-no-devotionals-admin">
              No devotionals yet. Create your first devotional!
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingDevotional ? "Edit Devotional" : "Create New Devotional"}</DialogTitle>
            <DialogDescription>
              {editingDevotional ? "Update devotional content" : "Add a new daily devotional"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Devotional title" {...field} data-testid="input-devotional-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scripture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scripture Reference</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John 3:16" {...field} data-testid="input-devotional-scripture" />
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
                        placeholder="Devotional content" 
                        className="min-h-64"
                        {...field} 
                        data-testid="input-devotional-content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        value={field.value instanceof Date && !isNaN(field.value.getTime()) ? field.value.toISOString().split('T')[0] : ""}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        data-testid="input-devotional-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Pastor W.F. Kumuyi" {...field} data-testid="input-devotional-author" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel-devotional">
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-save-devotional">
                  {editingDevotional ? "Update" : "Create"} Devotional
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
