# Youtube Search API Docker

Youtube Search API docker is an API server for getting Youtube search results using [youtube-search-api](https://www.npmjs.com/package/youtube-search-api). You can run it on Docker container or directly node.js.


## Installation (Node.js)

```bash
npm install
```
```bash
npm start
```

## Installation (Docker)

```bash
docker pull youtube-search-api
```
```bash
docker run -p 3000:3000 --name youtube-search-api damonwong/youtube-search-api .
```

## User Guide
1. Default port `3000`
2. Swagger API document: `http://localhost:3000/api-docs`
3. URL: `/api/v1`

## Message

If you want to work with me to fix bug or implement new idea. You are available to send me some new idea of this project.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
