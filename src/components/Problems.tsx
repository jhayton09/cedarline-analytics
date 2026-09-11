import { problems } from '@/content/problems';

export function Problems() {
  return (
    <section id="problems" aria-labelledby="problems-heading" className="border-b border-line bg-mist-50">
      <div className="container-x">
        <div className="py-14 sm:py-16">
          <h2
            id="problems-heading"
            className="max-w-2xl text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.018em] sm:text-[1.75rem]"
          >
            Most projects start with one of three problems.
          </h2>

          <ul className="mt-9 grid divide-y divide-line-strong border-t border-line-strong sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-t-0">
            {problems.map((problem) => (
              <li key={problem.title} className="py-6 first:pt-0 sm:px-8 sm:py-0 first:sm:pl-0 last:sm:pr-0">
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.012em] text-ink-900">
                  {problem.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-slate-body">{problem.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
