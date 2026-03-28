import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import bgImage from "../assets/bgImage.svg"
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign Up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }

    login(currState === "Sign Up" ? "signup" : "login", { fullName, email, password, bio })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>

      <div className='w-full max-w-5xl grid md:grid-cols-2 '>

        {/* left */}
        <div className='hidden md:flex items-center justify-center p-10 backdrop-blur-xl'>
          <img src={assets.logo_big} alt="" className='max-w-62.5' />
        </div>

        {/* right */}
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col gap-5 p-8 sm:p-10 text-white bg-white/5 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden'
        >

          <h2 className='text-2xl font-semibold flex items-center justify-between'>
            {currState}

            {isDataSubmitted && (
              <img
                onClick={() => setIsDataSubmitted(false)}
                src={assets.arrow_icon}
                alt=""
                className='w-6 cursor-pointer opacity-80 hover:opacity-100'
              />
            )}
          </h2>

          {currState === "Sign Up" && !isDataSubmitted && (
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder='Full Name'
              required
              className='w-full p-3 rounded-lg bg-[#1f1b2e] border border-gray-600 outline-none text-sm'
            />
          )}

          {!isDataSubmitted && (
            <>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder='Email Address'
                required
                className='w-full p-3 rounded-lg bg-[#1f1b2e] border border-gray-600 outline-none text-sm'
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Password'
                required
                className='w-full p-3 rounded-lg bg-[#1f1b2e] border border-gray-600 outline-none text-sm'
              />
            </>
          )}

          {currState === "Sign Up" && isDataSubmitted && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              placeholder='Provide a short bio...'
              required
              className='w-full p-3 rounded-lg bg-[#1f1b2e] border border-gray-600 outline-none text-sm'
            ></textarea>
          )}

          <button
            type='submit'
            className='w-full bg-violet-600 hover:bg-violet-700 transition py-3 rounded-lg font-medium'
          >
            {currState === "Sign Up" ? "Create Account" : "Login Now"}
          </button>

          <div className='flex items-start gap-2 text-sm text-gray-300'>
            <input type="checkbox" className='mt-1' />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          <div className='text-sm text-gray-300'>
            {currState === "Sign Up" ? (
              <p>
                Already have an Account?{" "}
                <span
                  onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}
                  className='text-violet-400 cursor-pointer hover:underline'
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create an Account{" "}
                <span
                  onClick={() => setCurrState("Sign Up")}
                  className='text-violet-400 cursor-pointer hover:underline'
                >
                  click here
                </span>
              </p>
            )}
          </div>

        </form>

      </div>

    </div>
  )
}

export default LoginPage