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
import { Badge } from "../components/UiBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/UiSelect";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../helpers/useToast";
import { queryClient, apiRequest } from "../helpers/queryClient";
import type { Event, InsertEvent } from "../helpers/siteSchema";
import { Plus, Pencil, Trash2, Calendar, Globe, Building, Users, MapPin, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/UiForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEventSchema } from "../helpers/siteSchema";
import { ImageUploader } from "../components/ImageUploader";

const eventTypeOptions = [
  { value: "regional", label: "Regional", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { value: "national", label: "National", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { value: "global", label: "Global", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  { value: "ypf", label: "YPF", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
];

const getTypeColor = (type: string) => {
  return eventTypeOptions.find(t => t.value === type)?.color || "bg-slate-500/20 text-slate-300";
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'global': return <Globe className="h-3 w-3" />;
    case 'national': return <Building className="h-3 w-3" />;
    case 'ypf': return <Users className="h-3 w-3" />;
    default: return <MapPin className="h-3 w-3" />;
  }
};

export default function AdminEvents() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const form = useForm<InsertEvent>({
    resolver: zodResolver(insertEventSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "regional",
      date: undefined as any,
      endDate: undefined,
      location: "",
      imageUrl: "",
      isRecurring: false,
      recurrencePattern: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertEvent) => apiRequest("POST", "/api/events", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event created successfully!" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error creating event", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Event> }) =>
      apiRequest("PATCH", `/api/events/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event updated successfully!" });
      setIsDialogOpen(false);
      setEditingEvent(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({ title: "Error updating event", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event deleted successfully!" });
    },
  });

  const seedMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/events/seed-calendar", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Calendar events seeded successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error seeding events", description: error.message, variant: "destructive" });
    },
  });

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    form.reset({
      title: event.title,
      description: event.description,
      type: event.type,
      date: new Date(event.date),
      endDate: event.endDate ? new Date(event.endDate) : undefined,
      location: event.location,
      imageUrl: event.imageUrl || "",
      isRecurring: event.isRecurring || false,
      recurrencePattern: event.recurrencePattern || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertEvent) => {
    if (editingEvent) {
      updateMutation.mutate({ id: editingEvent.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const groupedByMonth: Record<string, Event[]> = {};
  sortedEvents.forEach(event => {
    const d = new Date(event.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    if (!groupedByMonth[label]) groupedByMonth[label] = [];
    groupedByMonth[label].push(event);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-events-admin-heading">Calendar Events</h1>
          <p className="text-muted-foreground">Manage the church event calendar shown on the public Events and Calendar pages</p>
        </div>
        <div className="flex items-center gap-2">
          {events.length === 0 && (
            <Button
              variant="outline"
              onClick={() => seedMutation.mutate()}
              disabled={seedMutation.isPending}
              data-testid="button-seed-events"
            >
              {seedMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Load Default Calendar
            </Button>
          )}
          <Button onClick={() => {
            setEditingEvent(null);
            form.reset({
              title: "",
              description: "",
              type: "regional",
              date: undefined as any,
              endDate: undefined,
              location: "",
              imageUrl: "",
              isRecurring: false,
              recurrencePattern: "",
            });
            setIsDialogOpen(true);
          }} data-testid="button-add-event">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : events.length > 0 ? (
        Object.entries(groupedByMonth).map(([monthLabel, monthEvents]) => (
          <Card key={monthLabel}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {monthLabel}
              </CardTitle>
              <CardDescription>{monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-wrap items-center justify-between gap-3 p-4 border rounded-lg hover-elevate"
                    data-testid={`item-event-${event.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge className={getTypeColor(event.type)}>
                          {getTypeIcon(event.type)}
                          <span className="ml-1">{eventTypeOptions.find(t => t.value === event.type)?.label || event.type}</span>
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                          {event.endDate && ` – ${new Date(event.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}
                        </span>
                      </div>
                      <h3 className="font-semibold truncate" data-testid={`text-event-title-${event.id}`}>
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {event.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(event)}
                        data-testid={`button-edit-event-${event.id}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this event?")) {
                            deleteMutation.mutate(event.id);
                          }
                        }}
                        data-testid={`button-delete-event-${event.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground space-y-4" data-testid="text-no-events-admin">
              <Calendar className="h-12 w-12 mx-auto opacity-50" />
              <p className="text-lg">No events yet</p>
              <p className="text-sm">Click "Load Default Calendar" to import the church calendar, or add events manually.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
            <DialogDescription>
              {editingEvent ? "Update event details" : "Add a new event to the church calendar"}
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
                      <Input placeholder="Event title" {...field} data-testid="input-event-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-event-type">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventTypeOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <Textarea placeholder="Event description" {...field} data-testid="input-event-description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value instanceof Date && !isNaN(field.value.getTime()) ? field.value.toISOString().split('T')[0] : ""}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          data-testid="input-event-date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value instanceof Date && !isNaN(field.value.getTime()) ? field.value.toISOString().split('T')[0] : ""}
                          onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                          data-testid="input-event-end-date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Event location" {...field} data-testid="input-event-location" />
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
                        category="events"
                        label="Event Flyer (optional)"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel-event">
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-event">
                  {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingEvent ? "Update" : "Create"} Event
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
