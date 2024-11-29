import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@nexus-ui/i18n'
import { InputTextFormField } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { pageUrls } from '@/shared/lib'
import { useAppDispatch } from '@/shared/model'

import { LoginFormSchema, loginFormSchema } from '../model/formSchema'
import { loginThunk } from '../model/loginThunk'

export const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { t } = useTranslation()

  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmitHandler = (data: LoginFormSchema) => {
    dispatch(loginThunk(data))
      .unwrap()
      .then(() => {
        onLoginSuccess()
      })
      .catch((error) => {
        setError('username', { type: 'server', message: error.message })
      })
  }

  const onLoginSuccess = () => {
    const params = new URLSearchParams(location.search)
    const redirectTo = params.get('from') || pageUrls.root

    navigate(redirectTo)
  }

  return (
    <div>
      <h2>Login</h2>
      <Panel header="Login">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="py-4">
          <p className="bg-red-400 text-gray-400 mb-6 p-2 w-fit">
            Use admin as username and admin as password to log in
          </p>
          <InputTextFormField
            autoFocus
            control={control}
            type="text"
            name="username"
            label={t('username')}
            className={{ label: 'capitalize', container: 'mb-6' }}
            hasFloatLabel
            error={errors.username}
          />
          <InputTextFormField
            control={control}
            type="password"
            name="password"
            label={t('password')}
            className={{ label: 'capitalize', container: 'mb-6' }}
            hasFloatLabel
            error={errors.password}
          />
          <Button label="Login" />
        </form>
      </Panel>
    </div>
  )
}
