


"use client";

import { useState } from "react";
import Link from "next/link";

import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

import { useProfile } from "@/hooks/useProfile";

import ProfileHeader from "@/components/profile/ProfileHeader";
import InitialAvatar from "@/components/profile/InitialAvatar";
import ProfileForm from "@/components/profile/ProfileForm";

type ProfilePageClientProps = {
  initialProfile?: any | null;
};

export default function ProfilePageClient({ initialProfile }: ProfilePageClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
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
  } = useProfile(initialProfile);

  // Use either the live profile from hook OR the initialProfile from server
  const currentProfile = profile || initialProfile || null;

  const handleEditClick = () => {
    if (!editForm) return;
    setIsEditing((prev) => {
      const next = !prev;
      if (!prev && currentProfile) {
        // when entering edit mode, copy current profile into form
        setEditForm({ ...currentProfile });
      }
      return next;
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
            {/* Alerts */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded flex items-center gap-2">
                <Check className="w-4 h-4" /> {success}
              </div>
            )}

            {/* Profile header / empty state */}
            {currentProfile ? (
              // Show profile immediately if we have it (either initialProfile or fetched)
              <ProfileHeader
                profile={currentProfile}
                isEditing={isEditing}
                onEditClick={handleEditClick}
              />
            ) : loading ? (
              // No profile yet and still loading: keep layout calm, no message
              <div className="mb-6" />
            ) : (
              // Loading finished and no profile found -> show "complete your profile"
              <Card className="border p-8 mb-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <InitialAvatar
                    firstName={editForm?.first_name}
                    lastName={editForm?.last_name}
                    username={editForm?.username}
                    size="lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Complete your profile</h2>
                    <p className="text-muted-foreground mb-4">
                      We couldn&apos;t find a profile for your account. Create one so your feed
                      and recommendations are personalized.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-accent text-primary"
                      >
                        Create Profile
                      </Button>
                      <Link href="/dashboard">
                        <Button variant="outline">Skip (go to dashboard)</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Form */}
            {isEditing && editForm && (
              <ProfileForm
                profile={currentProfile}
                editForm={editForm}
                setEditForm={setEditForm}
                onSave={handleSave}
                onCreate={handleCreate}
                saving={saving}
                usernameAvailable={usernameAvailable}
                checkingUsername={checkingUsername}
                countries={countries}
                states={states}
                cities={cities}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
