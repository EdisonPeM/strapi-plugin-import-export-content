# Strapi plugin import-export-content

plugin to import and export content according to users permissions

## Installation

```bash
yarn add strapi-plugin-import-export-content
```

or

```bash
npm i strapi-plugin-import-export-content
```

## Rebuild your administration panel
New releases can introduce changes to the administration panel that require a rebuild. Rebuild the admin panel with one of the following commands:

```bash
yarn build --clean
```
or

```bash
npm run build -- --clean
```


## Features

- Read data from CSV and JSON file or from typing raw text
- Import contents to collection or single Type
- Export CSV and JSON contents allowed for the user
- Download files or copy exported data to clipboard
- Import content as draft or public
- Recognize format of inputs and content types
- Support to Import Media by id or object with id key
- Support to upload media from URL
- Support to Import Relations by id or object with id key
- Support to Import Components and Dynamic Zone Content as objects

## Future Work

- Export media without formats
- Export only url of medias instead all fields
- Export media and relations as ids instead all fields
- Add filters to export

## Author

Edison Peñuela – [@EdisonPeM](https://github.com/EdisonPeM/) – edisonpe961206@hotmail.com

## Acknowledgments

This plugin has been inspired by the tutorial [How to create an import content plugin](https://strapi.io/blog/how-to-create-an-import-content-plugin-part-1-4)
