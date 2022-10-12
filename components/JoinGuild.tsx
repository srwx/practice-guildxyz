import classNames from "classnames"
import React, { useContext } from "react"
import { WalletContext } from "../context/WalletContext"

export const JoinGuild = () => {
  const { setTokenInput, onTokenSubmit } = useContext(WalletContext)

  const handleClick = () => {
    window.open(
      "https://discord.com/api/oauth2/authorize?client_id=1028964643995144252&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Flogin&response_type=code&scope=identify%20guilds.join",
      "_blank",
      "noopener,noreferrer"
    )
  }
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center py-10">
      {/* Join section */}
      <h2 className="text-xl font-medium">
        After conencted wallet, You can join our guild here!
      </h2>
      <div
        className={classNames(
          "bg-orange-500 px-4 py-2 rounded-md mr-5 text-white cursor-pointer mb-16"
        )}
        onClick={handleClick}
      >
        Join Guild
      </div>

      {/* access_token section */}
      <h2 className="text-xl font-medium">And type your access_token here</h2>
      <input
        type="text"
        className="bg-slate-100 h-8 w-80 pl-4"
        onChange={(e) => setTokenInput(e.target.value)}
      />
      <div
        className={classNames(
          "bg-orange-700 px-4 py-2 rounded-md mr-5 text-white cursor-pointer mb-9"
        )}
        onClick={onTokenSubmit}
      >
        Submit
      </div>
    </div>
  )
}
