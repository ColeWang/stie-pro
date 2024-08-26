import type { Ref, SlotsType } from 'vue'
import { defineComponent, provide, ref, watch } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { LocaleProviderExpose, LocaleType } from './typings'
import { localeProviderProps } from './typings'
import { LocaleReceiverKey } from './hooks/useLocaleReceiver'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLocaleProvider',
    props: localeProviderProps(),
    slots: Object as SlotsType<{
        default?: BaseSlot;
    }>,
    setup (props, { slots, expose }) {
        const locale: Ref<LocaleType> = ref({ ...props.locale })

        watch(() => props.locale, (value) => {
            locale.value = { ...value }
        }, { immediate: true })

        const localeProviderExpose: LocaleProviderExpose = {
            locale: locale,
            __MARK__: 'internal'
        }

        provide(LocaleReceiverKey, localeProviderExpose)
        expose(localeProviderExpose)

        return () => {
            return slots.default && slots.default()
        }
    }
})
