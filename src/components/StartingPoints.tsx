const points = [
  {
    title: 'Month-end takes a day',
    body: 'The numbers live in several files, and someone has to stitch them together before anyone can look at them.',
  },
  {
    title: 'Decisions get made on feel',
    body: 'There is no straightforward way to test what a price change, an extra crew, or a slow quarter would actually do.',
  },
  {
    title: 'The workbook has outgrown itself',
    body: 'A spreadsheet that worked fine at ten jobs a month is now fragile, manual, and hard to fully trust.',
  },
];

export function StartingPoints() {
  return (
    <section
      id="starting-points"
      aria-labelledby="starting-points-heading"
      className="border-y border-line bg-mist-50"
    >
      <div className="container-x">
        <div className="py-14 sm:py-16">
          <h2
            id="starting-points-heading"
            className="text-eyebrow font-semibold tracking-[0.14em] text-slate-muted uppercase"
          >
            Where projects usually start
          </h2>

          <ul className="mt-9 grid gap-y-8 sm:grid-cols-3 sm:gap-y-0">
            {points.map((point, index) => (
              <li
                key={point.title}
                data-reveal
                data-reveal-delay={index * 90}
                className={`sm:px-8 ${index === 0 ? 'sm:pl-0' : 'sm:border-l sm:border-line-strong'} ${
                  index === points.length - 1 ? 'sm:pr-0' : ''
                }`}
              >
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-900">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-slate-body">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
