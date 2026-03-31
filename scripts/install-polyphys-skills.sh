#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$repo_root/docs/superpowers/skills"

choose_default_target() {
  if [[ -n "${CODEX_HOME:-}" ]]; then
    printf '%s/skills\n' "$CODEX_HOME"
    return
  fi

  if [[ -d "$HOME/.codex" ]]; then
    printf '%s\n' "$HOME/.codex/skills"
    return
  fi

  if [[ -d "$HOME/.agents" ]]; then
    printf '%s\n' "$HOME/.agents/skills"
    return
  fi

  printf '%s\n' "$HOME/.codex/skills"
}

target_dir="${1:-$(choose_default_target)}"
mkdir -p "$target_dir"

for skill_dir in "$source_dir"/*; do
  [[ -d "$skill_dir" ]] || continue
  skill_name="$(basename "$skill_dir")"
  destination="$target_dir/$skill_name"
  mkdir -p "$destination"
  cp -R "$skill_dir"/. "$destination"/
  printf 'Installed %s -> %s\n' "$skill_name" "$destination"
done
