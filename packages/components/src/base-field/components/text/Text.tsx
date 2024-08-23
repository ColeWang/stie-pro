import { defineComponent, Fragment } from 'vue'
import { Input } from 'ant-design-vue'
import { getPropsSlot, getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../../../locale-provider'
import { fieldTextProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldText',
    props: fieldTextProps(),
    setup (props, { slots }) {
        const { t } = useLocaleReceiver(['global'])

        return () => {
            const { mode, text, emptyText, fieldProps } = props
            const placeholder = fieldProps.placeholder || t('inputPlaceholder')

            if (mode === 'read') {
                const prefixDom = getPropsSlot(slots, fieldProps, 'prefix')
                const suffixDom = getPropsSlot(slots, fieldProps, 'suffix')
                return (
                    <Fragment>
                        {prefixDom}
                        {text ?? emptyText}
                        {suffixDom}
                    </Fragment>
                )
            }
            const needFieldProps = {
                allowClear: true,
                ...fieldProps,
                placeholder: placeholder
            }
            const fieldDom = <Input {...needFieldProps} v-slots={slots}/>
            // ----
            const slotScope = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom = getSlotVNode(slots, props, 'renderField', slotScope)

            return renderFieldDom || fieldDom
        }
    }
})
