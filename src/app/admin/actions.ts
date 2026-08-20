"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { 
  requireAdmin, 
  ADMIN_COOKIE_NAME, 
  DEFAULT_SUPERADMIN_EMAIL, 
  getSuperadminPassword, 
  createSessionToken 
} from "@/lib/admin/auth";
import { 
  approveProspect, 
  rejectProspect, 
  watchProspect, 
  requestResearchProspect, 
  retryAutomationJob, 
  cancelAutomationJob, 
  updateAiAutoSettings, 
  seedDevelopmentFixture 
} from "@/lib/db/repository";
import type { RejectionReason, AutopilotMode, AdminUser } from "@/types/admin";

/**
 * Server action: Sign in with operator credentials
 */
export async function signInAdminAction(formData: FormData): Promise<void> {
  const email = (formData.get("email") as string || "").trim().toLowerCase();
  const password = formData.get("password") as string || "";

  // Super Admin validation (Pete Currey default super_admin).
  // A missing configured password must reject every attempt — never treat an
  // absent secret as "anything matches".
  const expectedPassword = getSuperadminPassword();
  const emailMatches = email === DEFAULT_SUPERADMIN_EMAIL.toLowerCase();
  const passwordMatches =
    Boolean(expectedPassword) &&
    password.length === expectedPassword!.length &&
    crypto.timingSafeEqual(
      Buffer.from(password, "utf8"),
      Buffer.from(expectedPassword!, "utf8")
    );

  if (emailMatches && passwordMatches) {
    const user: AdminUser = {
      id: "usr_pete_superadmin",
      email: DEFAULT_SUPERADMIN_EMAIL,
      name: "Pete Currey",
      role: "super_admin",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const token = createSessionToken(user);
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      // Must cover /api/admin as well as /admin — a cookie scoped to "/admin"
      // is never sent to /api/admin routes, so every admin API call would be
      // rejected by the edge guard.
      path: "/"
    });

    redirect("/admin");
  }

  redirect("/admin/login?error=Invalid+credentials.+Access+restricted+to+authorized+Avorria+operators.");
}

/**
 * Server action: Sign out operator
 */
export async function signOutAdminAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({ name: ADMIN_COOKIE_NAME, path: "/" });
  redirect("/admin/login");
}

/**
 * Server action: Approve a prospect from review queue
 */
export async function approveProspectAction(prospectId: string, notes?: string) {
  const session = await requireAdmin();
  try {
    const result = await approveProspect(prospectId, session.user.id, notes);
    revalidatePath("/admin");
    revalidatePath("/admin/ai-auto");
    revalidatePath("/admin/ai-auto/review");
    revalidatePath("/admin/prospects");
    revalidatePath(`/admin/prospects/${prospectId}`);
    revalidatePath("/admin/automations");
    return { success: true, prospect: result.prospect, job: result.job };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to approve prospect";
    return { success: false, error: message };
  }
}

/**
 * Server action: Reject a prospect with an explicit reason
 */
export async function rejectProspectAction(
  prospectId: string, 
  reason: RejectionReason | string, 
  notes?: string
) {
  const session = await requireAdmin();
  try {
    const result = await rejectProspect(prospectId, session.user.id, reason, notes);
    revalidatePath("/admin");
    revalidatePath("/admin/ai-auto");
    revalidatePath("/admin/ai-auto/review");
    revalidatePath("/admin/prospects");
    revalidatePath(`/admin/prospects/${prospectId}`);
    return { success: true, prospect: result.prospect };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to reject prospect";
    return { success: false, error: message };
  }
}

/**
 * Server action: Place prospect on watch list
 */
export async function watchProspectAction(
  prospectId: string, 
  nextActionDate?: string, 
  notes?: string
) {
  const session = await requireAdmin();
  try {
    const result = await watchProspect(prospectId, session.user.id, nextActionDate, notes);
    revalidatePath("/admin");
    revalidatePath("/admin/ai-auto");
    revalidatePath("/admin/ai-auto/review");
    revalidatePath("/admin/prospects");
    revalidatePath(`/admin/prospects/${prospectId}`);
    return { success: true, prospect: result.prospect };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to watch prospect";
    return { success: false, error: message };
  }
}

/**
 * Server action: Request additional intelligence for prospect
 */
export async function requestResearchAction(prospectId: string, notes?: string) {
  const session = await requireAdmin();
  try {
    const result = await requestResearchProspect(prospectId, session.user.id, notes);
    revalidatePath("/admin");
    revalidatePath("/admin/ai-auto");
    revalidatePath("/admin/ai-auto/review");
    revalidatePath("/admin/prospects");
    revalidatePath(`/admin/prospects/${prospectId}`);
    revalidatePath("/admin/automations");
    return { success: true, prospect: result.prospect, job: result.job };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to request additional research";
    return { success: false, error: message };
  }
}

/**
 * Server action: Retry a failed automation job
 */
export async function retryJobAction(jobId: string) {
  const session = await requireAdmin();
  try {
    const job = await retryAutomationJob(jobId, session.user.id);
    revalidatePath("/admin");
    revalidatePath("/admin/automations");
    return { success: true, job };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retry job";
    return { success: false, error: message };
  }
}

/**
 * Server action: Cancel a queued automation job
 */
export async function cancelJobAction(jobId: string) {
  const session = await requireAdmin();
  try {
    const job = await cancelAutomationJob(jobId, session.user.id);
    revalidatePath("/admin");
    revalidatePath("/admin/automations");
    return { success: true, job };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to cancel job";
    return { success: false, error: message };
  }
}

/**
 * Server action: Update AI Auto parameters
 */
export async function updateSettingsAction(formData: FormData) {
  const session = await requireAdmin();
  try {
    const autopilot_mode = (formData.get("autopilot_mode") as AutopilotMode) || "ASSISTED";
    const min_opportunity_score = Number(formData.get("min_opportunity_score") || 70);
    const min_google_rating = Number(formData.get("min_google_rating") || 4.0);
    const min_review_count = Number(formData.get("min_review_count") || 5);
    const businesses_per_day_target = Number(formData.get("businesses_per_day_target") || 25);
    const radius_km = Number(formData.get("radius_km") || 50);

    const require_prospect_approval = formData.get("require_prospect_approval") === "on";
    const require_website_approval_before_outreach = formData.get("require_website_approval_before_outreach") === "on";

    const sectorsRaw = formData.get("sectors") as string;
    const sectors = sectorsRaw ? sectorsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];

    const citiesRaw = formData.get("cities") as string;
    const cities = citiesRaw ? citiesRaw.split(",").map(c => c.trim()).filter(Boolean) : [];

    const updated = await updateAiAutoSettings({
      autopilot_mode,
      targeting: {
        countries: ["GB"],
        cities: cities.length ? cities : ["London", "Manchester", "Birmingham"],
        radius_km,
        sectors: sectors.length ? sectors : ["Architects & Spatial Design", "Commercial Real Estate"],
        excluded_sectors: ["Gambling", "Adult", "Cryptocurrency Speculation"],
        min_opportunity_score,
        min_google_rating,
        min_review_count,
        businesses_per_day_target
      },
      review_settings: {
        require_prospect_approval,
        require_website_approval_before_outreach
      }
    }, session.user.id);

    revalidatePath("/admin/ai-auto/settings");
    revalidatePath("/admin");
    return { success: true, settings: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update settings";
    return { success: false, error: message };
  }
}

/**
 * Server action: Seed development fixture prospect
 */
export async function seedFixtureAction() {
  await requireAdmin();
  try {
    const result = await seedDevelopmentFixture();
    revalidatePath("/admin");
    revalidatePath("/admin/ai-auto");
    revalidatePath("/admin/ai-auto/review");
    revalidatePath("/admin/prospects");
    return { success: true, prospect: result.prospect };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to seed fixture";
    return { success: false, error: message };
  }
}
