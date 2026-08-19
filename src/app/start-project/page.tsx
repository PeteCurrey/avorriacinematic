"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { trackEvent } from "@/lib/analytics/track";

export default function StartProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    projectType: "build",
    goals: "",
    budget: "£25k - £50k",
    timing: "1-3 months",
    brief: "",
    referral: "",
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!formData.brief.trim()) newErrors.brief = "Please provide an initial project brief";
    if (!formData.consent) newErrors.consent = "Consent to data processing is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    trackEvent("start_project_submit", {
      projectType: formData.projectType,
      budget: formData.budget
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="border-b border-avorria-line pb-12 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-avorria-signal">06</span>
          <span className="text-avorria-line-strong">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">Commission</span>
        </div>
        <h1 className="display-lg uppercase text-avorria-white">Start a Project</h1>
        <p className="font-mono text-sm text-avorria-muted uppercase tracking-wider mt-4 max-w-xl">
          Direct engagement enquiry. We review every brief with technical and strategic rigour.
        </p>
      </div>

      {isSuccess ? (
        <div className="p-12 sm:p-16 border border-avorria-signal/30 bg-avorria-surface max-w-2xl">
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest mb-2">
            Enquiry Transmitted
          </div>
          <h2 className="font-display font-bold text-2xl uppercase text-avorria-white mb-4">
            Thank you, {formData.name}
          </h2>
          <p className="font-body text-sm text-avorria-muted leading-relaxed">
            Your project brief has been received. Our leadership team will review your requirements and respond within 24 business hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Full Name *"
              placeholder="e.g. Alexander Vance"
              value={formData.name}
              error={errors.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Work Email *"
              type="email"
              placeholder="e.g. alexander@enterprise.com"
              value={formData.email}
              error={errors.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Company / Organisation"
              placeholder="e.g. Vance Logistics"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <Input
              label="Existing Website (if applicable)"
              placeholder="e.g. https://example.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-avorria-muted uppercase tracking-wider">
                Primary Discipline
              </label>
              <select
                className="w-full bg-avorria-surface border border-avorria-line px-4 py-3 text-sm text-avorria-white focus:border-avorria-signal focus:outline-none"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              >
                <option value="build">Build (Design & Engineering)</option>
                <option value="search">Search (Technical Architecture)</option>
                <option value="systems">Systems (AI & Workflows)</option>
                <option value="multidisciplinary">Multidisciplinary Flagship</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-avorria-muted uppercase tracking-wider">
                Indicative Budget
              </label>
              <select
                className="w-full bg-avorria-surface border border-avorria-line px-4 py-3 text-sm text-avorria-white focus:border-avorria-signal focus:outline-none"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              >
                <option value="£15k - £25k">£15,000 - £25,000</option>
                <option value="£25k - £50k">£25,000 - £50,000</option>
                <option value="£50k - £100k">£50,000 - £100,000</option>
                <option value="£100k+">£100,000+</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-avorria-muted uppercase tracking-wider">
                Target Timeline
              </label>
              <select
                className="w-full bg-avorria-surface border border-avorria-line px-4 py-3 text-sm text-avorria-white focus:border-avorria-signal focus:outline-none"
                value={formData.timing}
                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
              >
                <option value="Immediate">Immediate (Within 4 weeks)</option>
                <option value="1-3 months">1 - 3 months</option>
                <option value="3-6 months">3 - 6 months</option>
                <option value="Q3/Q4 2025">Q3/Q4 2025</option>
              </select>
            </div>
          </div>

          <Textarea
            label="Project Brief & Objectives *"
            placeholder="Outline your project scope, core challenges, and strategic timeline..."
            value={formData.brief}
            error={errors.brief}
            onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
          />

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 accent-avorria-signal"
            />
            <label htmlFor="consent" className="font-mono text-xs text-avorria-muted">
              I agree to Avorria processing my details for the purpose of this project evaluation.
            </label>
          </div>
          {errors.consent && <span className="font-mono text-[10px] text-red-400 block">{errors.consent}</span>}

          <div className="pt-4">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Transmitting..." : "Submit Project Brief →"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
