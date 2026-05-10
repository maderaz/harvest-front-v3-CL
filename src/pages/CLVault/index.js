import React, { useMemo, useState } from 'react'
import { useThemeContext } from '../../providers/useThemeContext'
import {
  Page,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  HeaderSubtitle,
  TokenIcons,
  Chip,
  Badge,
  Grid,
  ColLeft,
  ColRight,
  Card,
  CardHeader,
  CardTitle,
  CardSub,
  RangeBarOuter,
  RangeBarInner,
  RangeMarker,
  RangeLabels,
  RangeNumbers,
  Footnote,
  CompositionRow,
  CompositionBar,
  CompositionFill,
  KVList,
  KVRow,
  Para,
  Caret,
  TabRow,
  Tab,
  FieldLabel,
  FieldBox,
  Input,
  TokenPill,
  Hint,
  Preview,
  RouteNote,
  OutputGroup,
  OutputOpt,
  Cta,
  Slippage,
} from './style'

const VAULT = {
  protocol: 'Aerodrome',
  pair: { token0: 'cbETH', token1: 'WETH' },
  feeTier: '1-tick',
  range: { lower: 0.94, upper: 1.078, current: 1.012 },
  rangeUnit: 'cbETH/ETH',
  inRange: true,
  lastRebalance: '2 days ago',
  composition: {
    token0Pct: 62,
    token1Pct: 38,
    token0Amount: '12.40',
    token1Amount: '8.91',
  },
  userSlice: {
    shares: '0.00',
    token0: '0.00',
    token1: '0.00',
  },
  params: {
    targetWidth: '14.0%',
    currentWidth: '13.5%',
    rebalanceCooldown: '1 hour',
    deviationTrigger: '5.0%',
    twapWindow: '30 minutes',
    maxSwap: '15% of TVL',
    slippageBps: '50 bps',
  },
  costs: {
    entryFee: '0%',
    exitFee: '0%',
    profitShare: '10% on harvested rewards',
    balanced: '~12 bps',
    singleAsset: '~28 bps',
  },
  optimalRatio: { token0: 0.62, token1: 0.38 },
}

