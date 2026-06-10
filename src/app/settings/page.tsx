'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { User, Bell, Shield, Key } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200 font-sans relative overflow-x-hidden">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 z-10 relative">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white">Settings</h1>
          <p className="text-sm text-zinc-400">Manage your account settings and preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'profile' ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'}`}
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'notifications' ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'}`}
              >
                <Bell className="w-5 h-5" />
                Notifications
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'security' ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'}`}
              >
                <Shield className="w-5 h-5" />
                Security
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 max-w-3xl">
            {activeTab === 'profile' && (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl animate-fade-in space-y-6">
                <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-4">Personal Information</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">First Name</label>
                    <input type="text" defaultValue="Chandan" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-zinc-400">Email Address</label>
                    <input type="email" defaultValue="chandan@example.com" disabled className="w-full bg-zinc-900/30 border border-zinc-800/50 rounded-lg px-4 py-2.5 text-zinc-500 cursor-not-allowed" />
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-zinc-800">
                  <Button>Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl animate-fade-in space-y-6">
                <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-4">Security Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-zinc-200">Change Password</h3>
                      <p className="text-sm text-zinc-500">Update your password to keep your account secure.</p>
                    </div>
                    <Button variant="outline" size="sm" leftIcon={<Key className="w-4 h-4" />}>Update</Button>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
                    <div>
                      <h3 className="font-medium text-zinc-200">Two-Factor Authentication (2FA)</h3>
                      <p className="text-sm text-zinc-500">Add an extra layer of security to your account.</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl animate-fade-in space-y-6">
                <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <span className="block font-medium text-zinc-200 group-hover:text-white transition-colors">Tax Loss Alerts</span>
                      <span className="text-sm text-zinc-500">Get notified when a position drops by 10% or more.</span>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600 transition-colors">
                      <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform"></span>
                    </div>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group pt-4 border-t border-zinc-800/50">
                    <div>
                      <span className="block font-medium text-zinc-200 group-hover:text-white transition-colors">Weekly Summary</span>
                      <span className="text-sm text-zinc-500">Receive a weekly email digest of your portfolio performance.</span>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-zinc-700 transition-colors">
                      <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform"></span>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
