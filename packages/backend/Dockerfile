FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main cmd/api/main.go

FROM alpine:latest
# Install curl so the healthcheck can run
RUN apk add --no-cache curl
WORKDIR /root/
COPY --from=builder /app/main .

# The Health Check: Pings the app every 30s
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ping || exit 1

EXPOSE 8080
CMD ["./main"]