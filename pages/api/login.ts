import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query
  if (code) {
    try {
      console.log("code:", code)
      const data = {
        client_id: "1029720283076112394",
        client_secret: "wwZq8AUkID0dgCm2i5693wmQcE1CjWLT",
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://practice-guildxyz.vercel.app/",
      }

      const response = await axios.post(
        "https://discord.com/api/oauth2/token",
        data,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )

      const json = await response.data
      console.log("response", json)

      res.status(200).json({ access_token: json.access_token })
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: err })
    }
  }
}
