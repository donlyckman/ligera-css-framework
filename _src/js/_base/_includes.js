
  fetch('html/_main.html')
  .then(response => response.text())
  .then(html => getContent(html))
  .catch(function(err) {
    console.log('Failed to fetch page: ', err);
  });


 const getContent = (html) => {

      // Initialize the DOM parser
  var parser = new DOMParser();

  // Parse the text
  var include = parser.parseFromString(html, "text/html");

  // You can now even select part of that html as you would in the regular DOM
  // Example:
  // var docArticle = doc.querySelector('article').innerHTML;

  const mainNav = include.querySelector('nav')
  const footer = include.querySelector('footer')

  document.body.prepend(mainNav)
  document.body.append(footer)

  }
