import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import bgImage from "../assets/bgImage.svg"
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext)

  const [selectedImage, setSelectedImage] = useState(null)
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio })
      navigate("/")
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(selectedImage)
    reader.onload = async () => {
      const base64Image = reader.result
      await updateProfile({ profilePic: base64Image, fullName: name, bio })
      navigate("/")
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white/5 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden">

        {/* left / form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-8 sm:p-10 text-white"
        >
          <h3 className="text-2xl font-semibold">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-4 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png .jpg .jpeg"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-16 h-16 object-cover ${selectedImage ? "rounded-full" : ""
                }`}
            />
            <span className="text-sm text-gray-300">
              Upload profile image
            </span>
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-[#1f1b2e] border border-gray-600 outline-none text-sm"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            rows={4}
            className="w-full p-3 rounded-lg bg-[#1f1b2e] border border-gray-600 outline-none text-sm resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 transition py-3 rounded-lg font-medium"
          >
            Save
          </button>

        </form>

        {/* right / logo */}
        <div
          className={`hidden md:flex items-center justify-center p-10 bg-white/5 ${selectedImage && "rounded-full"}`}>
          <img
            src={authUser.profilePic || assets.logo_icon}
            alt=""
            className="w-28 opacity-90"
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage