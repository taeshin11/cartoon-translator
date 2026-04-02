"use client"

import { useEffect, useState } from "react"

export function VisitorCounter() {
  const [today, setToday] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        setToday(data.today)
        setTotal(data.total)
      })
      .catch(() => {
        // Silent fail
      })
  }, [])

  return (
    <p className="text-xs text-muted-foreground">
      Today:{" "}
      <span className="font-mono">{today ?? "--"}</span>
      {" | "}
      Total:{" "}
      <span className="font-mono">{total ?? "--"}</span>
    </p>
  )
}
