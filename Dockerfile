FROM astral/uv:python3.13-bookworm-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*
COPY pyproject.toml uv.lock ./
RUN uv sync
COPY . .
RUN mv entrypoint.sh /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["entrypoint.sh"]
CMD ["uv", "run", "manage.py", "runserver", "0.0.0.0:8000"]
