import { render, screen } from "@testing-library/react";
import { AppNavigation } from "@/components/watch/app-navigation";
import { FlowBreadcrumbs } from "@/components/watch/flow-breadcrumbs";
import { getRouteFlow } from "@/lib/data";

describe("navigation components", () => {
  it("marks the current top-level section as active", () => {
    render(<AppNavigation currentSection="Vault" />);

    const activeLink = screen.getByRole("link", { name: "Vault" });
    const inactiveLink = screen.getByRole("link", { name: "Journal" });

    expect(activeLink.className).toContain("text-[var(--foreground)]");
    expect(inactiveLink.className).toContain("text-[var(--muted)]");
  });

  it("renders breadcrumbs using the section root instead of always vault", () => {
    const flow = getRouteFlow("/app/appreciations");
    expect(flow).toBeDefined();

    render(<FlowBreadcrumbs flow={flow!} />);

    const sectionLink = screen.getByRole("link", { name: "Journal" });
    expect(sectionLink).toHaveAttribute("href", "/app/journal");
    expect(screen.getByText("Appreciations")).toBeInTheDocument();
  });
});
