export default function Home() {
  return (
    <main className="flex min-h-0 flex-1 flex-col items-start justify-start px-4 pt-10 pb-0 sm:px-8 sm:pt-16 sm:pb-0">
      <div className="mb-10 font-bold">They say that given enough time, a monkey in a room with a typewriter would produce the complete works of William Shakespeare. You are that monkey.</div>
      <article className="page typed flex w-full max-w-4xl mx-auto flex-1 flex-col px-8 py-8 text-left text-base leading-7 sm:px-16">
        <header className="mb-12 text-left font-normal">
          <h1 className="mt-5 font-normal uppercase">
            The Tempest
          </h1>
          <p className="mt-3 uppercase">
            by William Shakespeare
          </p>
        </header>

        <section className="flex flex-1 flex-col space-y-7 font-normal">
          <h2 className="uppercase">
            Act I
          </h2>
          <h3 className="uppercase">
            Scene I. On a ship at sea: a tempestuous noise
          </h3>

          <div>
            <p>of thunder and lightning heard.</p>
            <p className="stage-dir">
              <em>[ Enter a Master and a Boatswain ]</em>
            </p>
          </div>

          <div>
            <p className="uppercase">Master</p>
            <p>Boatswain!</p>
          </div>

          <div>
            <p className="uppercase">Boatswain</p>
            <p>Here, master: what cheer?</p>
          </div>

          <div>
            <p className="uppercase">Master</p>
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
            <p className="uppercase">Boatswain</p>
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
            <p className="uppercase">Alonso</p>
            <p>Good boatswain, have care. Where&apos;s the master?</p>
            <p>Play the men.</p>
          </div>

          <div>
            <p className="uppercase">Boatswain</p>
            <p>I pray now, keep below.</p>
          </div>

          <div>
            <p className="uppercase">Antonio</p>
            <p>Where is the master, boatswain?</p>
          </div>

          <div>
            <p className="uppercase">Boatswain</p>
            <p>Do you not hear him? You mar our labour: keep your</p>
            <p>cabins: you do assist the storm.</p>
          </div>
        </section>
      </article>
    </main>
  );
}
