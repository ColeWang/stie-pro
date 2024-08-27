import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldRangePickerFieldProps } from '../../base-field'
import { fieldRangePickerSlots } from '../../base-field'

const DATE_WEEK_RANGE_VALUE_TYPE: BaseFieldValueType = 'dateWeekRange'

export const dateWeekRangeProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldRangePickerFieldProps>,
        default: () => ({})
    }
})

export type DateWeekRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateWeekRangeProps>>>;
export type DateWeekRangeInstance = ComponentPublicInstance<DateWeekRangeProps>;

const DateWeekRange = defineComponent({
    inheritAttrs: false,
    name: 'ProDateWeekRange',
    props: dateWeekRangeProps(),
    slots: Object.assign(fieldSlots, fieldRangePickerSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_WEEK_RANGE_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateWeekRange.install = function (app: App): App {
    app.component(DateWeekRange.name as string, DateWeekRange)
    return app
}

export default DateWeekRange
