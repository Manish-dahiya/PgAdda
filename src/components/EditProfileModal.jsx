"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@/redux/userSlice'
import defaultUser from "../../public/defaultUser.png"
import { motion, AnimatePresence } from 'framer-motion'

function EditProfileModal({ isOpen, onClose, currentUser }) {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.getTheme.theme)
    const updateStatus = useSelector((state) => state.userData.updateStatus)

    const fileInputRef = useRef(null)

    const [form, setForm] = useState({
        email: '',
        contact: '',
        bio: '',
    })
    const [avatarFile, setAvatarFile] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [errors, setErrors] = useState({})

    // Pre-fill form with existing user data whenever modal opens
    useEffect(() => {
        if (isOpen && currentUser) {
            setForm({
                email:   currentUser.email   || '',
                contact: currentUser.contact || '',
                bio:     currentUser.bio     || '',
            })
            setAvatarFile(null)
            setAvatarPreview(null)
            setErrors({})
        }
    }, [isOpen, currentUser])

    // Close modal on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') onClose() }
        if (isOpen) window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    // Auto-close on successful update
    useEffect(() => {
        if (updateStatus === 'success') onClose()
    }, [updateStatus])

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    }
 
    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setAvatarFile(file)
        setAvatarPreview(URL.createObjectURL(file))
    }

    const validate = () => {
        const newErrors = {}
        if (form.email && !/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = 'Enter a valid email address'
        if (form.contact && !/^\+?[\d\s\-]{7,15}$/.test(form.contact))
            newErrors.contact = 'Enter a valid contact number'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return

        const formData = new FormData()
        if (form.email)   formData.append('email',   form.email)
        if (form.contact) formData.append('contact', form.contact)
        if (form.bio)     formData.append('bio',     form.bio)
        if (avatarFile)   formData.append('avatar',  avatarFile)

        dispatch(updateUser({ id: currentUser._id, formData }))
    }

    const isDark = theme === 'dark'

    const inputClass = `w-full px-4 py-2.5 rounded-lg text-sm outline-none border transition-all duration-200
        ${isDark
            ? 'bg-[#111] border-[#2a2a2a] text-white placeholder-gray-600 focus:border-blue-500'
            : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-blue-400'
        }`

    const labelClass = `block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`

    return (
        <AnimatePresence>
            {isOpen && (
                // Backdrop
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Modal panel */}
                    <motion.div
                        className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden
                            ${isDark ? 'bg-[#0e0e0e] border border-[#1e1e1e]' : 'bg-white border border-gray-100'}`}
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-[#1a1a1a]' : 'border-gray-100'}`}>
                            <h2 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Edit Profile
                            </h2>
                            <button
                                onClick={onClose}
                                className={`w-7 h-7 flex items-center justify-center rounded-full text-lg transition-colors
                                    ${isDark ? 'hover:bg-[#1e1e1e] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5 space-y-5">

                            {/* Avatar picker */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-offset-2
                                        ring-blue-400 ring-offset-transparent">
                                        <Image
                                            src={avatarPreview || currentUser?.avatar?.url || defaultUser}
                                            alt="avatar"
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                            unoptimized={!!avatarPreview}
                                        />
                                    </div>
                                    {/* overlay on hover */}
                                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100
                                        transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">Change</span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                                <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Click photo to change avatar
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <label className={labelClass}>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className={inputClass}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Contact */}
                            <div>
                                <label className={labelClass}>Contact number</label>
                                <input
                                    name="contact"
                                    type="tel"
                                    value={form.contact}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className={inputClass}
                                />
                                {errors.contact && (
                                    <p className="mt-1 text-xs text-red-400">{errors.contact}</p>
                                )}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className={labelClass}>Bio</label>
                                <textarea
                                    name="bio"
                                    value={form.bio}
                                    onChange={handleChange}
                                    placeholder="Tell us something about yourself..."
                                    rows={3}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t ${isDark ? 'border-[#1a1a1a]' : 'border-gray-100'}`}>
                            <button
                                onClick={onClose}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors
                                    ${isDark
                                        ? 'text-gray-400 hover:text-white hover:bg-[#1e1e1e]'
                                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={updateStatus === 'pending'}
                                className="px-5 py-2 rounded-lg text-sm font-medium bg-blue-500 hover:bg-blue-600
                                    text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {updateStatus === 'pending' ? 'Saving...' : 'Save changes'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default EditProfileModal
