import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UiCard";
import { Button } from "../components/UiButton";
import { Badge } from "../components/UiBadge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../helpers/useToast";
import { queryClient, apiRequest } from "../helpers/queryClient";
import type { ContactSubmission } from "../helpers/siteSchema";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";

export default function AdminContact() {
  const { toast } = useToast();

  const { data: submissions = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact-submissions"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/contact-submissions/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-submissions"] });
      toast({ title: "Status updated successfully!" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/contact-submissions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-submissions"] });
      toast({ title: "Submission deleted successfully!" });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "default";
      case "read":
        return "secondary";
      case "responded":
        return "outline";
      case "archived":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-contact-admin-heading">
          Contact Submissions
        </h1>
        <p className="text-muted-foreground">
          Manage contact form submissions from your website
        </p>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Loading submissions...</p>
            </CardContent>
          </Card>
        ) : submissions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No contact submissions yet</p>
            </CardContent>
          </Card>
        ) : (
          submissions.map((submission) => (
            <Card key={submission.id} data-testid={`card-submission-${submission.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl" data-testid={`text-submission-subject-${submission.id}`}>
                        {submission.subject}
                      </CardTitle>
                      <Badge variant={getStatusColor(submission.status)} data-testid={`badge-status-${submission.id}`}>
                        {submission.status}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                      <span data-testid={`text-submission-name-${submission.id}`}>
                        <strong>From:</strong> {submission.name}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span data-testid={`text-submission-email-${submission.id}`}>
                        {submission.email}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span data-testid={`text-submission-date-${submission.id}`}>
                        {format(new Date(submission.createdAt!), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-accent/30 p-4 rounded-md">
                  <p className="whitespace-pre-wrap" data-testid={`text-submission-message-${submission.id}`}>
                    {submission.message}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {submission.status === "new" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: submission.id, status: "read" })}
                      data-testid={`button-mark-read-${submission.id}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                  {submission.status === "read" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: submission.id, status: "responded" })}
                      data-testid={`button-mark-responded-${submission.id}`}
                    >
                      Mark as Responded
                    </Button>
                  )}
                  {submission.status !== "archived" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: submission.id, status: "archived" })}
                      data-testid={`button-archive-${submission.id}`}
                    >
                      <EyeOff className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this submission?")) {
                        deleteMutation.mutate(submission.id);
                      }
                    }}
                    data-testid={`button-delete-${submission.id}`}
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
