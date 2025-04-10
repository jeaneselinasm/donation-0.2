'use server'
import axios from 'axios'
import {z} from 'zod'

const DonationFormSchema = z.object({
  firstName: z.string({
    required_error: "First name is required"
  }).min(1, { message: "First name cannot be empty" })
})

interface Payload {
  firstName : string
}

const backend = `http://localhost:2053`
const CreateDonation = DonationFormSchema


export async function createDonation(formData: FormData) {
  const payload: Payload = {
    firstName: formData.get('firstName')?.toString() ?? ''
  };

  const validation = DonationFormSchema.safeParse(payload);

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