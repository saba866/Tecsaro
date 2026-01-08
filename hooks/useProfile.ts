





"use client";

import { useEffect, useMemo, useState } from "react";
// @ts-ignore
import debounce from "lodash.debounce";
import { Country, State, City } from "country-state-city";
import { supabase } from "@/lib/supabaseClient";
import { getInitials } from "@/lib/getInitials";

export function useProfile(initialProfile: any) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // profile: null  -> user row doesn't exist yet
  // profile: object -> user row exists
  const [profile, setProfile] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // username availability
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // location lists
  const countries = useMemo(() => Country.getAllCountries(), []);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  // 🔹 Load profile on mount
  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error(userError);
        }

        if (!user) {
          if (!cancelled) {
            setError("Not signed in. Please log in.");
          }
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (cancelled) return;

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error(fetchError);
        }

        if (data) {
          // ✅ Existing profile
          setProfile(data);
          setEditForm({
            ...data,
          });
          setIsEditing(false);
        } else {
          // ✅ No profile row yet – prepare default form, open editing
          setProfile(null);
          setEditForm({
            id: user.id,
            first_name: user.user_metadata?.first_name || "",
            last_name: user.user_metadata?.last_name || "",
            username: "",
            email: user.email || "",
            phone: "",
            role: "",
            role_other: "",
            country: "",
            country_other: "",
            state: "",
            city: "",
            city_other: "",
          });
          setIsEditing(true);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("Failed to load profile.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false); // ✅ only after profile/editForm are set
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // 🔹 When country changes, load states & reset state/city correctly
  useEffect(() => {
    if (!editForm) return;

    const countryCode = editForm.country;

    if (!countryCode || countryCode === "Other") {
      setStates([]);
      setCities([]);
      setEditForm((f: any) =>
        f
          ? {
              ...f,
              state: "",
              city: "",
            }
          : f
      );
      return;
    }

    const s = State.getStatesOfCountry(countryCode) || [];
    setStates(s);
    setCities([]);

    setEditForm((f: any) =>
      f
        ? {
            ...f,
            state: "",
            city: "",
          }
        : f
    );
  }, [editForm?.country]);

  // 🔹 When state changes, load cities & reset city correctly
  useEffect(() => {
    if (!editForm) return;

    const stateCode = editForm.state;

    if (!stateCode || stateCode === "Other") {
      setCities([]);
      setEditForm((f: any) =>
        f
          ? {
              ...f,
              city: "",
            }
          : f
      );
      return;
    }

    const c = City.getCitiesOfState(editForm.country, stateCode) || [];
    setCities(c);

    setEditForm((f: any) =>
      f
        ? {
            ...f,
            city: "",
          }
        : f
    );
  }, [editForm?.state]);

  // 🔹 Debounced username check
  const checkUsername = useMemo(
    () =>
      debounce(async (username: string, myId?: string | null) => {
        if (!username || username.trim().length === 0) {
          setUsernameAvailable(null);
          setCheckingUsername(false);
          return;
        }

        setCheckingUsername(true);

        try {
          const { count, error } = await supabase
            .from("users")
            .select("id", { count: "exact", head: false })
            .ilike("username", username.trim());

          if (error) {
            console.warn("username check error", error);
            setUsernameAvailable(null);
          } else {
            if (!count || count === 0) {
              setUsernameAvailable(true);
            } else if (count === 1) {
              const { data } = await supabase
                .from("users")
                .select("id")
                .ilike("username", username.trim())
                .single();
              if (data && data.id === myId) setUsernameAvailable(true);
              else setUsernameAvailable(false);
            } else {
              setUsernameAvailable(false);
            }
          }
        } catch (e) {
          console.error(e);
          setUsernameAvailable(null);
        } finally {
          setCheckingUsername(false);
        }
      }, 600),
    []
  );

  // 🔹 Trigger username check when username changes
  useEffect(() => {
    if (!editForm) return;
    checkUsername(editForm.username ?? "", editForm.id ?? null);
  }, [editForm?.username, checkUsername, editForm?.id]);

  // 🔹 Validation
  const validate = (form: any, isCreate = false) => {
    if (!form) return "Invalid form.";

    if (!form.first_name?.trim()) return "Please enter first name.";
    if (!form.last_name?.trim()) return "Please enter last name.";

    if (!form.username?.trim()) return "Please choose a username.";
    if (usernameAvailable === false) return "That username is already taken.";

    if (!form.role?.trim() && !form.role_other?.trim()) {
      return "Please choose your role or type it.";
    }

    if (isCreate && !form.email) return "Missing email.";

    if (!form.phone?.trim()) return "Please enter your phone number.";

    if (!form.country?.trim()) return "Please select your country.";
    if (form.country === "Other" && !form.country_other?.trim()) {
      return "Please type your country.";
    }

    if (!form.state?.trim()) return "Please select your state / region.";

    if (!form.city?.trim() && !form.city_other?.trim()) {
      return "Please select or type your city.";
    }

    return "";
  };

  // 🔹 Update existing profile
  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    if (!editForm) return;

    const errMsg = validate(editForm, false);
    if (errMsg) {
      setError(errMsg);
      return;
    }

    setSaving(true);
    try {
      const initials = getInitials(
        editForm.first_name,
        editForm.last_name,
        editForm.username
      );

      const payload = {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        username: editForm.username,
        phone: editForm.phone,
        avatar: initials,
        role:
          editForm.role === "Other"
            ? editForm.role_other || "Other"
            : editForm.role,
        city:
          editForm.city === "Other" ? editForm.city_other || "" : editForm.city,
        state: editForm.state === "Other" ? "" : editForm.state,
        country:
          editForm.country === "Other"
            ? editForm.country_other || ""
            : editForm.country,
      };

      const { error: updateError } = await supabase
        .from("users")
        .update(payload)
        .eq("id", editForm.id);

      if (updateError) {
        if (
          updateError.code === "23505" ||
          (updateError.message && updateError.message.includes("unique"))
        ) {
          setError("That username is already taken. Choose another.");
        } else {
          setError(updateError.message || "Failed to update profile.");
        }
      } else {
        // ✅ update local state immediately so UI reflects without waiting
        const nextProfile = { ...editForm, ...payload };
        setProfile(nextProfile);
        setEditForm(nextProfile);
        setIsEditing(false);
        setSuccess("Profile updated successfully.");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Create new profile row
  const handleCreate = async () => {
    setError(null);
    setSuccess(null);
    if (!editForm) return;

    const errMsg = validate(editForm, true);
    if (errMsg) {
      setError(errMsg);
      return;
    }

    setSaving(true);
    try {
      const initials = getInitials(
        editForm.first_name,
        editForm.last_name,
        editForm.username
      );

      const payload = {
        id: editForm.id,
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        username: editForm.username,
        email: editForm.email,
        phone: editForm.phone,
        avatar: initials,
        role:
          editForm.role === "Other"
            ? editForm.role_other || "Other"
            : editForm.role,
        city:
          editForm.city === "Other" ? editForm.city_other || "" : editForm.city,
        state: editForm.state === "Other" ? "" : editForm.state,
        country:
          editForm.country === "Other"
            ? editForm.country_other || ""
            : editForm.country,
      };

      const { error: insertError } = await supabase
        .from("users")
        .insert([payload]);

      if (insertError) {
        if (
          insertError.code === "23505" ||
          (insertError.message && insertError.message.includes("unique"))
        ) {
          setError("That username is already taken. Choose another.");
        } else {
          console.error("insert error:", insertError);
          setError(insertError.message || "Failed to create profile.");
        }
      } else {
        // ✅ update local state immediately
        setProfile(payload);
        setEditForm(payload);
        setIsEditing(false);
        setSuccess("Profile created — you're all set!");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to create profile.");
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    error,
    success,
    profile,
    editForm,
    setEditForm,
    isEditing,
    setIsEditing,
    usernameAvailable,
    checkingUsername,
    countries,
    states,
    cities,
    handleSave,
    handleCreate,
  };
}
