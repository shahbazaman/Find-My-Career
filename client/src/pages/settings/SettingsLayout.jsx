import React from 'react'
import AccountSettings from "./AccountSettings"
import JobPreferences from './JobPreferences'
import HelpSettings from './HelpSettings'
import ApplicationSettings from "./ApplicationSettings"

const SettingsLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <AccountSettings/>
        <ApplicationSettings/>
        <JobPreferences/>
        <HelpSettings/>
      </div>
    </div>
  )
}

export default SettingsLayout