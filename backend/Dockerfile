FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HF_HOME=/models/huggingface \
    OPENPRONOUNCE_DEVICE=cpu

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg espeak-ng libsndfile1 ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt requirements-pronunciation.txt ./
RUN pip install --no-cache-dir -r requirements-pronunciation.txt

COPY app ./app
RUN useradd --create-home --uid 10001 appuser \
    && mkdir -p /models/huggingface \
    && chown -R appuser:appuser /app /models

USER appuser
EXPOSE 8000
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
