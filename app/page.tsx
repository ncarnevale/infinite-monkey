export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-8">
      <div className="max-w-prose space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Infinite Monkey
        </h1>
        <h2 className="text-xl font-semibold">ACT I</h2>
        <h3 className="text-lg font-medium">
          SCENE I. On a ship at sea: a tempestuous noise
        </h3>

        <div>
          <p>of thunder and lightning heard.</p>
          <p className="stage-dir">
            <em>Enter a Master and a Boatswain</em>
          </p>
        </div>

        <div>
          <p>
            <b>Master</b>
          </p>
          <p>Boatswain!</p>
        </div>

        <div>
          <p>
            <b>Boatswain</b>
          </p>
          <p>Here, master: what cheer?</p>
        </div>

        <div>
          <p>
            <b>Master</b>
          </p>
          <p>Good, speak to the mariners: fall to't, yarely,</p>
          <p>or we run ourselves aground: bestir, bestir.</p>
          <p className="stage-dir">
            <em>Exit</em>
          </p>
          <p className="stage-dir">
            <em>Enter Mariners</em>
          </p>
        </div>

        <div>
          <p>
            <b>Boatswain</b>
          </p>
          <p>Heigh, my hearts! cheerly, cheerly, my hearts!</p>
          <p>yare, yare! Take in the topsail. Tend to the</p>
          <p>master's whistle. Blow, till thou burst thy wind,</p>
          <p>if room enough!</p>
          <p className="stage-dir">
            <em>
              Enter ALONSO, SEBASTIAN, ANTONIO, FERDINAND, GONZALO, and others
            </em>
          </p>
        </div>

        <div>
          <p>
            <b>ALONSO</b>
          </p>
          <p>Good boatswain, have care. Where's the master?</p>
          <p>Play the men.</p>
        </div>

        <div>
          <p>
            <b>Boatswain</b>
          </p>
          <p>I pray now, keep below.</p>
        </div>

        <div>
          <p>
            <b>ANTONIO</b>
          </p>
          <p>Where is the master, boatswain?</p>
        </div>

        <div>
          <p>
            <b>Boatswain</b>
          </p>
          <p>Do you not hear him? You mar our labour: keep your</p>
          <p>cabins: you do assist the storm.</p>
        </div>
      </div>
    </main>
  );
}
