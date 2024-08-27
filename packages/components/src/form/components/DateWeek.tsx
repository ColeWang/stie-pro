import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { formItemProps } from 'ant-design-vue/es/form'
import { pick } from 'lodash-es'
import type { FieldProps } from './Field'
import Field, { fieldProps, fieldSlots } from './Field'
import type { BaseFieldFormItemProps, BaseFieldValueType, FieldDatePickerFieldProps } from '../../base-field'
import { fieldDatePickerSlots } from '../../base-field'

const DATE_WEEK_VALUE_TYPE: BaseFieldValueType = 'dateWeek'

export const dateWeekProps = () => ({
    ...fieldProps(),
    ...formItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateWeekProps = Partial<ExtractPropTypes<ReturnType<typeof dateWeekProps>>>;
export type DateWeekInstance = ComponentPublicInstance<DateWeekProps>;

const DateWeek = defineComponent({
    inheritAttrs: false,
    name: 'ProDateWeek',
    props: dateWeekProps(),
    slots: Object.assign(fieldSlots, fieldDatePickerSlots),
    setup (props, { slots }) {
        return () => {
            const { fieldProps: propsFieldProps, formItemProps: propsFormItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...(pick(props, Object.keys(Form.Item.props)) as BaseFieldFormItemProps),
                ...propsFormItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_WEEK_VALUE_TYPE,
                fieldProps: propsFieldProps,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

DateWeek.install = function (app: App): App {
    app.component(DateWeek.name as string, DateWeek)
    return app
}

export default DateWeek
