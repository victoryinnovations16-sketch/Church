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
import type { Location, InsertLocation } from "../helpers/siteSchema";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/UiForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLocationSchema } from "../helpers/siteSchema";
import { ImageUploader } from "../components/ImageUploader";

export default function AdminLocations() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const { toast } = useToast();

  const { data: locations = [] } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  const form = useForm<InsertLocation>({
    resolver: zodResolver(insertLocationSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      serviceTime: "",
      capacity: "",
      imageUrl: "",
      contactEmail: "",
      mapUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertLocation) => apiRequest("POST", "/api/locations", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      toast({ title: "Location created successfully!" });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Location> }) =>
      apiRequest("PATCH", `/api/locations/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      toast({ title: "Location updated successfully!" });
      setIsDialogOpen(false);
      setEditingLocation(null);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/locations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      toast({ title: "Location deleted successfully!" });
    },
  });

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    form.reset({
      name: location.name,
      description: location.description,
      address: location.address,
      serviceTime: location.serviceTime,
      capacity: location.capacity || "",
      imageUrl: location.imageUrl || "",
      contactEmail: location.contactEmail || "",
      mapUrl: location.mapUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertLocation) => {
    if (editingLocation) {
      updateMutation.mutate({ id: editingLocation.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-locations-admin-heading">Locations</h1>
          <p className="text-muted-foreground">Manage church locations and service times</p>
        </div>
        <Button onClick={() => {
          setEditingLocation(null);
          form.reset();
          setIsDialogOpen(true);
        }} data-testid="button-add-location">
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Locations</CardTitle>
          <CardDescription>View and manage all church locations</CardDescription>
        </CardHeader>
        <CardContent>
          {locations.length > 0 ? (
            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
                  data-testid={`item-location-${location.id}`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg" data-testid={`text-location-name-${location.id}`}>
                      {location.name}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-location-service-time-${location.id}`}>
                      {location.serviceTime}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-location-address-${location.id}`}>
                      {location.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(location)}
                      data-testid={`button-edit-location-${location.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteMutation.mutate(location.id)}
                      data-testid={`button-delete-location-${location.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground" data-testid="text-no-locations-admin">
              No locations yet. Add your first location!
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingLocation ? "Edit Location" : "Create New Location"}</DialogTitle>
            <DialogDescription>
              {editingLocation ? "Update location details" : "Add a new church location"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Church name" {...field} data-testid="input-location-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief description" {...field} data-testid="input-location-description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Full address" {...field} data-testid="input-location-address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sunday at 10:00am" {...field} data-testid="input-location-service-time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 100" {...field} data-testid="input-location-capacity" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@example.com" {...field} data-testid="input-location-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mapUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Map URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Google Maps link" {...field} data-testid="input-location-map" />
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
                    <FormControl>
                      <ImageUploader
                        value={field.value || ""}
                        onChange={field.onChange}
                        category="locations"
                        label="Location Image (optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel-location">
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-save-location">
                  {editingLocation ? "Update" : "Create"} Location
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
