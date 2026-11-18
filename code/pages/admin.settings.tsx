import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UiCard";

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-settings-admin-heading">Settings</h1>
        <p className="text-muted-foreground">Configure your church website settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Site configuration options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-12 text-center">
            Settings configuration coming soon. Use the other admin sections to manage content.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
