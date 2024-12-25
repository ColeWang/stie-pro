import type { SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment } from 'vue'
import { Slider } from 'ant-design-vue'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { isArray } from 'lodash-es'
import type { FieldSliderFieldProps, FieldSliderSlots } from './typings'
import { fieldSliderProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProFieldSlider',
    props: fieldSliderProps(),
    slots: Object as SlotsType<FieldSliderSlots>,
    setup (props, { slots }) {
        return () => {
            const { mode, text, emptyText, fieldProps } = props

            if (mode === 'read') {
                if (isArray(text)) {
                    const [startText, endText] = text
                    return (
                        <Fragment>
                            {startText ?? emptyText}
                            {'~'}
                            {endText ?? emptyText}
                        </Fragment>
                    )
                }
                return text ?? emptyText
            }
            const needFieldProps: FieldSliderFieldProps = {
                style: { minWidth: 100, ...fieldProps.style },
                ...fieldProps
            }
            const fieldDom: VNodeChild = <Slider {...needFieldProps} v-slots={slots}/>
            // ----
            const slotProps: Recordable = { text, props: { mode, ...fieldProps }, slots, dom: fieldDom }
            const renderFieldDom: VNodeChild = getSlotVNode(slots, props, 'renderField', slotProps)

            return renderFieldDom || fieldDom
        }
    }
})
