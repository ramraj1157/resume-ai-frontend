import React, { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (resumetitle === "") {
      console.log("Please add a title to your resume");
      setLoading(false);
      return;
    }

    const data = {
      data: {
        title: resumetitle,
        themeColor: "#2563EB", // Tailwind blue-600
      },
    };

    console.log(`Creating Resume ${resumetitle}`);
    createNewResume(data)
      .then((res) => {
        console.log("Response from Create Resume", res);
        Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      })
      .finally(() => {
        setLoading(false);
        setResumetitle("");
      });
  };

  return (
    <>
      <div
        className="p-14 py-24 flex items-center justify-center border-2 border-blue-200 bg-blue-50 rounded-lg h-[380px] hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-lg transform-gpu group"
        onClick={() => setOpenDialog(true)}
      >
        <CopyPlus className="w-10 h-10 text-blue-500 group-hover:text-blue-600 transition" />
      </div>

      <Dialog open={isDialogOpen}>
        <DialogContent setOpenDialog={setOpenDialog} className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-blue-600">
              Create a New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Add a title and description to your new resume.
              <Input
                className="my-3 mt-4 border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                placeholder="Ex: Backend Resume"
                value={resumetitle}
                onChange={(e) => setResumetitle(e.target.value.trimStart())}
              />
            </DialogDescription>

            <div className="gap-2 flex justify-end mt-4">
              <Button
                variant="ghost"
                onClick={() => setOpenDialog(false)}
                className="hover:bg-gray-100 transition"
              >
                Cancel
              </Button>
              <Button
                onClick={createResume}
                disabled={!resumetitle || loading}
                className="bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                {loading ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : (
                  "Create Resume"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
