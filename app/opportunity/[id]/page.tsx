"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ExternalLink,
  ArrowLeft,
  Clock,
  Users,
  Award,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarButton } from "@/components/global/calendar-button";
import {
  getOpportunityById,
  getDaysUntilDeadline,
  getDeadlineUrgency,
} from "@/lib/data";

interface OpportunityPageProps {
  params: {
    id: string;
  };
}

export default function OpportunityPage({ params }: OpportunityPageProps) {
  const opportunity = getOpportunityById(params.id);

  if (!opportunity) {
    notFound();
  }

  const daysUntil = opportunity.closeDate
    ? getDaysUntilDeadline(opportunity.closeDate)
    : null;
  const urgency = opportunity.closeDate
    ? getDeadlineUrgency(opportunity.closeDate)
    : "safe";

  const urgencyStyles = {
    safe: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
    warning:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
    urgent:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
  };

  const handleShare = () => {
    const tweetText = `I'm delighted to share that I've applied to ${opportunity.name} to elevate my startup's trajectory, tap into tailored mentorship, and collaborate with fellow innovators.

Can't wait to dive in and share updates as the journey unfolds!`;
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(twitterIntentUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/browse">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Link>
      </Button>

      <div className="flex items-start justify-between space-x-6 mb-8">
        <div className="flex items-start space-x-6">
          <Image
            src={opportunity.logoUrl}
            alt={`${opportunity.name} logo`}
            width={100}
            height={100}
            className="rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                {opportunity.name}
              </h1>
              {opportunity.closeDate &&
                getDaysUntilDeadline(opportunity.closeDate) < 0 && (
                  <Badge className="text-sm" variant="destructive">
                    Closed
                  </Badge>
                )}
            </div>
            <p className="text-xl text-muted-foreground mb-4">
              {opportunity.organizer}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm">
                {opportunity.category}
              </Badge>
              {opportunity.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {opportunity.closeDate &&
            getDaysUntilDeadline(opportunity.closeDate) >= 0 && (
              <Button asChild size="lg">
                <a
                  href={opportunity.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Apply Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="flex items-center"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share on X
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About this Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {opportunity.fullDescription}
              </p>
            </CardContent>
          </Card>

          {opportunity.benefits.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  What You&apos;ll Get
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {opportunity.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Eligibility Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {opportunity.eligibility}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Deadline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {opportunity.closeDate ? (
                <div
                  className={`p-4 rounded-lg border text-center ${urgencyStyles[urgency]}`}
                >
                  <div className="text-2xl font-bold">
                    {daysUntil !== null && daysUntil >= 0
                      ? `${daysUntil} days left`
                      : "Closed"}
                  </div>
                  <div className="text-sm opacity-75">
                    Closes{" "}
                    {new Date(opportunity.closeDate).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-lg border text-center ${urgencyStyles.safe}`}
                >
                  <div className="text-2xl font-bold">Rolling Application</div>
                  <div className="text-sm opacity-75">Apply anytime</div>
                </div>
              )}

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Opens:</span>
                  <span>
                    {opportunity.openDate
                      ? new Date(opportunity.openDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Region:</span>
                  <span className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {opportunity.region}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {opportunity.closeDate && (
            <Card>
              <CardHeader>
                <CardTitle>Add to Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarButton opportunity={opportunity} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
