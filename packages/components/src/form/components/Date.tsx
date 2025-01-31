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
    FieldDatePickerSlots
} from '../../base-field'

const DATE_VALUE_TYPE: BaseFieldValueType = 'date'

export const dateProps = () => ({
    ...fieldProps(),
    ...antFormItemProps(),
    fieldProps: {
        type: Object as PropType<FieldDatePickerFieldProps>,
        default: () => ({})
    }
})

export type DateSlots = FieldSlots & FieldDatePickerSlots;
export type DateProps = Partial<ExtractPropTypes<ReturnType<typeof dateProps>>>;
export type DateInstance = ComponentPublicInstance<DateProps>;

const Date = defineComponent({
    inheritAttrs: false,
    name: 'ProDate',
    props: dateProps(),
    slots: Object as SlotsType<DateSlots>,
    setup (props, { slots }) {
        return () => {
            const { formItemProps } = props
            const needFormItemProps: BaseFieldFormItemProps = {
                ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
                ...formItemProps,
            }
            const needFieldProps: FieldProps = {
                ...props,
                valueType: DATE_VALUE_TYPE,
                formItemProps: needFormItemProps
            }
            return <Field {...needFieldProps} v-slots={slots}/>
        }
    }
})

Date.install = function (app: App): App {
    app.component(Date.name as string, Date)
    return app
}

export default Date as typeof Date & Plugin
