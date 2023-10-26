ARG POSTGRES_VERSION=15

FROM node:${POSTGRES_VERSION}-alpine

ARG POSTGRES_PASSWORD=12345

# Expose the port that the application listens on.
EXPOSE 5432

RUN docker --name employee-dashboard-db \
    -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} 
#    -v /my/own/datadir:/var/lib/postgresql/data  -d postgres:tag \
    
#    docker build -t employee-dashboard-db . \
#    docker build  .