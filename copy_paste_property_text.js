require('dotenv').config();   // .env에 NOTION_API_KEY 작성할 것

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  // read database
  const databaseId = 'bc19c25a63c64dc8a00f7468c2b6f3a7';
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  console.log(response);


  // update pages
  response.results.forEach(async (result)=>{
    const pageId = result.id;

    const newNameObjs = result.properties.교과목명.rich_text;
    const newNameStr = newNameObjs.map(obj=>obj.plain_text).join('');

    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        'title': {
          'title': [{'text':{'content':newNameStr}}]
        },
      },
    });
    console.log(response.properties.Title.title[0].text.content + " done.");
  })


})();