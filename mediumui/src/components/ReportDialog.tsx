import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Flag } from "lucide-react";

interface ReportDialogProps {
  children: React.ReactNode;
  onReport: (reason: string) => void;
}

const reportReasons = [
  { id: "spam", label: "Spam or misleading content" },
  { id: "harassment", label: "Harassment or hate speech" },
  { id: "violence", label: "Violence or dangerous content" },
  { id: "copyright", label: "Copyright violation" },
  { id: "privacy", label: "Privacy violation" },
  { id: "other", label: "Other" },
];

const ReportDialog = ({ children, onReport }: ReportDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("spam");

  const handleReport = () => {
    onReport(selectedReason);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="w-4 h-4" />
            Report this story
          </DialogTitle>
          <DialogDescription>
            Help us understand what's happening with this story.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
            {reportReasons.map((reason) => (
              <div key={reason.id} className="flex items-center space-x-2">
                <RadioGroupItem value={reason.id} id={reason.id} />
                <Label htmlFor={reason.id} className="text-sm">
                  {reason.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReport}>
              Submit Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
