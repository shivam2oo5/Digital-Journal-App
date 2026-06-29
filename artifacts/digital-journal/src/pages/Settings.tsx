import { useState } from "react";
import { useSettings } from "@/hooks/use-settings";
import { useTheme } from "@/hooks/use-theme";
import { CATEGORY_COLORS, Category } from "@/lib/storage";
import { exportToJson, exportToText } from "@/lib/export";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Moon, Sun, Download, Trash2, Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const { theme, toggleTheme } = useTheme();

  const handleClearAll = () => {
    localStorage.removeItem("djp_journals");
    localStorage.removeItem("djp_settings");
    toast.success("All data has been cleared.");
    window.location.href = "/";
  };

  return (
    <div className="space-y-8 pb-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/10 p-2 rounded-xl text-primary">
          <SettingsIcon className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="grid gap-6">
        <Card className="rounded-[20px]">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how Digital Journal Pro looks on your device.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Theme</Label>
                <div className="text-sm text-muted-foreground">Toggle between light and dark mode.</div>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme} 
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label className="text-base">Font Size</Label>
              <div className="text-sm text-muted-foreground mb-4">Adjust the text size across the application.</div>
              <RadioGroup 
                defaultValue={settings.fontSize} 
                onValueChange={(val: 'small' | 'medium' | 'large') => updateSettings({ fontSize: val })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 bg-secondary/50 px-4 py-3 rounded-xl border border-transparent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 cursor-pointer">
                  <RadioGroupItem value="small" id="r-small" />
                  <Label htmlFor="r-small" className="cursor-pointer text-sm">Small</Label>
                </div>
                <div className="flex items-center space-x-2 bg-secondary/50 px-4 py-3 rounded-xl border border-transparent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 cursor-pointer">
                  <RadioGroupItem value="medium" id="r-medium" />
                  <Label htmlFor="r-medium" className="cursor-pointer text-base">Medium</Label>
                </div>
                <div className="flex items-center space-x-2 bg-secondary/50 px-4 py-3 rounded-xl border border-transparent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 cursor-pointer">
                  <RadioGroupItem value="large" id="r-large" />
                  <Label htmlFor="r-large" className="cursor-pointer text-lg">Large</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[20px]">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Manage your default settings for new entries.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label className="text-base">Default Category</Label>
              <div className="text-sm text-muted-foreground mb-4">Automatically selected when creating a new journal entry.</div>
              <Select 
                value={settings.defaultCategory} 
                onValueChange={(val: Category) => updateSettings({ defaultCategory: val })}
              >
                <SelectTrigger className="w-[200px] rounded-xl h-11 bg-secondary/50">
                  <SelectValue placeholder="Select default category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(CATEGORY_COLORS).map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[20px]">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Export your journals or clear all local data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Export Data</Label>
                <div className="text-sm text-muted-foreground">Download all your journals for backup.</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl h-10 px-4 gap-2" onClick={exportToJson}>
                  <Download className="h-4 w-4" /> JSON
                </Button>
                <Button variant="outline" className="rounded-xl h-10 px-4 gap-2" onClick={exportToText}>
                  <Download className="h-4 w-4" /> Text
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-destructive font-semibold">Danger Zone</Label>
                <div className="text-sm text-muted-foreground">Permanently delete all data from this browser.</div>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="rounded-xl h-10 px-4 gap-2">
                    <Trash2 className="h-4 w-4" /> Clear All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all your journal entries and settings from this browser's local storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearAll} className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Yes, delete everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
