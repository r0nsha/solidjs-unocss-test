import { I18nContext, createChainedI18nContext } from "@solid-primitives/i18n"
import translations from "./translations"

const [_I18nProvider, useI18nContext] = createChainedI18nContext({
	dictionaries: translations,
	locale: "en",
})

export const I18nProvider = _I18nProvider

export const useI18n = () => {
	const context = useI18nContext()
	if (!context) throw new Error("useI18n must be used within an I18nProvider")
	return context
}
