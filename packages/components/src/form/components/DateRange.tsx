import type { App, ComponentPublicInstance, ExtractPropTypes, Plugin, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps, FieldSlots } from './Field'
import Field, { fieldProps } from './Field'
import type {
    BaseFieldFormItemProps,
    BaseFieldValueType,
    FieldDatePickerFieldProps,
    FieldRangePickerSlots
} from '../../base-field'

const DATE_RANGE_VALUE_TYPE: BaseFieldValueType = 'dateRange'

export const dateRangeProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateRangeSlots = FieldSlots & FieldRangePickerSlots;
export type DateRangeProps = Partial<ExtractPropTypes<ReturnType<typeof dateRangeProps>>>;
export type DateRangeInstance = ComponentPublicInstance<DateRangeProps>;

const DateRange = defineComponent({
    inheritAttrs: false,
    name: 'ProDateRange',
    props: dateRangeProps(),
    slots: Object as SlotsType<DateRangeSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_RANGE_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateRange.install = function (app: App): App {
    app.component(DateRange.name as string, DateRange)
    return app
}

export default DateRange as typeof DateRange & Plugin
