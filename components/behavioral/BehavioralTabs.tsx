"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FreeResponsePractice,
  type PracticeItem,
} from "@/components/practice/FreeResponsePractice";
import { StoryLibrary } from "@/components/stories/StoryLibrary";
import type { Story } from "@/lib/db/schema";

export function BehavioralTabs({
  behavioral,
  technical,
  stories,
}: {
  behavioral: PracticeItem[];
  technical: PracticeItem[];
  stories: Story[];
}) {
  return (
    <Tabs defaultValue="behavioral" className="space-y-5">
      <TabsList>
        <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
        <TabsTrigger value="technical">Ops technicals</TabsTrigger>
        <TabsTrigger value="stories">My stories</TabsTrigger>
      </TabsList>
      <TabsContent value="behavioral">
        <FreeResponsePractice items={behavioral} />
      </TabsContent>
      <TabsContent value="technical">
        <FreeResponsePractice items={technical} />
      </TabsContent>
      <TabsContent value="stories">
        <StoryLibrary initial={stories} />
      </TabsContent>
    </Tabs>
  );
}
