export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-start px-4 py-10 sm:px-8 sm:py-16">
      <article className="page typed w-full max-w-2xl px-8 py-14 sm:px-16 sm:py-20 leading-7">
        <header className="mb-12 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.45em] text-(--ink-soft)">
            The Infinite Monkey Project
          </p>
          <h1 className="mt-5 text-3xl uppercase tracking-[0.2em] sm:text-4xl">
            The Tempest
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-(--ink-soft)">
            by William Shakespeare
          </p>
          <hr className="ribbon-rule mx-auto mt-8 w-24" />
        </header>

        <section className="space-y-7">
          <h2 className="text-center text-xl uppercase tracking-[0.35em]">
            Act I
          </h2>
          <h3 className="text-center text-sm uppercase tracking-[0.22em] text-(--ink-soft)">
            Scene I. On a ship at sea: a tempestuous noise
          </h3>

          <div>
            <p>of thunder and lightning heard.</p>
            <p className="stage-dir">
              <em>[ Enter a Master and a Boatswain ]</em>
            </p>
          </div>

          <div>
            <p className="speaker uppercase">Master</p>
            <p>Boatswain!</p>
          </div>

          <div>
            <p className="speaker uppercase">Boatswain</p>
            <p>Here, master: what cheer?</p>
          </div>

          <div>
            <p className="speaker uppercase">Master</p>
            <p>Good, speak to the mariners: fall to&apos;t, yarely,</p>
            <p>or we run ourselves aground: bestir, bestir.</p>
            <p className="stage-dir">
              <em>[ Exit ]</em>
            </p>
            <p className="stage-dir">
              <em>[ Enter Mariners ]</em>
            </p>
          </div>

          <div>
            <p className="speaker uppercase">Boatswain</p>
            <p>Heigh, my hearts! cheerly, cheerly, my hearts!</p>
            <p>yare, yare! Take in the topsail. Tend to the</p>
            <p>master&apos;s whistle. Blow, till thou burst thy wind,</p>
            <p>if room enough!</p>
            <p className="stage-dir">
              <em>
                [ Enter ALONSO, SEBASTIAN, ANTONIO, FERDINAND, GONZALO, and
                others ]
              </em>
            </p>
          </div>

          <div>
            <p className="speaker uppercase">Alonso</p>
            <p>Good boatswain, have care. Where&apos;s the master?</p>
            <p>Play the men.</p>
          </div>

          <div>
            <p className="speaker uppercase">Boatswain</p>
            <p>I pray now, keep below.</p>
          </div>

          <div>
            <p className="speaker uppercase">Antonio</p>
            <p>Where is the master, boatswain?</p>
          </div>

          <div>
            <p className="speaker uppercase">Boatswain</p>
            <p>Do you not hear him? You mar our labour: keep your</p>
            <p>cabins: you do assist the storm.</p>
          </div>
        </section>

        <footer className="mt-16 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-(--ink-soft)">
          <span>Page 1</span>
          <span aria-hidden>— ¶ —</span>
          <span>Draft</span>
        </footer>
      </article>
    </main>
  );
}
