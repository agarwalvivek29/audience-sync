export const campaigns = [
  {
    id: '1',
    type: 'text',
    tagline: 'Summer Sale!',
    content: 'Don\'t miss our biggest sale of the year!'
  },
  {
    id: '2',
    type: 'text',
    tagline: 'New Product Launch',
    content: 'Introducing our latest innovation...'
  },
  {
    id: '3',
    type: 'html',
    templateName: 'newsletter',
    variables: {
      title: 'Monthly Newsletter',
      date: 'June 2023'
    },
    content: `
      <html>
        <body>
          <h1>{{title}}</h1>
          <p>Welcome to our {{date}} newsletter!</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </body>
      </html>
    `
  },
  {
    id: '4',
    type: 'html',
    templateName: 'product-announcement',
    variables: {
      productName: 'SuperWidget',
      launchDate: 'July 1st, 2023'
    },
    content: `
      <html>
        <body>
          <h1>Announcing {{productName}}!</h1>
          <p>Get ready for the launch on {{launchDate}}.</p>
          <button>Pre-order now</button>
        </body>
      </html>
    `
  }
];

