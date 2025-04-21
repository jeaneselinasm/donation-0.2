import {useTranslations} from "next-intl"
import "@/lib/definition"; 

export default function HomePage(){
  const t = useTranslations("HomePage")
  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  )
}