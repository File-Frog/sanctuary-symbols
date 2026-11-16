import Plan from '../components/Plan'
import Stage from '../components/Stage'
import { Rich } from '../components/Scripture'
import { Pager, Resources } from '../components/Bits'
import { generalResources } from '../data/extras'
import { R } from '../data/symbols'
import { useNavigate } from 'react-router-dom'

export default function ResourcesPage() {
  const navigate = useNavigate()
  return (
    <>
      <Stage caption="Click any piece of furniture to return to it">
        <div className="home-plan"><Plan onSelect={(id) => navigate(`/sanctuary/symbol/${id}`)} /></div>
        <div className="stage-title"><span className="st-name">Resources</span></div>
      </Stage>
      <div className="commentary">
        <div className="prose">
          <h1>Resources</h1>
          <p className="lede">Where to go next.</p>
          <p>
            <Rich text={`Start with the Bible itself. Read Exodus 25 to 40 for the building, Leviticus 1 to 16 for the services, and Hebrews 7 to 10 for the meaning. Then read Daniel 7 to 9 for the timing. The books below go deeper, and each one is listed for what it does well.`} />
          </p>
        </div>

        <h2>Scripture</h2>
        <Resources items={generalResources} />

        <h2>Ellen White</h2>
        <Resources items={[R.pp30, R.gc23, R.gc24, R.gc28]} />

        <h2>Classic studies</h2>
        <Resources items={[R.andreasen, R.haskell, R.hardinge]} />

        <h2>Scholarship</h2>
        <Resources items={[R.gane, R.ganeCult, R.davidson, R.darcom, R.seventy, R.shea]} />

        <h2>An easy way in</h2>
        <Resources items={[R.goldstein]} />

        <div className="prose" style={{ marginTop: '2rem', fontSize: '0.92rem', color: 'var(--ink-soft)' }}>
          <p>Scripture quotations are from the King James Version, which is in the public domain. Measurements assume a cubit of about 18 inches.</p>
        </div>

        <Pager path="/sanctuary/resources" />
      </div>
    </>
  )
}
