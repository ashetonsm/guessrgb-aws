import { Session } from "next-auth"
import { getSession, useSession } from "next-auth/react"

export async function getHistory() {
  const result = await fetch('http://localhost:3000/api/games', { method: 'GET' })
  // console.log(session)
  // console.log(JSON.stringify(result))
  return JSON.stringify({ hello: "goodbye" })
}