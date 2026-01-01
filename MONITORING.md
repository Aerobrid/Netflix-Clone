# Monitoring (Prometheus + Grafana)

This repository includes a monitoring stack for the Node backend using `prom-client` (in-process exporters), Prometheus (time series collection), and Grafana (visualization). The Grafana dashboard JSON is provisioned under `monitoring/grafana/provisioning/dashboards/` so Grafana loads it automatically on startup.

## Setup

For starting:
```
docker-compose up -d --build
```
For ending:
```
docker-compose down
```

## Files and what they do

- `docker-compose.yml`
  - Orchestrates services for development: the `app` service (netflix-app), `prometheus`, and `grafana`
  - Grafana mounts `monitoring/grafana/provisioning` so both datasources and dashboards are automatically provisioned.

- `monitoring/prometheus.yml`
  - Prometheus scrape configuration. Defines scrape jobs (e.g., target the `app` at `/metrics`).
  - Configure `job_name`, `scrape_interval`, and relabeling here. 

- `monitoring/grafana/provisioning/datasources/datasource.yml`
  - A provisioning file describing the Prometheus datasource for Grafana.
  - This repo uses a portable config (no fixed UID) and the datasource is referenced by name `Prometheus` in the dashboard JSON.

- `monitoring/grafana/provisioning/dashboards/netflix-nodejs-dashboard.json`
  - Grafana dashboard JSON (provisioned). It contains panels and PromQL queries referencing metric names emitted by `prom-client`.
  - The file in this repo has had UIDs nulled and datasource references set to the datasource name to make it portable across Grafana instances.
  - Change added to include `job` variable so job=`$job`, **not** a hard-coded description

- `backend/server.js`
  - Uses `prom-client` to define metrics and exposes `/metrics` for Prometheus to scrape.
  - A custom `Registry` is used and default Node/process metrics are collected via `collectDefaultMetrics({ register })`.

## How it works — flow

1. The Node app (backend) uses `prom-client` to create and expose metrics at `GET /metrics`.
2. Prometheus scrapes the `/metrics` endpoint at the configured interval and stores time-series data.
3. Grafana queries Prometheus using PromQL and renders the dashboard panels in the provisioned JSON.

## Common commands

```powershell
# view metrics served by the app
curl http://localhost:5000/metrics

# validate dashboard JSON
jq . monitoring/grafana/provisioning/dashboards/netflix-nodejs-dashboard.json

# restart Grafana so it re-reads provisioning files
docker compose restart grafana
```

## Metrics already instrumented (in `backend/server.js`)

- `http_request_duration_seconds` (Histogram) — request latency with labels: `method`, `route`, `status_code`.
- `http_inprogress_requests` (Gauge) — concurrent in-flight requests.
- `http_errors_total` (Counter) — counts HTTP errors (status >= 400) labeled by `method`, `route`, `status_code`.
- `db_query_duration_seconds` (Histogram) — placeholder for DB query timing; you must wrap DB calls to populate it.
- Default Node/process metrics collected by `collectDefaultMetrics` (heap, event-loop lag, GC, etc.).

## Suggested additional metrics to add

- Business/domain counters:
  - `user_signups_total`, `sign_in_failures_total`, `search_queries_total{term=...}` (use labels sparingly).
- Cache metrics:
  - `cache_hits_total`, `cache_misses_total`, `cache_hit_ratio` (derived), `cache_items` (gauge).
- External API and downstream latency:
  - `external_api_duration_seconds` (Histogram), `external_api_errors_total`.
- Background job metrics:
  - `job_runs_total{name=...,status=...}`, `job_duration_seconds{name=...}`.
- DB/ORM specific:
  - `db_connections_active`, `db_pool_size`, `db_query_duration_seconds` (histogram by query type/route).

Notes on label cardinality: avoid high-cardinality labels (like user IDs or full URIs). Use coarse labels such as route name, status code, or a small set of categories.

## Quick instrumentation examples

In `backend/server.js`:

```js
// timing a DB call
const end = dbQueryDurationSeconds.startTimer();
await db.query(...);
end();

// business counter
import { Counter } from 'prom-client';
const signupCounter = new Counter({ name: 'user_signups_total', help: 'Total user signups' });
// increment when signup succeeds
signupCounter.inc();
```

## Validation & debugging

- Validate the dashboard JSON after edits with `jq` or any JSON linter.
- Check Grafana provisioning logs for errors:

```powershell
docker compose logs grafana --tail 200
```

- Ensure Prometheus has targets up (visit Prometheus web UI usually at `http://localhost:9090/targets`). If the target is DOWN, check networking and that the app `/metrics` is reachable from the Prometheus container. 
