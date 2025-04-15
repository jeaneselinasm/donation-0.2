"use server";
import axios from "axios";
import { z } from "zod";

export async function getDonationSchema(locale: "en" | "id") {
  return z.object({
    amount: z
      .number({
        required_error:
          locale === "id"
            ? "Jumlah donasi harus diisi"
            : "Amount of donation is required",
      })
      .min(locale === "id" ? 10000 : 1, {
        message:
          locale === "id"
            ? "Jumlah donasi minimum adalah Rp.10.000"
            : "The minimum donation amount is 1 USD",
      }),
    firstName: z
      .string({
        required_error:
          locale === "id" ? "Nama depan wajib diisi" : "First name is required",
      })
      .min(2, {
        message:
          locale === "id"
            ? "Nama depan tidak boleh kosong"
            : "First name cannot be empty",
      }),
    lastName: z
      .string({
        required_error:
          locale === "id"
            ? "Nama belakang wajib diisi"
            : "Last name is required",
      })
      .min(2, {
        message:
          locale === "id"
            ? "Nama belakang tidak boleh kosong"
            : "Last name cannot be empty",
      }),
    email: z
      .string()
      .min(5, {
        message: locale === "id" ? "Email wajib diisi" : "Email is required",
      })
      .email(
        locale === "id"
          ? "Format email tidak valid"
          : "This is not a valid email"
      ),
    address: z.string().min(5, {
      message: locale === "id" ? "Alamat wajib diisi" : "Address is required",
    }),
    phone: z.string(),
    country: z
      .string()
      .min(3, {
        message: locale === "id" ? "Negara wajib diisi" : "Country is required",
      })
      .nullable()
      .refine((val) => val !== null, {
        message: locale === "id" ? "Negara wajib diisi" : "Country is required",
      }),
    city: z.string().min(5, {
      message: locale === "id" ? "Kota wajib diisi" : "City is required",
    }),
    postalCode: z
      .string()
      .min(5, {
        message:
          locale === "id" ? "Kode Pos wajib diisi" : "Postal Code is required",
      })
      .max(10, {
        message:
          locale === "id"
            ? "Kode Pos tidak boleh lebih dari 10 karakter"
            : "Postal Code should not exceed 10 characters",
      }),
    currency: z.string(),
    // Add more fields here
  });
}

interface Payload {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
  currency: string;
}

const backend = `http://localhost:2053`;
// const CreateDonation = DonationFormSchema

export async function createDonation(formData: FormData, locale: "en" | "id") {
  const payload: Payload = {
    amount: Number(formData.get("amount")),
    firstName: formData.get("firstName")?.toString(),
    lastName: formData.get("lastName")?.toString(),
    email: formData.get("email")?.toString(),
    phone: formData.get("phone")?.toString(),
    address: formData.get("address")?.toString(),
    country: formData.get("country")?.toString(),
    city: formData.get("city")?.toString(),
    postalCode: formData.get("postalCode").toString(),
    currency: locale,
  };

  const schema = await getDonationSchema(locale); // ✅ use await
  const validation = schema.safeParse(payload);

  console.log(payload, "payload");
  console.log("payload>>>", payload);
  if (!validation.success) {
    const zodErrors: Record<string, string[]> = {};
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      if (!zodErrors[field]) zodErrors[field] = [];
      zodErrors[field].push(err.message);
    });

    return { errors: zodErrors };
  }
  
  try {
    const { data } = await axios({
      method: "post",
      url: `${backend}/payment`,
      data: validation.data,
    });
    console.log("token : ", data);
    return {
      token: data.token,
    };
  }catch (error: unknown) {
    let message = locale === "id"
      ? "Terjadi kesalahan saat memproses donasi Anda."
      : "An error occurred while processing your donation.";
  
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNREFUSED") {
        message =
          locale === "id"
            ? "Koneksi ke server gagal. Silakan coba lagi nanti."
            : "Connection to the server failed. Please try again later.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
    }
  
    return {
      serverError: message,
    };
  }
}