const CLVault = () => {
  const {
    bgColorNew,
    bgColorBox,
    bgColorChart,
    fontColor1,
    fontColor3,
    fontColor8,
    borderColorBox,
    hoverColorNew,
  } = useThemeContext()

  const [paramsOpen, setParamsOpen] = useState(false)
  const [mode, setMode] = useState('deposit')

  const [dep0, setDep0] = useState('')
  const [dep1, setDep1] = useState('')

  const [shares, setShares] = useState('')
  const [output, setOutput] = useState('both')

  const [slip, setSlip] = useState(0.5)

  const rangeMarkerPct = useMemo(() => {
    const { lower, upper, current } = VAULT.range
    const pct = ((current - lower) / (upper - lower)) * 100
    return Math.max(0, Math.min(100, pct))
  }, [])

  const depRoute = useMemo(() => {
    const a0 = parseFloat(dep0) > 0
    const a1 = parseFloat(dep1) > 0
    if (a0 && a1) return { label: `Routed via CLVault.deposit (both assets)`, kind: 'both' }
    if (a0) return { label: `Routed via CLWrapper(${VAULT.pair.token0}) — single asset`, kind: 't0' }
    if (a1) return { label: `Routed via CLWrapper(${VAULT.pair.token1}) — single asset`, kind: 't1' }
    return null
  }, [dep0, dep1])

  const wRoute = useMemo(() => {
    if (output === 'both') return `Routed via CLVault.withdraw — receive ${VAULT.pair.token0} + ${VAULT.pair.token1}`
    if (output === 't0') return `Routed via CLWrapper(${VAULT.pair.token0}) — receive ${VAULT.pair.token0} only`
    return `Routed via CLWrapper(${VAULT.pair.token1}) — receive ${VAULT.pair.token1} only`
  }, [output])

  const balance = () => {
    const total = parseFloat(dep0) || parseFloat(dep1) || 0
    if (!total) return
    setDep0((total * VAULT.optimalRatio.token0).toFixed(4))
    setDep1((total * VAULT.optimalRatio.token1).toFixed(4))
  }

  return (
    <Page $fontcolor1={fontColor1} $bgcolor={bgColorNew}>
      <Header>
        <HeaderLeft>
          <TokenIcons $bg={bgColorBox} $border={borderColorBox} $fc={fontColor1}>
            <div>cb</div>
            <div>W</div>
          </TokenIcons>
          <HeaderTitle $fc={fontColor1} $muted={fontColor3}>
            Concentrated Liquidity
            <span className="dot">•</span>
            <span className="muted">{VAULT.protocol}</span>
            <span className="dot">•</span>
            {VAULT.pair.token0}/{VAULT.pair.token1}
            <span className="muted"> {VAULT.feeTier}</span>
          </HeaderTitle>
          <HeaderSubtitle $muted={fontColor3}>
            Auto-rebalanced range around current price.
          </HeaderSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <Chip $bg={bgColorBox} $border={borderColorBox} $fc={fontColor1}>
            APY 26.46%
          </Chip>
          <Chip $bg={bgColorBox} $border={borderColorBox} $fc={fontColor1}>
            TVL $24.99K
          </Chip>
          <Chip $bg={bgColorBox} $border={borderColorBox} $fc={fontColor1}>
            Network: Base
          </Chip>
        </HeaderRight>
      </Header>

      <Grid>
        <ColLeft>
          {/* Range strip */}
          <Card $bg={bgColorBox} $border={borderColorBox}>
            <CardHeader>
              <div>
                <CardTitle $fc={fontColor1}>Active Range</CardTitle>
                <CardSub $muted={fontColor3}>Position is concentrated within these price bounds.</CardSub>
              </div>
              <Badge $ok={VAULT.inRange}>{VAULT.inRange ? 'in range' : 'out of range'}</Badge>
            </CardHeader>
            <RangeBarOuter $bg={bgColorChart}>
              <RangeBarInner $leftPct={0} $rightPct={100} />
              <RangeMarker $pct={rangeMarkerPct} $color="#0e1530" $bg={bgColorBox} />
            </RangeBarOuter>
            <RangeLabels $muted={fontColor3}>
              <span>{VAULT.range.lower.toFixed(3)}</span>
              <span>{VAULT.range.upper.toFixed(3)}</span>
            </RangeLabels>
            <RangeNumbers $fc={fontColor1} $muted={fontColor3}>
              <strong>{VAULT.range.lower.toFixed(3)} – {VAULT.range.upper.toFixed(3)} {VAULT.rangeUnit}</strong>
              <span className="muted">currently</span>
              <strong>{VAULT.range.current.toFixed(3)}</strong>
            </RangeNumbers>
            <Footnote $muted={fontColor3}>Last rebalance: {VAULT.lastRebalance}.</Footnote>
          </Card>

          {/* Position composition */}
          <Card $bg={bgColorBox} $border={borderColorBox}>
            <CardHeader>
              <div>
                <CardTitle $fc={fontColor1}>Position Composition</CardTitle>
                <CardSub $muted={fontColor3}>Shows how price has drifted through the range.</CardSub>
              </div>
            </CardHeader>
            <CompositionRow $fc={fontColor1}>
              <span>{VAULT.composition.token0Pct}% {VAULT.pair.token0}</span>
              <span>{VAULT.composition.token1Pct}% {VAULT.pair.token1}</span>
            </CompositionRow>
            <CompositionBar $border={borderColorBox}>
              <CompositionFill $pct={VAULT.composition.token0Pct} $color="#5dcf46" />
              <CompositionFill $pct={VAULT.composition.token1Pct} $color="#9ad48a" />
            </CompositionBar>
            <KVList>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Vault holdings — {VAULT.pair.token0}</span>
                <span>{VAULT.composition.token0Amount}</span>
              </KVRow>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Vault holdings — {VAULT.pair.token1}</span>
                <span>{VAULT.composition.token1Amount}</span>
              </KVRow>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Your slice — shares</span>
                <span>{VAULT.userSlice.shares}</span>
              </KVRow>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Your slice — {VAULT.pair.token0} / {VAULT.pair.token1}</span>
                <span>{VAULT.userSlice.token0} / {VAULT.userSlice.token1}</span>
              </KVRow>
            </KVList>
          </Card>

          {/* Mechanics */}
          <Card $bg={bgColorBox} $border={borderColorBox}>
            <CardHeader>
              <CardTitle $fc={fontColor1}>How this vault works</CardTitle>
            </CardHeader>
            <Para $fc={fontColor1} $accent={fontColor1}>
              Your deposit lands in a <strong>concentrated liquidity position</strong> sitting tightly around the current
              price. Trading fees and <strong>AERO emissions auto-compound</strong> back into the same range — you do
              not need to claim or restake.
            </Para>
            <Para $fc={fontColor1} $accent={fontColor1}>
              When price drifts beyond the deviation trigger, the vault <strong>re-centers the range</strong> around the
              new spot. Rebalances are <strong>TWAP-gated</strong>, so a single block of price manipulation cannot trick
              the contract into swapping at a bad price.
            </Para>
            <KVList>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Fee tier</span>
                <span>{VAULT.feeTier}</span>
              </KVRow>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Rebalance cooldown</span>
                <span>{VAULT.params.rebalanceCooldown}</span>
              </KVRow>
            </KVList>
          </Card>

          {/* Range parameters (collapsed) */}
          <Card $bg={bgColorBox} $border={borderColorBox}>
            <CardHeader $clickable $noMargin={!paramsOpen} onClick={() => setParamsOpen(o => !o)}>
              <div>
                <CardTitle $fc={fontColor1}>Range parameters</CardTitle>
                <CardSub $muted={fontColor3}>Advanced — for the LP-curious.</CardSub>
              </div>
              <Caret $muted={fontColor3} $open={paramsOpen}>▼</Caret>
            </CardHeader>
            {paramsOpen && (
              <KVList>
                <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                  <span>Target width</span>
                  <span>{VAULT.params.targetWidth}</span>
                </KVRow>
                <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                  <span>Current width</span>
                  <span>{VAULT.params.currentWidth}</span>
                </KVRow>
                <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                  <span>Rebalance cooldown</span>
                  <span>{VAULT.params.rebalanceCooldown}</span>
                </KVRow>
                <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                  <span>Deviation trigger</span>
                  <span>{VAULT.params.deviationTrigger}</span>
                </KVRow>
                <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                  <span>TWAP window</span>
                  <span>{VAULT.params.twapWindow}</span>
                </KVRow>
                <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                  <span>Max swap per rebalance</span>
                  <span>{VAULT.params.maxSwap}</span>
                </KVRow>
                <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                  <span>Internal slippage cap</span>
                  <span>{VAULT.params.slippageBps}</span>
                </KVRow>
              </KVList>
            )}
          </Card>

          {/* Costs */}
          <Card $bg={bgColorBox} $border={borderColorBox}>
            <CardHeader>
              <CardTitle $fc={fontColor1}>Costs</CardTitle>
            </CardHeader>
            <KVList>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Vault fees — entry / exit</span>
                <span>{VAULT.costs.entryFee} / {VAULT.costs.exitFee}</span>
              </KVRow>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Profit share</span>
                <span>{VAULT.costs.profitShare}</span>
              </KVRow>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Typical interaction cost — both assets</span>
                <span>{VAULT.costs.balanced}</span>
              </KVRow>
              <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                <span>Typical interaction cost — single asset (via wrapper)</span>
                <span>{VAULT.costs.singleAsset}</span>
              </KVRow>
            </KVList>
            <Footnote $muted={fontColor3}>
              Per-rebalance swap slippage is borne by the vault and shows up as small share-price jitter, not as a
              per-user fee.
            </Footnote>
          </Card>
        </ColLeft>

        <ColRight>
          <Card $bg={bgColorBox} $border={borderColorBox}>
            <TabRow $border={borderColorBox}>
              <Tab
                $active={mode === 'deposit'}
                $fc={fontColor1}
                $muted={fontColor3}
                onClick={() => setMode('deposit')}
              >
                Deposit
              </Tab>
              <Tab
                $active={mode === 'withdraw'}
                $fc={fontColor1}
                $muted={fontColor3}
                onClick={() => setMode('withdraw')}
              >
                Withdraw
              </Tab>
            </TabRow>

            {mode === 'deposit' && (
              <>
                <FieldLabel $fc={fontColor1} $muted={fontColor3}>
                  <span>Amount {VAULT.pair.token0}</span>
                  <span className="bal">Balance: 0.00</span>
                </FieldLabel>
                <FieldBox $bg={bgColorChart} $border={borderColorBox}>
                  <Input
                    $fc={fontColor1}
                    $muted={fontColor8}
                    placeholder="0.0"
                    inputMode="decimal"
                    value={dep0}
                    onChange={e => setDep0(e.target.value)}
                  />
                  <TokenPill $bg={bgColorBox} $border={borderColorBox} $fc={fontColor1}>
                    {VAULT.pair.token0}
                  </TokenPill>
                </FieldBox>

                <FieldLabel $fc={fontColor1} $muted={fontColor3}>
                  <span>Amount {VAULT.pair.token1}</span>
                  <span className="bal">Balance: 0.00</span>
                </FieldLabel>
                <FieldBox $bg={bgColorChart} $border={borderColorBox}>
                  <Input
                    $fc={fontColor1}
                    $muted={fontColor8}
                    placeholder="0.0"
                    inputMode="decimal"
                    value={dep1}
                    onChange={e => setDep1(e.target.value)}
                  />
                  <TokenPill $bg={bgColorBox} $border={borderColorBox} $fc={fontColor1}>
                    {VAULT.pair.token1}
                  </TokenPill>
                </FieldBox>

                {parseFloat(dep0) > 0 && parseFloat(dep1) > 0 && (
                  <Hint $muted={fontColor3} $border={borderColorBox} $fc={fontColor1} $hover={hoverColorNew}>
                    <span>
                      Optimal ratio at current price: {Math.round(VAULT.optimalRatio.token0 * 100)}/
                      {Math.round(VAULT.optimalRatio.token1 * 100)}
                    </span>
                    <button type="button" onClick={balance}>
                      Balance
                    </button>
                  </Hint>
                )}

                {depRoute && (
                  <>
                    <RouteNote $muted={fontColor3}>{depRoute.label}</RouteNote>
                    <Preview $bg={bgColorChart} $border={borderColorBox} $fc={fontColor1} $muted={fontColor3}>
                      <div>
                        <span className="muted">Expected shares</span>
                        <span className="val">~ 0.0000 fcl-{VAULT.pair.token0}-{VAULT.pair.token1}</span>
                      </div>
                      <div>
                        <span className="muted">Value (in {depRoute.kind === 't1' ? VAULT.pair.token1 : VAULT.pair.token0})</span>
                        <span className="val">~ 0.0000</span>
                      </div>
                      {depRoute.kind === 'both' && (
                        <div>
                          <span className="muted">Leftover refund</span>
                          <span className="val">~ 0.000 of {VAULT.pair.token0} (non-optimal ratio)</span>
                        </div>
                      )}
                      {depRoute.kind !== 'both' && (
                        <div>
                          <span className="muted">Internal swap cost</span>
                          <span className="val">~ 22 bps</span>
                        </div>
                      )}
                    </Preview>
                  </>
                )}

                <Slippage $muted={fontColor3} $border={borderColorBox} $bg={bgColorChart} $fc={fontColor1}>
                  <span>Slippage tolerance (_minOut)</span>
                  <div>
                    {[0.1, 0.5, 1.0].map(s => (
                      <button
                        key={s}
                        type="button"
                        className={slip === s ? 'active' : ''}
                        onClick={() => setSlip(s)}
                      >
                        {s}%
                      </button>
                    ))}
                  </div>
                </Slippage>

                <Cta type="button" disabled={!depRoute}>
                  {depRoute ? 'Connect Wallet to Deposit' : 'Enter an amount'}
                </Cta>
              </>
            )}

            {mode === 'withdraw' && (
              <>
                <FieldLabel $fc={fontColor1} $muted={fontColor3}>
                  <span>Shares to withdraw</span>
                  <span className="bal">Balance: {VAULT.userSlice.shares}</span>
                </FieldLabel>
                <FieldBox $bg={bgColorChart} $border={borderColorBox}>
                  <Input
                    $fc={fontColor1}
                    $muted={fontColor8}
                    placeholder="0.0"
                    inputMode="decimal"
                    value={shares}
                    onChange={e => setShares(e.target.value)}
                  />
                  <TokenPill $bg={bgColorBox} $border={borderColorBox} $fc={fontColor1}>
                    fcl-{VAULT.pair.token0}-{VAULT.pair.token1}
                  </TokenPill>
                </FieldBox>

                <FieldLabel $fc={fontColor1} $muted={fontColor3}>
                  <span>Receive</span>
                </FieldLabel>
                <OutputGroup>
                  <OutputOpt
                    $active={output === 't0'}
                    $bg={bgColorChart}
                    $border={borderColorBox}
                    $fc={fontColor1}
                    onClick={() => setOutput('t0')}
                  >
                    {VAULT.pair.token0} only
                  </OutputOpt>
                  <OutputOpt
                    $active={output === 't1'}
                    $bg={bgColorChart}
                    $border={borderColorBox}
                    $fc={fontColor1}
                    onClick={() => setOutput('t1')}
                  >
                    {VAULT.pair.token1} only
                  </OutputOpt>
                  <OutputOpt
                    $active={output === 'both'}
                    $bg={bgColorChart}
                    $border={borderColorBox}
                    $fc={fontColor1}
                    onClick={() => setOutput('both')}
                  >
                    Both
                  </OutputOpt>
                </OutputGroup>

                <RouteNote $muted={fontColor3}>{wRoute}</RouteNote>
                <Preview $bg={bgColorChart} $border={borderColorBox} $fc={fontColor1} $muted={fontColor3}>
                  {output === 'both' ? (
                    <>
                      <div>
                        <span className="muted">Predicted output — {VAULT.pair.token0}</span>
                        <span className="val">~ 0.0000</span>
                      </div>
                      <div>
                        <span className="muted">Predicted output — {VAULT.pair.token1}</span>
                        <span className="val">~ 0.0000</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="muted">
                          Predicted output — {output === 't0' ? VAULT.pair.token0 : VAULT.pair.token1}
                        </span>
                        <span className="val">~ 0.0000</span>
                      </div>
                      <div>
                        <span className="muted">Internal swap cost</span>
                        <span className="val">~ 22 bps</span>
                      </div>
                    </>
                  )}
                </Preview>

                <Slippage $muted={fontColor3} $border={borderColorBox} $bg={bgColorChart} $fc={fontColor1}>
                  <span>
                    Slippage tolerance ({output === 'both' ? 'amount0OutMin / amount1OutMin' : '_minOut'})
                  </span>
                  <div>
                    {[0.1, 0.5, 1.0].map(s => (
                      <button
                        key={s}
                        type="button"
                        className={slip === s ? 'active' : ''}
                        onClick={() => setSlip(s)}
                      >
                        {s}%
                      </button>
                    ))}
                  </div>
                </Slippage>

                <Cta type="button" disabled={!parseFloat(shares)}>
                  {parseFloat(shares) ? 'Connect Wallet to Withdraw' : 'Enter share amount'}
                </Cta>
              </>
            )}
          </Card>
        </ColRight>
      </Grid>

    </Page>
  )
}

export default CLVault
