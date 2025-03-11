import Link from "@/i18n/routing";
import {useTranslation} from "next-intl"

export default function HomePage(){
  const t = useTranslation("HomePage")
  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  )
}