FROM postgres:16-alpine

RUN apk update && apk add jq

COPY "/scripts" "/docker-entrypoint-initdb.d"
COPY "/data" "/data"

RUN chmod +x /docker-entrypoint-initdb.d/init_db.sh

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 5432

CMD ["postgres"]