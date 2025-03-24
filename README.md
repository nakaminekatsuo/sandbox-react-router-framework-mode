## Getting Started

### Prerequisites

- Docker(includes compose plugin)

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Add Environment Variables in `.env`

Setup the Database

```bash
docker compose up -d
npx drizzle-kit generate
npx drizzle-kit migrate
```

> [!INFO]
> このプロジェクトはまだ試作中のためdrizzle-kitが生成するファイルをgit管理下に置いていません。そのため、migrateを行う前にganerateを行ってください。
>volumeを破棄する場合は以下のコマンドで破棄します。
> ```bash
> docker compose down -v
> ```

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

> [!INFO]
> TBD(Below is original description.)

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This sandbox uses Stylex.

---

Built with ❤️ using React Router.
