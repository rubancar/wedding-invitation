
# Wedding Invitation

Compile application
```shell
docker build . -t wedding-app:1.0dev4
```

Run compiled app in production
```shell
docker run --env-file .env.production.local -v <local-path>/wedding.sqlite:/persistent/data/wedding.sqlite -p 3333:3333 wedding-app:1.0dev4
```
