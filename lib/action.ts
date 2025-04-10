'use server'
import axios from 'axios'
import {z} from 'zod'

const DonationFormSchema = z.object({
  firstName: z.string({
    required_error: "First name is required"
  }).min(1, { message: "First name cannot be empty" })
})

export async function getDonationSchema(locale: "en" | "id") {
  return z.object({
    firstName: z.string({
      required_error: locale === "id"
        ? "Nama depan wajib diisi"
        : "First name is required"
    }).min(1, {
      message: locale === "id"
        ? "Nama depan tidak boleh kosong"
        : "First name cannot be empty"
    }),
    // Add more fields here
  });
}

interface Payload {
  firstName : string
}

const backend = `http://localhost:2053`
const CreateDonation = DonationFormSchema


export async function createDonation(formData: FormData, locale: "en" | "id") {
  const payload: Payload = {
    firstName: formData.get('firstName')?.toString() ?? ''
  };

  const schema = await getDonationSchema(locale); // ✅ use await
  const validation = schema.safeParse(payload);
  

  if (!validation.success) {
    const zodErrors: Record<string, string[]> = {};
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      if (!zodErrors[field]) zodErrors[field] = [];
      zodErrors[field].push(err.message);
    });

    return { errors: zodErrors };
  }
  const { data } = await axios({
    method: 'post',
    url: `${backend}/payment`,
    data: validation.data,
  });

  return {
    token: data.token,
  };
}