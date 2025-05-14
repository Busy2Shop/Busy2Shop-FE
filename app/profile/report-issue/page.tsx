"use client"

import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const issueTypes = [
  "Order not received",
  "Wrong item delivered",
  "Payment issue",
  "Account problem",
  "Other"
];

export default function ReportIssuePage() {
  const [form, setForm] = useState({
    order: "",
    issueType: "",
    email: "",
    details: ""
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const feedbackOptions = [
    "Agent was friendly",
    "Items were exactly and ordered",
    "Delivery was on time",
    "Had issue with items",
    "Packaging was good",
    "Would order again"
  ];
  const [feedback, setFeedback] = useState<string[]>([]);
  const [comments, setComments] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFeedbackChange = (option: string) => {
    setFeedback((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your feedback!");
    // In a real app, send feedback data to backend here
  };

  const handleSkip = () => {
    setShowFeedback(false);
    // Optionally, redirect or close modal
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFeedback(true);
    // toast.success("Request submitted! We'll get back to you soon.");
    // In a real app, send form data to backend here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center mb-4">
              <Link href="/profile" className="mr-2 text-gray-700 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold">Report an Issue</h1>
            </div>
            <p className="text-gray-400 mb-6">Let us know about any problems with your order and we'll help resolve them.</p>
            <div className="bg-white rounded-xl shadow p-6">
              {showFeedback ? (
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center mb-4">
                    <Link href="/profile" className="mr-2 text-gray-700 hover:text-gray-900">
                      <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-2xl font-bold">Tell Us More</h1>
                  </div>
                  <form onSubmit={handleFeedbackSubmit}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select all that apply:</label>
                    <div className="space-y-2 mb-4">
                      {feedbackOptions.map(option => (
                        <label key={option} className="flex items-center gap-2 p-2 border rounded">
                          <input
                            type="checkbox"
                            checked={feedback.includes(option)}
                            onChange={() => handleFeedbackChange(option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Write Additional Comments</label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        placeholder="Tell us more about your experience..."
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#00A67E] hover:bg-[#008F6B] text-white font-semibold py-2 rounded mb-2"
                    >
                      Submit Feedback
                    </button>
                    <button
                      type="button"
                      className="w-full border border-[#00A67E] text-[#00A67E] font-semibold py-2 rounded"
                      onClick={handleSkip}
                    >
                      Skip
                    </button>
                  </form>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order #</label>
                    <input
                      name="order"
                      value={form.order}
                      onChange={handleChange}
                      placeholder="e.g ORD-12345"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                    <select
                      name="issueType"
                      value={form.issueType}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md text-gray-700"
                      required
                    >
                      <option value="">Select issue type</option>
                      {issueTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                    <textarea
                      name="details"
                      value={form.details}
                      onChange={handleChange}
                      placeholder="Please describe your issue in details"
                      className="w-full p-2 border rounded-md min-h-[100px]"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#00A67E] hover:bg-[#008F6B] text-white font-semibold py-2 px-6 rounded"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 