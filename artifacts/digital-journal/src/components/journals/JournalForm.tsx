import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Journal, Category, Mood, CATEGORY_COLORS } from "@/lib/storage";
import { useJournals } from "@/hooks/use-journals";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Heart, Pin, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const MOODS: { val: Mood, icon: string }[] = [
  { val: 'Happy', icon: '😊' },
  { val: 'Motivated', icon: '💪' },
  { val: 'Calm', icon: '😌' },
  { val: 'Excited', icon: '🎉' },
  { val: 'Neutral', icon: '😐' },
  { val: 'Stressed', icon: '😰' },
  { val: 'Sad', icon: '😢' },
];

const CATEGORIES: Category[] = ['Personal', 'Study', 'Work', 'Travel', 'Health', 'Goals', 'Ideas', 'Diary'];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string() as z.ZodType<Category>,
  mood: z.string() as z.ZodType<Mood>,
  tags: z.string(),
  isPinned: z.boolean(),
  isFavorite: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function JournalForm({ initialData }: { initialData?: Journal }) {
  const [, setLocation] = useLocation();
  const { createJournal, updateJournal } = useJournals();
  const { settings } = useSettings();
  const isEditing = !!initialData;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category || settings.defaultCategory,
      mood: initialData?.mood || "Neutral",
      tags: initialData?.tags.join(", ") || "",
      isPinned: initialData?.isPinned || false,
      isFavorite: initialData?.isFavorite || false,
    },
  });

  const onSubmit = (data: FormValues) => {
    const tagsArray = data.tags.split(",").map(t => t.trim()).filter(t => t.length > 0);
    const colorLabel = CATEGORY_COLORS[data.category];

    const journalData = {
      title: data.title,
      content: data.content,
      category: data.category,
      mood: data.mood,
      tags: tagsArray,
      isPinned: data.isPinned,
      isFavorite: data.isFavorite,
      colorLabel,
      isArchived: initialData?.isArchived || false,
      isDeleted: initialData?.isDeleted || false,
    };

    if (isEditing && initialData) {
      updateJournal(initialData.id, journalData);
      toast.success("Journal updated successfully");
      setLocation(`/journal/${initialData.id}`);
    } else {
      const newJ = createJournal(journalData);
      toast.success("Journal created successfully");
      setLocation(`/journal/${newJ.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Journal" : "New Journal"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="What's on your mind?" 
                        className="text-xl font-medium h-14 rounded-xl bg-card border-border/50 focus-visible:ring-primary/20" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Start writing here..." 
                        className="min-h-[400px] resize-none rounded-2xl bg-card border-border/50 focus-visible:ring-primary/20 text-base leading-relaxed p-6" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-80 space-y-6">
              <div className="bg-card rounded-[20px] p-6 border shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="font-semibold">Quick Actions</span>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="isPinned"
                      render={({ field }) => (
                        <Toggle
                          pressed={field.value}
                          onPressedChange={field.onChange}
                          aria-label="Toggle pin"
                          className="data-[state=on]:bg-primary/10 data-[state=on]:text-primary rounded-xl"
                        >
                          <Pin className={field.value ? "fill-current h-4 w-4" : "h-4 w-4"} />
                        </Toggle>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isFavorite"
                      render={({ field }) => (
                        <Toggle
                          pressed={field.value}
                          onPressedChange={field.onChange}
                          aria-label="Toggle favorite"
                          className="data-[state=on]:bg-destructive/10 data-[state=on]:text-destructive rounded-xl"
                        >
                          <Heart className={field.value ? "fill-current h-4 w-4" : "h-4 w-4"} />
                        </Toggle>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl bg-secondary/50">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map(c => (
                            <SelectItem key={c} value={c}>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[c] }} />
                                {c}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mood</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl bg-secondary/50">
                            <SelectValue placeholder="Select a mood" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOODS.map(m => (
                            <SelectItem key={m.val} value={m.val}>
                              <div className="flex items-center gap-2">
                                <span>{m.icon}</span>
                                <span>{m.val}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. morning, deep thoughts" 
                          className="rounded-xl bg-secondary/50" 
                          {...field} 
                        />
                      </FormControl>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {field.value.split(',').filter(t => t.trim().length > 0).slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs font-normal rounded-full bg-background">
                            #{tag.trim()}
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 mt-4 border-t">
                  <Button type="submit" className="w-full rounded-xl h-12 gap-2 text-base font-semibold shadow-md shadow-primary/20">
                    <Save className="h-5 w-5" />
                    {isEditing ? "Save Changes" : "Create Entry"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
