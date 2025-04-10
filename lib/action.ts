'use server'
import axios from 'axios'
import {z} from 'zod'

// const DonationFormSchema = z.object({
//   firstName: z.string({
//     required_error: "First name is required"
//   }).min(1, { message: "First name cannot be empty" }),
//   lastName: z.string({
//     required_error: "Last name is required"
//   }).min(1, { message: "Last name cannot be empty" }),
//   email: z.string({
//     required_error: "Email is required"
//   }).min(1, { message: "Email cannot be empty" })
// })

export async function getDonationSchema(locale: "en" | "id") {
  return z.object({
    firstName: z.string({
      required_error: locale === "id"
        ? "Nama depan wajib diisi"
        : "First name is required"
    }).min(3, {
      message: locale === "id"
        ? "Nama depan tidak boleh kosong"
        : "First name cannot be empty"
    }),
    lastName : z.string({
      required_error : locale === 'id' ?
      "Nama belakang wajib diisi" : "Last name is required"
    }).min(1, {
      message : locale === 'id' ? "Nama belakang tidak boleh kosong" : 'Last name cannot be empty'
    }),
    email : z.string()
    .min(5, { message: locale === 'id' ? 'Email wajib diisi' : "Email is required" })
    .email(locale === 'id' ? 'Format email tidak valid' : 'This is not a valid email'),
    phone : z.string()
    .min(5, {message : locale === 'id' ? 'Nomor telepon wajib diisi' : 'Phone number is required'})
    // Add more fields here
  });
}

interface Payload {
  firstName : string,
  lastName : string,
  email : string,
  phone : string,
}

const backend = `http://localhost:2053`
// const CreateDonation = DonationFormSchema


export async function createDonation(formData: FormData, locale: "en" | "id") {
  const payload: Payload = {
    firstName: formData.get('firstName')?.toString() ,
    lastName: formData.get('lastName')?.toString() ,
    email : formData.get('email')?.toString(),
    phone : formData.get('phone')?.toString()
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