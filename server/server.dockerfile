FROM golang:1.22

WORKDIR /app

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ffmpeg curl && \
    rm -rf /var/lib/apt/lists/*

RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp && chmod a+rx /usr/local/bin/yt-dlp

COPY . .

RUN go build -o server ./cmd/server

EXPOSE 8000

# Add a simple test command
CMD ["sh", "-c", "echo 'Testing cookie mount:' && ls -la /app/cookies* && echo 'Starting server...' && ./server"]