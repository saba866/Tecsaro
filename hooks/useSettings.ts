"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface PasswordFormState {
  current: string;
  newPass: string;
  confirmNew: string;
}

export function useSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState<any | null>(null);
  const [security, setSecurity] = useState<any | null>(null);

  const [userEmail, setUserEmail] = useState<string>("");

  const [success, setSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    current: "",
    newPass: "",
    confirmNew: "",
  });

  // --------------------------------------------------------
  // LOAD SETTINGS + SECURITY
  // --------------------------------------------------------
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserEmail(user.email || "");

      // -------- SETTINGS TABLE --------
      let { data: notif } = await supabase
        .from("settings")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!notif) {
        const { data: newNotif } = await supabase
          .from("settings")
          .insert([{ id: user.id }])
          .select()
          .single();
        notif = newNotif;
      }
      setSettings(notif);

      // -------- SECURITY TABLE --------
      let { data: sec } = await supabase
        .from("settings_security")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!sec) {
        const { data: newSec } = await supabase
          .from("settings_security")
          .insert([{ id: user.id }])
          .select()
          .single();
        sec = newSec;
      }
      setSecurity(sec);

      setLoading(false);
    })();
  }, []);

  // --------------------------------------------------------
  // SAVE NOTIFICATIONS
  // --------------------------------------------------------
  const handleUpdateNotifications = async () => {
    if (!settings) return;

    setSaving(true);

    const { error } = await supabase
      .from("settings")
      .update({
        email_notifications: settings.email_notifications,
        weekly_digest: settings.weekly_digest,
        debate_notifications: settings.debate_notifications,
        newsfeed_updates: settings.newsfeed_updates,
        updated_at: new Date(),
      })
      .eq("id", settings.id);

    setSaving(false);

    if (!error) {
      setSuccess("Notification settings saved");
      setTimeout(() => setSuccess(null), 2500);
    }
  };

  // --------------------------------------------------------
  // CHANGE PASSWORD
  // --------------------------------------------------------
  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordSuccess(null);

    const { current, newPass, confirmNew } = passwordForm;

    if (!current || !newPass || !confirmNew) {
      return setPasswordError("All fields are required.");
    }

    if (newPass.length < 6) {
      return setPasswordError("New password must be at least 6 characters.");
    }

    if (newPass !== confirmNew) {
      return setPasswordError("New passwords do not match.");
    }

    // Step 1: reauthenticate with old password
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: current,
    });

    if (loginError) {
      return setPasswordError("Incorrect current password.");
    }

    // Step 2: update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPass,
    });

    if (updateError) {
      return setPasswordError(updateError.message);
    }

    setPasswordSuccess("Password updated successfully.");
    setPasswordForm({ current: "", newPass: "", confirmNew: "" });
  };

  return {
    // state
    loading,
    saving,
    settings,
    security,
    success,
    passwordForm,
    passwordError,
    passwordSuccess,

    // setters
    setSettings,
    setPasswordForm,

    // actions
    handleUpdateNotifications,
    handleChangePassword,
  };
}
