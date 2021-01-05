// Fetch html file containing global header/nav & footer
async function globalHTMLFetch() {
  let response = await fetch('html/_global.html')

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  } else {
    // HTML file was loaded successfully
    let globalText = await response.text()
    let html = getGlobalContent(globalText)
  }
}

globalHTMLFetch()
  .catch(e => {
    console.log(`Failed to fetch page: ${e.message}`)
  })

const getGlobalContent = (html) => {

  // Initialize the DOM parser
  var parser = new DOMParser();

  // Assign the html content to an element so we can extract the header/nav & footer
  var include = parser.parseFromString(html, "text/html")

  // Assign global content to elements
  const mainNav = include.querySelector('nav')
  const footer = include.querySelector('footer')

  // Prepend/Append global content to page body
  document.body.prepend(mainNav)
  document.body.append(footer)

}