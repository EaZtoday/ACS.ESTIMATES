import StaticEntityIndexWithToggle from "./static-entity-index-with-toggle";
import type { EntityFilterOptions } from "@/lib/server-data";
interface StaticEntityIndexPageProps {
  entity:
    | "organizations"
    | "contacts"
    | "offers"
    | "projects"
    | "services";
  initial?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any;
  items?: any[];
  filterOptions: EntityFilterOptions;
}

const entityConfig = {
  organizations: {
    title: "Organizations",
    createLink: "/dashboard/organizations/new",
    createButtonText: "Add Organization",
  },
  contacts: {
    title: "Contacts",
    createLink: "/dashboard/contacts/new",
    createButtonText: "Add Contact",
  },
  offers: {
    title: "Offers",
    createLink: "/dashboard/offers/new",
    createButtonText: "Add Offer",
  },
  projects: {
    title: "Projects",
    createLink: "/dashboard/projects/new",
    createButtonText: "Add Project",
  },
  services: {
    title: "Services",
    createLink: "/dashboard/services/new",
    createButtonText: "Add Service",
  },
};

export default async function StaticEntityIndexPage({
  entity,
  initial,
  supabase,
  items,
  filterOptions,
}: StaticEntityIndexPageProps) {
  const config = entityConfig[entity];

  return (
    <StaticEntityIndexWithToggle
      entity={entity}
      items={items || []}
      initial={initial}
      title={config.title}
      createLink={config.createLink}
      createButtonText={config.createButtonText}
      filterOptions={filterOptions}
    />
  );
}
