import axios, { AxiosError } from 'axios'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ContextContainer } from '../context/Context'
import { store } from '../store'
import '../styles/globals.css'

let pathUrl, pageUrl

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onSettled: (data, err) => {
        const error = err as AxiosError

        // if (
        //   error?.response?.status === 401 &&
        //   !window.location.pathname.includes('/sign-in')
        // ) {
        //   Cookies.remove('userTokenFinotix')
        //   window.location.href = './sign-in'
        // }
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

        // if (
        //   error?.response?.status === 401 &&
        //   !window.location.pathname.includes('/sign-in')
        // ) {
        //   Cookies.remove('userTokenFinotix')
        //   window.location.href = './sign-in'
        // }
      },
    },
  },
})

export const axiosInstance = axios.create({
  baseURL: 'http://172.31.30.228:8006/api/',
  headers: {
    InstanceId: 'C50EEE38-DE25-40CA-A05F-8186ACDEDD9D',
  },
})

//@ts-ignore
function MyApp({ Component, pageProps }) {
  pathUrl = { pageProps }
  pageUrl = pathUrl.pageProps._nextI18Next

  useEffect(() => {
    localStorage.setItem('lang', 'en')
  }, [])

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
          <ToastContainer hideProgressBar position="bottom-right" />
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
