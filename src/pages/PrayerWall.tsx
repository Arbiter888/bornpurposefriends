import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

const PrayerWall = () => {
  const user = useUser();
  const { toast } = useToast();
  const [newRequest, setNewRequest] = useState({ title: "", content: "", isAnonymous: false });
  const [newResponse, setNewResponse] = useState<{ [key: string]: string }>({});

  const { data: prayerRequests, refetch } = useQuery({
    queryKey: ["prayerRequests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select(`
          *,
          profiles:user_id (
            email
          ),
          responses:prayer_responses (
            id,
            content,
            created_at,
            user_id,
            profiles:user_id (
              email
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.from("prayer_requests").insert({
        user_id: user.id,
        title: newRequest.title,
        content: newRequest.content,
        is_anonymous: newRequest.isAnonymous,
      });

      if (error) throw error;

      toast({
        title: "Prayer request submitted",
        description: "Your prayer request has been shared with the community.",
      });

      setNewRequest({ title: "", content: "", isAnonymous: false });
      refetch();
    } catch (error) {
      console.error("Error submitting prayer request:", error);
      toast({
        title: "Error",
        description: "Failed to submit prayer request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitResponse = async (requestId: string) => {
    if (!user || !newResponse[requestId]) return;

    try {
      const { error } = await supabase.from("prayer_responses").insert({
        prayer_request_id: requestId,
        user_id: user.id,
        content: newResponse[requestId],
      });

      if (error) throw error;

      toast({
        title: "Response submitted",
        description: "Your response has been added.",
      });

      setNewResponse((prev) => ({ ...prev, [requestId]: "" }));
      refetch();
    } catch (error) {
      console.error("Error submitting response:", error);
      toast({
        title: "Error",
        description: "Failed to submit response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Prayer Wall</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Share Your Prayer Request</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmitRequest}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newRequest.title}
                onChange={(e) => setNewRequest((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Prayer request title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Request</Label>
              <Textarea
                id="content"
                value={newRequest.content}
                onChange={(e) => setNewRequest((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Share your prayer request..."
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={newRequest.isAnonymous}
                onCheckedChange={(checked) =>
                  setNewRequest((prev) => ({ ...prev, isAnonymous: checked }))
                }
              />
              <Label htmlFor="anonymous">Post anonymously</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Share Prayer Request</Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-6">
        {prayerRequests?.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>{request.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Posted by {request.is_anonymous ? "Anonymous" : request.profiles?.email} on{" "}
                {format(new Date(request.created_at), "PPP")}
              </p>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap mb-6">{request.content}</p>
              <div className="space-y-4">
                <h4 className="font-semibold">Responses:</h4>
                {request.responses?.map((response) => (
                  <div key={response.id} className="pl-4 border-l-2 border-muted">
                    <p className="whitespace-pre-wrap">{response.content}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {response.profiles?.email} - {format(new Date(response.created_at), "PPP")}
                    </p>
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <Input
                    value={newResponse[request.id] || ""}
                    onChange={(e) =>
                      setNewResponse((prev) => ({ ...prev, [request.id]: e.target.value }))
                    }
                    placeholder="Write a response..."
                  />
                  <Button onClick={() => handleSubmitResponse(request.id)}>Respond</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrayerWall;