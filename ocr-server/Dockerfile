# ── Build stage: install Python deps ─────────────────────────────────────────
FROM python:3.11-slim AS builder

WORKDIR /install

# System libraries required by OpenCV (used internally by PaddleOCR)
RUN apt-get update && apt-get install -y --no-install-recommends \
        libgl1 \
        libglib2.0-0 \
        libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install into a prefix so we can copy cleanly to the runtime stage
RUN pip install --no-cache-dir --prefix=/install/deps -r requirements.txt


# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM python:3.11-slim

WORKDIR /app

# Same runtime system libs (no build tools needed here)
RUN apt-get update && apt-get install -y --no-install-recommends \
        libgl1 \
        libglib2.0-0 \
        libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy pre-installed Python packages
COPY --from=builder /install/deps /usr/local

# Copy application code
COPY main.py .

# Railway injects $PORT at runtime; default to 8000 for local runs
ENV PORT=8000

EXPOSE 8000

# Use shell form so $PORT is expanded at runtime
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT}
