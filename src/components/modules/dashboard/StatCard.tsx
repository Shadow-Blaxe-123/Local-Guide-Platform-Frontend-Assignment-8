import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
