import React from 'react'
import AccountSettings from "./AccountSettings"
import HelpSettings from './HelpSettings'

const SettingsCompany = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <AccountSettings/>
        <HelpSettings/>
      </div>
    </div>
  )
}

export default SettingsCompany