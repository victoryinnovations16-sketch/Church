import { Card, CardContent, CardHeader, CardTitle } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../helpers/useToast";
import { queryClient, apiRequest } from "../helpers/queryClient";
import type { PrayerRequest } from "../helpers/siteSchema";
import { Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

export default function AdminPrayer() {
  const { toast } = useToast();

  const { data: prayerRequests = [], isLoading } = useQuery<PrayerRequest[]>({
    queryKey: ["/api/prayer-requests"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/prayer-requests/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-requests"] });
      toast({ title: "Status updated successfully!" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/prayer-requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/prayer-requests"] });
      toast({ title: "Prayer request deleted successfully!" });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "praying":
        return "secondary";
      case "answered":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-prayer-admin-heading">
          Prayer Requests
        </h1>
        <p className="text-muted-foreground">
          Manage prayer requests from your community
        </p>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Loading prayer requests...</p>
            </CardContent>
          </Card>
        ) : prayerRequests.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No prayer requests yet</p>
            </CardContent>
          </Card>
        ) : (
          prayerRequests.map((request) => (
            <Card key={request.id} data-testid={`card-prayer-${request.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">
                        {request.isAnonymous ? "Anonymous Request" : request.name}
                      </CardTitle>
                      <Badge variant={getStatusColor(request.status)} data-testid={`badge-prayer-status-${request.id}`}>
                        {request.status}
                      </Badge>
                      {request.isAnonymous && (
                        <Badge variant="outline" data-testid={`badge-prayer-anonymous-${request.id}`}>
                          Anonymous
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                      {!request.isAnonymous && (
                        <>
                          <span data-testid={`text-prayer-email-${request.id}`}>
                            {request.email}
                          </span>
                          <span className="hidden sm:inline">•</span>
                        </>
                      )}
                      <span data-testid={`text-prayer-date-${request.id}`}>
                        {format(new Date(request.createdAt!), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-accent/30 p-4 rounded-md">
                  <p className="whitespace-pre-wrap" data-testid={`text-prayer-request-${request.id}`}>
                    {request.request}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {request.status === "pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: request.id, status: "praying" })}
                      data-testid={`button-mark-praying-${request.id}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Mark as Praying
                    </Button>
                  )}
                  {request.status === "praying" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: request.id, status: "answered" })}
                      data-testid={`button-mark-answered-${request.id}`}
                    >
                      Mark as Answered
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this prayer request?")) {
                        deleteMutation.mutate(request.id);
                      }
                    }}
                    data-testid={`button-delete-prayer-${request.id}`}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
