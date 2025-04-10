// app/api/create-donation/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const formData = await req.formData()

  const firstName = formData.get('firstName')?.toString()
  const amount = formData.get('amount')?.toString()

  const schema = z.object({
    firstName: z.string().min(1),
    amount: z.string().min(1),
  })

  const result = schema.safeParse({ firstName, amount })
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  // Midtrans integration
  const serverKey = process.env.MIDTRANS_SERVER_KEY ?? ""
  const base64ServerKey = Buffer.from(serverKey + ":").toString("base64")

  const orderId = `DONATION-${uuidv4()}`

  const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${base64ServerKey}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: orderId,
        gross_amount: parseInt(amount || "0"),
      },
      customer_details: {
        first_name: firstName,
        // ...optional: last_name, email, phone
      },
      callbacks: {
        finish: "https://your-site.com/thank-you" // Optional
      }
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    return NextResponse.json({ error }, { status: 500 })
  }

  const data = await response.json()
  return NextResponse.json({ token: data.token }) // Return Snap token to frontend
}
