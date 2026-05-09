import { TypewriterPage } from "./components/TypewriterPage";
import { WORKS } from "./lib/works-manifest";
import { fetchWorkText } from "./lib/work-text";

export default async function Home() {
  const work = WORKS[0];
  const text = await fetchWorkText(work);

  return (
    <main className="flex min-h-0 flex-1 flex-col items-start justify-start px-4 pt-10 pb-0 sm:px-8 sm:pt-16 sm:pb-0">
      <div className="mb-12 font-bold">
        <span className="block sm:hidden">Monkeys don&apos;t use smartphones!</span>
        <span className="hidden sm:block">
          They say that given enough time, a monkey in a room with a typewriter
          would produce the complete works of William Shakespeare. You are that
          monkey.
        </span>
      </div>
      <article className="page typed hidden w-full max-w-4xl mx-auto flex-1 flex-col px-8 py-8 text-left text-base leading-7 sm:flex sm:px-16">
        <TypewriterPage text={text} />
      </article>
    </main>
  );
}
