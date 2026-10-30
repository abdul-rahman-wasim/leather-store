import { TEASERS } from "@/lib/catalog";

/** Editions still on the bench: information only, no reservation flow. */
export function AtelierTeasers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
      {TEASERS.map((t) => (
        <article
          key={t.id}
          className="group flex flex-col bg-surface-container-lowest rounded-xl p-3 border border-outline-variant/30 hover:border-outline transition-all duration-300 hover:shadow-lg"
        >
          <div className="relative w-full aspect-4/5 bg-surface-container rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              alt={t.imageAlt}
              src={t.image}
            />
            <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded font-label-sm text-[10px] uppercase tracking-wider text-primary font-medium">
              {t.stage}
            </div>
          </div>
          <div className="flex flex-col flex-1 pt-3 justify-between">
            <div>
              <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm mb-1">
                <span>{t.collection}</span>
                <span className="text-tertiary">{t.tag}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                {t.name}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">{t.description}</p>
            </div>
            <div className="pt-4">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-headline-sm text-headline-sm text-primary">Est. ${t.estUsd}</span>
                  <span className="font-label-sm text-label-sm text-secondary">/ £{t.estGbp}</span>
                </div>
                <span className="font-label-sm text-[10px] uppercase text-secondary">{t.status}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
