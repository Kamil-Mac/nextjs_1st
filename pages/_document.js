//This Head is different, not the same as in _app
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
            {/* we can use it for exaplme with portals */}
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
// Default structure in document
// class MyDocument extends Document {
//     render() {
//       return (
//         <Html>
//           <Head />
//           <body>
//             <Main />
//             <NextScript />
//           </body>
//         </Html>
//       );
//     }
//   }
