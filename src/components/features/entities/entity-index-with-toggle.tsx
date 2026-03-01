"use client";

import EntityIndexClient from "./entity-index-client";
import type { EntityFilterOptions } from "@/lib/server-data";

interface EntityIndexWithToggleProps {
  entity: Parameters<typeof EntityIndexClient>[0]["entity"];
  items: Parameters<typeof EntityIndexClient>[0]["items"];
  initial?: Parameters<typeof EntityIndexClient>[0]["initial"];
  filterOptions: EntityFilterOptions;
}

export default function EntityIndexWithToggle({
  entity,
  items,
  initial,
  filterOptions,
}: EntityIndexWithToggleProps) {
  return (
    <EntityIndexClient
      entity={entity}
      items={items}
      initial={initial}
      filterOptions={filterOptions}
    />
  );
}
