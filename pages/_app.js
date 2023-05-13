import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { UberProvider } from '../context/duberContext'

function MyApp({ Component, pageProps }) {
  return (
    <UberProvider>
       <Component {...pageProps} />
    </UberProvider>  
  )   
}

export default MyApp

//code walkthru 1 done
