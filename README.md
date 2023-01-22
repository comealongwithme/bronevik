## Тестовое задание для Frontend-разработчика
В этом тестовом задании мы попросим тебя реализовать приложение “Онлайн Табло Аэропорта”.
[bronvik.com](https://bronevik.com)

При выполнении данного задания необходимо использовать Vue + Vuex + Vue-router.

## Todo
- [ ] Страница прилетов
- [ ] Страница вылетов
- [x] Приложение имеет два режима:
  - [x] для пользователей
  - [x] для админов
- [ ] Пользователь имеет возможность:
  - [x] просмотра
  - [ ] поиска
- [ ] Админ имеет возможность:
  - [ ] удалить
  - [x] добавить рейс
  - [x] изменить рейс
- [x] Страница рейса:
  - [x] динамический адрес
  - [x] номер, пункт назначения или пункт вылета, дата и время прилета или вылета
- [ ] Поиск производить:
  - [ ] по городу
  - [ ] по рейсу
- [ ] Переход в режим админа:
  - [x] по кнопке
  - [ ] по параметру в url
- [x] Данные получать асинхронно
- [x] Данные получать из базы данных
- [x] Зарегистрированный пользовать сохраняется в store и localStorage
---
### Setup Docker image
1. Create Dockerfile
```dockerfile
FROM alpine:3 as downloader

ARG TARGETOS
ARG TARGETARCH
ARG VERSION=0.11.3

ENV BUILDX_ARCH="${TARGETOS:-linux}_${TARGETARCH:-amd64}"

# Install the dependencies
RUN apk add --no-cache \
    ca-certificates \
    unzip \
    wget \
    zip \
    zlib-dev

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${VERSION}/pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
    && unzip pocketbase_${VERSION}_${BUILDX_ARCH}.zip \
    && chmod +x /pocketbase

FROM scratch

EXPOSE <your-docker-image-port>

COPY --from=downloader /pocketbase /usr/local/bin/pocketbase
CMD ["/usr/local/bin/pocketbase", "serve", "--http=0.0.0.0:<your-docker-image-port>"]
```
2. Build docker image
```shell
docker build -t <your-docker-image-name> .
```
3. Verify docker image
```shell
docker run -it --rm -p <your-docker-image-port>:<your-docker-image-port> <your-docker-image-name>
```
4. Login in Docker
```shell
docker login -u <your-username> -p <your-password>
```
5. Tag Docker image
```shell
docker tag <your-docker-image-name>:latest <your-docker-user>/<your-docker-image-name>:latest
```
6. Rollout docker image
```shell
docker push <your-docker-user>/<your-docker-image-name>:latest
```
### Fly.io deploy
> More info at https://github.com/pocketbase/pocketbase/discussions/537

1. Install fly sdk locally
```shell
# Windows:
iwr https://fly.io/install.ps1 -useb | iex
# Linux
curl -L https://fly.io/install.sh | sh
# Mac
brew install flyctl
# or
curl -L https://fly.io/install.sh | sh
```
2. Sign in at Fly.io
```shell
# Sign up
flyctl auth signup
# Sign in
flyctl auth login
```
3. Create new app
```shell
flyctl launch --image <your-docker-user>/<your-docker-image-name>
```
4. Modify created fly.toml file
```yaml
...
[experimental]
  # Docker image port specified in Dockerfile
  allowed_public_ports = [<your-docker-image-port>]
  ...
...
[[services]]
  ...
  # Docker image port specified in Dockerfile
  internal_port = <your-docker-image-port>
  [[services.ports]]
    handlers = ["http"]
  # Docker image port specified in Dockerfile
    port = <your-docker-image-port>
...
```
5. Deploy
```shell
flyctl deploy
```
6. Access with hostname from Fly.io dashboard
```shell
# Example
http://bronevik.fly.dev/
http://bronevik.fly.dev/api
http://bronevik.fly.dev/_/
```
