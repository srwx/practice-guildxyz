import React, { useContext } from "react"
import { WalletContext } from "../context/WalletContext"

export const LoginSuccess = () => {
  const { result } = useContext(WalletContext)
  return (
    <>
      {result.success ? (
        <div className="text-center">
          <h2 className="text-green-500 font-semibold text-lg">
            Login success! You can join discord by click link below
          </h2>
          <a
            href="https://discord.gg/Cuhwpg3Seg"
            className="text-blue-500 underline"
            target="__blank"
          >
            https://discord.gg/Cuhwpg3Seg
          </a>
        </div>
      ) : (
        <div className="text-red-500 text-center font-semibold text-lg">
          Error: {result.text}
        </div>
      )}
    </>
  )
}
