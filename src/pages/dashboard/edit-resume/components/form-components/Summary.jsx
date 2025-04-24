import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

// Updated Prompt (Single-line focused)
const prompt =
  "Generate a professional one-line resume summary for the role of {jobTitle}.";

function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummery, setAiGeneratedSummery] = useState(null);
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    const value = e.target.value;
    dispatch(addResumeData({ ...resumeInfo, summary: value }));
    setSummary(value);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { data: { summary } };

    try {
      if (resume_id) {
        await updateThisResume(resume_id, data);
        toast("Resume Updated", { type: "success" });
      }
    } catch (error) {
      toast("Error updating resume", { description: error.message });
    } finally {
      enanbledNext(true);
      enanbledPrev(true);
      setLoading(false);
    }
  };

  const setSummery = (summary) => {
    dispatch(addResumeData({ ...resumeInfo, summary }));
    setSummary(summary);
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);

    if (!resumeInfo?.jobTitle) {
      toast("Please add a job title before generating summary.");
      setLoading(false);
      return;
    }

    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const raw = await result.response.text();
      const cleaned = raw.trim().replace(/^"|"$/g, "");
      setAiGeneratedSummery(cleaned);
      toast("Summary generated successfully ✅");
    } catch (error) {
      console.error("AI Error:", error);
      toast("Failed to generate summary", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-blue-500 mt-10 bg-white">
      <h2 className="font-bold text-xl text-blue-700 mb-1">
        Professional Summary
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Write a one-line summary that highlights your expertise. You can use AI
        to generate it.
      </p>

      <form onSubmit={onSave}>
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-gray-700">Summary</label>
          <Button
            type="button"
            onClick={GenerateSummeryFromAI}
            variant="outline"
            size="sm"
            className="flex gap-2 text-blue-600 border-blue-500"
          >
            <Sparkles className="w-4 h-4" /> Generate from AI
          </Button>
        </div>

        <Textarea
          name="summary"
          className="mb-4"
          placeholder="E.g., Experienced frontend developer with 3+ years in React and modern UI design."
          required
          value={summary}
          onChange={handleInputChange}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin w-5 h-5" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>

      {aiGeneratedSummery && (
        <div className="my-5">
          <h3 className="font-semibold text-gray-800 mb-2">
            AI Suggested Summary
          </h3>
          <div
            onClick={() => {
              enanbledNext(false);
              enanbledPrev(false);
              setSummery(aiGeneratedSummery);
            }}
            className="cursor-pointer p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition border border-blue-200"
          >
            <p className="text-sm text-gray-800">{aiGeneratedSummery}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
