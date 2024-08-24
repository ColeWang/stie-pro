import type { App } from 'vue'
import Password from './Password'
import { fieldPasswordProps } from './typings'

Password.install = (app: App) => {
    app.component(Password.name as string, Password)
}

export { Password as FieldPassword, fieldPasswordProps }

export type { FieldPasswordProps, FieldPasswordInstance } from './typings'
