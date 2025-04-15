import {useTranslations} from "next-intl"
import "@/lib/definition"; // 👈 this makes sure the global types are registered

export default function HomePage(){
  const t = useTranslations("HomePage")
  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  )
}