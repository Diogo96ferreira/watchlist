import { Shell } from "@/components/watch/shell";
import { ShowroomPanel } from "@/components/watch/showroom-panel";
import { manuelProfile } from "@/lib/data";

export default function Showroom2Page() {
  return (
    <Shell currentPath="/app/showroom-2" immersive>
      <main className="showroom-snap h-screen overflow-y-auto px-8 pt-20">
        {manuelProfile.watches.slice(0, 4).map((watch) => (
          <div key={watch.id} className="showroom-panel page-frame">
            <ShowroomPanel watch={watch} />
          </div>
        ))}
        <div className="page-frame pb-20 text-center">
          <p className="eyebrow">Scroll for craftsmanship</p>
        </div>
      </main>
    </Shell>
  );
}
