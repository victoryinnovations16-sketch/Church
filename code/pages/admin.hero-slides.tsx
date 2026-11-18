import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient, apiRequest } from "../helpers/queryClient";
import { useToast } from "../helpers/useToast";
import { insertHeroSlideSchema, type HeroSlide } from "../helpers/siteSchema";
import { z } from "zod";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/UiCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/UiDialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/UiForm";
import { Input } from "../components/UiInput";
import { Textarea } from "../components/UiTextarea";
import { Button } from "../components/UiButton";
import { Switch } from "../components/UiSwitch";
import { ImageUploader } from "../components/ImageUploader";

type HeroSlideInput = z.infer<typeof insertHeroSlideSchema>;

export default function AdminHeroSlides() {
  const { toast } = useToast();
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: slides, isLoading } = useQuery<HeroSlide[]>({
    queryKey: ["/api/admin/hero-slides"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: HeroSlideInput) => {
      return await apiRequest("POST", "/api/admin/hero-slides", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/hero-slides"] });
      toast({
        title: "Hero slide created",
        description: "The hero slide has been created successfully.",
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create slide",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<HeroSlideInput> }) => {
      return await apiRequest("PATCH", `/api/admin/hero-slides/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/hero-slides"] });
      toast({
        title: "Hero slide updated",
        description: "The hero slide has been updated successfully.",
      });
      setIsDialogOpen(false);
      setEditingSlide(null);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update slide",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/hero-slides/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/hero-slides"] });
      queryClient.invalidateQueries({ queryKey: ["/api/hero-slides"] });
      toast({
        title: "Hero slide deleted",
        description: "The hero slide has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete slide",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<HeroSlideInput>({
    resolver: zodResolver(insertHeroSlideSchema),
    defaultValues: {
      title: "",
      subtitle: null,
      imageUrl: "",
      ctaText: null,
      ctaLink: null,
      order: 0,
      isActive: true,
    },
  });

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    form.reset({
      title: slide.title,
      subtitle: slide.subtitle,
      imageUrl: slide.imageUrl,
      ctaText: slide.ctaText,
      ctaLink: slide.ctaLink,
      order: slide.order,
      isActive: slide.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingSlide(null);
    const nextOrder = slides && slides.length > 0 
      ? Math.max(...slides.map(s => s.order)) + 1 
      : 0;
    form.reset({
      title: "",
      subtitle: null,
      imageUrl: "",
      ctaText: null,
      ctaLink: null,
      order: nextOrder,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this hero slide?")) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: HeroSlideInput) => {
    // Convert empty strings to null for nullable fields
    const cleanedData = {
      ...data,
      subtitle: data.subtitle || null,
      ctaText: data.ctaText || null,
      ctaLink: data.ctaLink || null,
    };

    if (editingSlide) {
      updateMutation.mutate({ id: editingSlide.id, data: cleanedData });
    } else {
      createMutation.mutate(cleanedData);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Hero Slides</h1>
          <p className="text-muted-foreground mt-1">
            Manage the hero carousel on the homepage
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} data-testid="button-create-slide">
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? "Edit Hero Slide" : "Create Hero Slide"}
              </DialogTitle>
              <DialogDescription>
                {editingSlide
                  ? "Update the hero slide details"
                  : "Add a new slide to the homepage carousel"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Welcome to our church"
                          data-testid="input-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value || ""}
                          placeholder="A place where everyone belongs"
                          rows={3}
                          data-testid="input-subtitle"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Image</FormLabel>
                      <FormControl>
                        <ImageUploader
                          value={field.value}
                          onChange={field.onChange}
                          data-testid="upload-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ctaText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Text (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Learn More"
                          data-testid="input-cta-text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ctaLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Button Link (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="/about"
                          data-testid="input-cta-link"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            data-testid="input-order"
                          />
                        </FormControl>
                        <FormDescription>
                          Lower numbers appear first
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-end">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="switch-active"
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">Active</FormLabel>
                        </div>
                        <FormDescription>
                          Show this slide on homepage
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit"
                  >
                    {createMutation.isPending || updateMutation.isPending
                      ? "Saving..."
                      : editingSlide
                      ? "Update Slide"
                      : "Create Slide"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {slides && slides.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Hero Slides</CardTitle>
            <CardDescription>
              Create your first hero slide to get started
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {slides?.map((slide) => (
            <Card key={slide.id} data-testid={`card-slide-${slide.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {slide.title}
                      {!slide.isActive && (
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                          Inactive
                        </span>
                      )}
                    </CardTitle>
                    {slide.subtitle && (
                      <CardDescription className="mt-1">
                        {slide.subtitle}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(slide)}
                      data-testid={`button-edit-${slide.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(slide.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-${slide.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {slide.imageUrl && (
                    <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="object-cover w-full h-full"
                        data-testid={`img-slide-${slide.id}`}
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Order: {slide.order}</span>
                    {slide.ctaText && slide.ctaLink && (
                      <span>
                        Button: {slide.ctaText} → {slide.ctaLink}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
