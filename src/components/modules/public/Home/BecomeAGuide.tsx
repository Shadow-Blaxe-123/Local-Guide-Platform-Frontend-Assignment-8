import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Globe, Wallet } from "lucide-react";
import Link from "next/link";

export default function BecomeAGuideSection() {
  return (
    <section className="py-20 bg-muted/30" id="becomeAGuide">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4">For Locals</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Turn Your Local Knowledge Into Income
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Share your city, culture, and stories with travelers from around the
            world. Create tours, set your own rates, and guide experiences you
            truly care about.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Create Your Own Tours
              </h3>
              <p className="text-sm text-muted-foreground">
                Design unique experiences based on your expertise—history, food,
                photography, nightlife, or anything you love.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Your Own Rates</h3>
              <p className="text-sm text-muted-foreground">
                You decide how much you charge per tour or per day. No fixed
                salaries, no middlemen.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Meet Travelers Worldwide
              </h3>
              <p className="text-sm text-muted-foreground">
                Connect with people from different cultures and help them
                experience your city like a local.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="rounded-xl">
            <Link href="/register?role=guide">
              Become a Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Signing up is free. Start earning on your own terms.
          </p>
        </div>
      </div>
    </section>
  );
}
