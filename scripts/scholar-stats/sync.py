#!/usr/bin/env python3
"""
Fetch Google Scholar metrics via SerpAPI and patch the Sanity `profile` document.

Environment:
  SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN — write access to the dataset
  (Project/dataset may fall back to NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET for local runs.)
  SERPAPI_API_KEY — SerpAPI key
  GOOGLE_SCHOLAR_AUTHOR_ID — author user id from the profile URL (e.g. user=XXXX)
  Optional: SCHOLAR_PROFILE_URL — if set and GOOGLE_SCHOLAR_AUTHOR_ID is empty, parses user=... from URL
  Optional: SANITY_PROFILE_DOCUMENT_ID — skip GROQ lookup and patch this document _id directly
"""

from __future__ import annotations

import json
import os
import re
import sys
from typing import Any

import requests
from serpapi import GoogleSearch


SANITY_API_VERSION = "2024-01-01"


def _env(name: str, required: bool = True) -> str | None:
    val = os.environ.get(name, "").strip()
    if not val and required:
        print(f"Missing required environment variable: {name}", file=sys.stderr)
        sys.exit(1)
    return val or None


def parse_author_id_from_url(url: str) -> str | None:
    m = re.search(r"[?&]user=([^&]+)", url)
    return m.group(1) if m else None


def fetch_serp_metrics(author_id: str, api_key: str) -> dict[str, int]:
    """Resolve metrics from cited_by.table by field name (order-independent)."""
    params = {
        "engine": "google_scholar_author",
        "author_id": author_id,
        "api_key": api_key,
    }
    try:
        search = GoogleSearch(params)
        data = search.get_dict()
    except Exception as e:
        raise RuntimeError(f"SerpAPI request failed: {e}") from e

    if data.get("error"):
        raise RuntimeError(f"SerpAPI error: {data.get('error')}")

    cited_by = data.get("cited_by") or {}
    table = cited_by.get("table") or []
    citations = h_index = i10 = None

    for row in table:
        if isinstance(row, dict):
            if "citations" in row and isinstance(row["citations"], dict):
                citations = _to_int(row["citations"].get("all"))
            if "h_index" in row and isinstance(row["h_index"], dict):
                h_index = _to_int(row["h_index"].get("all"))
            if "i10_index" in row and isinstance(row["i10_index"], dict):
                i10 = _to_int(row["i10_index"].get("all"))

    if citations is None or h_index is None or i10 is None:
        raise RuntimeError(
            "Could not parse citations, h_index, and i10_index from SerpAPI response "
            "(expected cited_by.table rows)."
        )

    return {
        "citations": citations,
        "hIndex": h_index,
        "i10Index": i10,
    }


def _to_int(val: Any) -> int | None:
    if val is None:
        return None
    if isinstance(val, bool):
        return None
    if isinstance(val, int):
        return val
    if isinstance(val, float):
        return int(val)
    s = str(val).strip().replace(",", "")
    if not s:
        return None
    try:
        return int(s)
    except ValueError:
        return None


def sanity_query_profile_id(project_id: str, dataset: str, token: str) -> str:
    """Return _id of the single `profile` document."""
    query = '*[_type == "profile"][0]._id'
    url = f"https://{project_id}.api.sanity.io/v{SANITY_API_VERSION}/data/query/{dataset}"
    try:
        r = requests.get(
            url,
            params={"query": query},
            headers={"Authorization": f"Bearer {token}"},
            timeout=60,
        )
        r.raise_for_status()
    except requests.RequestException as e:
        raise RuntimeError(f"Sanity query request failed: {e}") from e

    body = r.json()
    result = body.get("result")
    if not result:
        raise RuntimeError('No profile document found (_type == "profile").')
    return str(result)


def sanity_patch_profile(
    project_id: str,
    dataset: str,
    token: str,
    doc_id: str,
    metrics: dict[str, int],
) -> None:
    url = f"https://{project_id}.api.sanity.io/v{SANITY_API_VERSION}/data/mutate/{dataset}"
    payload = {
        "mutations": [
            {
                "patch": {
                    "id": doc_id,
                    "set": {
                        "citations": metrics["citations"],
                        "hIndex": metrics["hIndex"],
                        "i10Index": metrics["i10Index"],
                    },
                }
            }
        ]
    }
    try:
        r = requests.post(
            url,
            json=payload,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            timeout=60,
        )
    except requests.RequestException as e:
        raise RuntimeError(f"Sanity mutate request failed: {e}") from e

    if not r.ok:
        raise RuntimeError(f"Sanity mutate HTTP {r.status_code}: {r.text}")

    try:
        out = r.json()
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Sanity mutate returned non-JSON: {r.text[:500]}") from e

    if out.get("error"):
        raise RuntimeError(f"Sanity mutation error: {out['error']}")


def _project_id() -> str:
    v = (
        os.environ.get("SANITY_PROJECT_ID", "").strip()
        or os.environ.get("NEXT_PUBLIC_SANITY_PROJECT_ID", "").strip()
    )
    if not v:
        print(
            "Set SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID.",
            file=sys.stderr,
        )
        sys.exit(1)
    return v


def _dataset() -> str:
    v = (
        os.environ.get("SANITY_DATASET", "").strip()
        or os.environ.get("NEXT_PUBLIC_SANITY_DATASET", "").strip()
    )
    if not v:
        print(
            "Set SANITY_DATASET or NEXT_PUBLIC_SANITY_DATASET.",
            file=sys.stderr,
        )
        sys.exit(1)
    return v


def main() -> None:
    project_id = _project_id()
    dataset = _dataset()
    token = _env("SANITY_API_TOKEN")
    serp_key = _env("SERPAPI_API_KEY")

    author_id = os.environ.get("GOOGLE_SCHOLAR_AUTHOR_ID", "").strip()
    if not author_id:
        profile_url = os.environ.get("SCHOLAR_PROFILE_URL", "").strip()
        if profile_url:
            author_id = parse_author_id_from_url(profile_url) or ""
    if not author_id:
        print(
            "Set GOOGLE_SCHOLAR_AUTHOR_ID or SCHOLAR_PROFILE_URL (with user=... in the URL).",
            file=sys.stderr,
        )
        sys.exit(1)

    metrics = fetch_serp_metrics(author_id, serp_key)

    profile_id = os.environ.get("SANITY_PROFILE_DOCUMENT_ID", "").strip()
    if not profile_id:
        profile_id = sanity_query_profile_id(project_id, dataset, token)

    sanity_patch_profile(project_id, dataset, token, profile_id, metrics)
    print(
        json.dumps(
            {"ok": True, "profileId": profile_id, "metrics": metrics},
            indent=2,
        )
    )


if __name__ == "__main__":
    try:
        main()
    except RuntimeError as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
