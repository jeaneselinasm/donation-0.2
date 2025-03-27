'use server'

import { z } from 'zod'
import axios from 'axios'
import { redirect } from 'next/navigation'

// Define schema
const server = `http://localhost:2053`

const DonationFormSchema = z.object({
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string",
  }),
})

const CreateDonation = DonationFormSchema.omit({ amount: true })

type DonationFields = z.infer<typeof CreateDonation>

export async function createDonation(formData: FormData) {
  const values: Record<string, FormDataEntryValue | null> = {
    amount: formData.get('amount'),
    firstName: formData.get('firstName'),
  }

  const validateFields = CreateDonation.safeParse({
    firstName: values.firstName,
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Field, Failed to create Invoice',
    }
  }

  try {
    const { data } = await axios.post(`${server}/api/create-donation`, formData)

    if (typeof window !== 'undefined' && (window as any).snap) {
      (window as any).snap.pay(data.token, {
        onSuccess: function (result: any) {
          const message = result.currency === 'id'
            ? "Terima kasih atas donasi Anda :)"
            : "Thank you for your donation :)"

          Swal.fire({
            icon: "success",
            title: "Payment success",
            text: message,
          })
        },
        onPending: function (result: any) {
          console.log('Pending:', result)
        },
        onError: function (result: any) {
          const title = result.currency === 'id' ? "Gagal membuat pembayaran" : "Failed create Payment"
          const text = result.currency === 'id' ? "Tolong coba kembali" : "Please try again"

          Swal.fire({
            icon: "error",
            title,
            text,
          })
        },
        onClose: function () {
          const title = 'Apakah anda yakin?'
          const text = 'Ingin menutup pembayaran ini?'

          Swal.fire({
            icon: "question",
            title,
            text,
          })
        },
      })
    }
  } catch (error: any) {
    console.error('Donation creation failed:', error)
  }
}
