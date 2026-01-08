



"use client"

import { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useSettings } from "@/hooks/useSettings"
import { NotificationsTab } from "@/components/settings/NotificationsTab"
import { SecurityTab } from "@/components/settings/SecurityTab"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const {
    saving,
    settings,
    passwordForm,
    passwordError,
    passwordSuccess,
    setSettings,
    setPasswordForm,
    handleUpdateNotifications,
    handleChangePassword,
  } = useSettings()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-10">
            {/* PAGE TITLE */}
            <h1 className="text-3xl font-semibold text-text mb-10">
              Settings
            </h1>

            <Tabs defaultValue="notifications">
              {/* TABS HEADER */}
              <TabsList className="border-b border-border mb-8">
                <TabsTrigger value="notifications">
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  Security
                </TabsTrigger>
              </TabsList>

              {/* NOTIFICATIONS TAB */}
              <TabsContent value="notifications">
                <NotificationsTab
                  settings={settings}
                  onSettingsChange={setSettings}
                  saving={saving}
                  onSave={handleUpdateNotifications}
                />
              </TabsContent>

              {/* SECURITY TAB */}
              <TabsContent value="security">
                <SecurityTab
                  passwordForm={passwordForm}
                  onPasswordFormChange={setPasswordForm}
                  passwordError={passwordError}
                  passwordSuccess={passwordSuccess}
                  onChangePassword={handleChangePassword}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
