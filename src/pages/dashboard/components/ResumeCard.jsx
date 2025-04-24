import { FaEye, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-blue-400 via-blue-500 to-indigo-500",
  "from-cyan-400 via-blue-500 to-indigo-600",
  "from-blue-300 via-indigo-400 to-purple-500",
];

const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const gradient = getRandomGradient();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success("Resume deleted");
    } catch (error) {
      console.error("Error deleting resume:", error.message);
      toast.error("Failed to delete resume");
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };

  return (
    <div
      className={`p-5 bg-gradient-to-br ${gradient} rounded-xl shadow-md transition hover:shadow-xl duration-300 ease-in-out`}
    >
      <div className="bg-white rounded-md p-6 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-blue-800 truncate">
          {resume.title}
        </h2>
      </div>

      <div className="mt-6 bg-white rounded-md p-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
          className="text-blue-600 hover:bg-blue-50 transition"
        >
          <FaEye />
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
          className="text-indigo-600 hover:bg-indigo-50 transition"
        >
          <FaEdit />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setOpenAlert(true)}
          className="text-red-500 hover:bg-red-50 transition"
        >
          <FaTrashAlt />
        </Button>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={loading}>
                {loading ? <FaSpinner className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCard;
