import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ContextContainer } from '../context/Context'
import { useStore } from 'react-redux'
import { store } from '../store'

let pathUrl, pageUrl

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onSettled: (data, err) => {
        const error = err as AxiosError

        if (
          error?.response?.status === 401 &&
          !window.location.pathname.includes('/sign-in')
        ) {
          Cookies.remove('userToken')
          window.location.href = './sign-in'
        }
      },
    },
    mutations: {
      onSettled: (data, err) => {
        const error = err as AxiosError

        // if (error?.response?.data?.title) {
        //   toast.error(error?.response?.data?.title);
        // } else {
        //   toast.error(error?.response?.data?.message);
        // }

        if (
          error?.response?.status === 401 &&
          !window.location.pathname.includes('/sign-in')
        ) {
          Cookies.remove('userToken')
          window.location.href = './sign-in'
        }
      },
    },
  },
})

//@ts-ignore
function MyApp({ Component, pageProps }) {
  pathUrl = { pageProps }
  pageUrl = pathUrl.pageProps._nextI18Next

  //---------------

  const { pathname, push } = useRouter()

  // useEffect(() => {
  //   const defaultLangue: string =
  //     pathname === '/' && localStorage.getItem('langue')
  //       ? (localStorage.getItem('langue') as string)
  //       : 'en'

  //   localStorage.setItem('langue', defaultLangue)
  //   push(defaultLangue)
  // }, [])

  //---------------------

  return (
    <ContextContainer>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer hideProgressBar position="top-center" />
          <div
            dir={
              (pageUrl && pageUrl.initialLocale === 'fa') ||
              (pageUrl && pageUrl.initialLocale === 'ar')
                ? 'rtl'
                : 'ltr'
            }
          >
            <Head>
              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <meta name="author" content="FINOTIX" />
            </Head>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </Provider>
    </ContextContainer>
  )
}

export default appWithTranslation(MyApp)
