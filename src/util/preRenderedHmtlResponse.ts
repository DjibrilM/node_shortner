import { Meta } from '../util/shared/interfaces';

export const createPreRenderedHmtlPage = (metatags: Meta[], title: string) => {
  const page = 
`
<!DOCTYPE html>
<html lang="en">
 <head>
    ${metatags.map((data) => `<meta name="${data.name || 'null'}" content="${data.content}" property="${data.property}" />`).join('')}
<title>${title}</title>
</head>

<body>

</body>
</html>

`;

  return page;
};
