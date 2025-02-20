import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/ItsJiDy/Overdrive-H/refs/heads/main/loader.lua")
    const text = await response.text()
    return new NextResponse(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  } catch (error) {
    return new NextResponse("Error fetching script", { status: 500 })
  }

  return new NextResponse("Not Found", { status: 404 })
}

