# --------------------
# Base image (prod deps)
# --------------------
FROM ghcr.io/astral-sh/uv:python3.10-trixie AS base

WORKDIR /app

# Enable bytecode compilation
ENV UV_COMPILE_BYTECODE=1
ENV UV_LINK_MODE=copy
ENV UV_TOOL_BIN_DIR=/usr/local/bin

# Copy dependency files first (better caching)
COPY pyproject.toml uv.lock ./

# Install production dependencies only
RUN uv sync --locked --no-install-project --no-dev

# Copy project source
COPY . /app

# Install project itself
RUN uv sync --locked --no-dev

# Ensure venv executables are first in PATH
ENV PATH="/app/.venv/bin:$PATH"

# --------------------
# Test stage
# --------------------
FROM base AS test

# Install development dependencies
RUN uv sync --locked --install-dev

# Reset entrypoint
ENTRYPOINT []

# Run tests_
CMD ["pytest", "tests/", "-v", "--cov=src", "--cov-report=term-missing"]

# --------------------
# Production stage
# --------------------
FROM base AS production

# Reset entrypoint
ENTRYPOINT []

# Run FastAPI
CMD ["fastapi", "run", "--host", "0.0.0.0"]
