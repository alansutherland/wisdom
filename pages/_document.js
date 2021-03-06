import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class Soltilo extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <title>Wisdom</title>
          {this.props.styleTags}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* UA-51761645-17 */}
           <script
             async
             src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
           />
           <script
             dangerouslySetInnerHTML={{
               __html: `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
 
             gtag('config', '${GA_TRACKING_ID}');
           `}}
           />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}