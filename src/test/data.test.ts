import {
  getProfileByUsername,
  getRouteFlow,
  getSectionRoute,
  manuelProfile,
  similarCollectors,
} from "@/lib/data";

describe("data flow integrity", () => {
  it("resolves the main signed-in vault route", () => {
    const flow = getRouteFlow("/app/vault");

    expect(flow).toBeDefined();
    expect(flow?.section).toBe("Vault");
    expect(flow?.primaryCta).toBe("Export Vault Archive");
  });

  it("maps navigation sections to their root routes", () => {
    expect(getSectionRoute("Journal")).toBe("/app/journal");
    expect(getSectionRoute("Showroom")).toBe("/app/showroom");
    expect(getSectionRoute("Grails")).toBe("/app/grails");
    expect(getSectionRoute("Vault")).toBe("/app/vault");
  });

  it("returns the main public profile", () => {
    expect(getProfileByUsername(manuelProfile.username)?.name).toBe("Manuel Canelas Pais");
  });

  it("resolves every similar collector profile to a public route", () => {
    for (const collector of similarCollectors) {
      const profile = getProfileByUsername(collector.username);
      expect(profile, collector.username).toBeDefined();
      expect(profile?.username).toBe(collector.username);
    }
  });
});
