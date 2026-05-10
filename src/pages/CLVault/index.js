import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useThemeContext } from '../../providers/useThemeContext'
import {
  DetailView,
  Inner,
  TopInner,
  TopPart,
  TopButton,
  BackBtnRect,
  BackText,
  TopLogo,
  TopDesc,
  FlexDiv,
  FlexTopDiv,
  BigDiv,
  GuideSection,
  GuidePart,
  TabRow,
  MainTagPanel,
  MainTag,
  MainSection,
  RestContent,
  HalfContent,
  MyBalance,
  ManageBoxWrapper,
  BoxCover,
  NewLabel,
  EarningsBadge,
  FirstPartSection,
  HalfInfo,
  SwitchTabTag,
} from '../AdvancedFarm/style'
import {
  Badge,
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
  Card,
  CardHeader,
  CardTitle,
  CardSub,
  ChartPlaceholder,
} from './style'

const VAULT = {
  protocol: 'Aerodrome',
  pair: { token0: 'cbETH', token1: 'WETH' },
  feeTier: '1-tick',
  apy: '26.46%',
  tvl: '$24.99K',
  network: 'Base',
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

const TokenCircle = ({ children, bg, fc, border, overlap }) => (
  <div
    style={{
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: bg,
      border: `3px solid ${border}`,
      color: fc,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 13,
      marginRight: overlap ? -18 : 0,
      zIndex: overlap ? 1 : 2,
      flexShrink: 0,
    }}
  >
    {children}
  </div>
)

const CLVault = () => {
  const {
    darkMode,
    bgColorNew,
    bgColorBox,
    bgColorChart,
    fontColor1,
    fontColor2,
    fontColor3,
    fontColor4,
    fontColor8,
    borderColorBox,
    hoverColorNew,
    activeColorNew,
  } = useThemeContext()

  const navigate = useNavigate()

  const [activeMainTag, setActiveMainTag] = useState(0)
  const [activeDepoTab, setActiveDepoTab] = useState(0) // 0 = Supply, 1 = Revert
  const [paramsOpen, setParamsOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)

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
    if (a0 && a1) return { label: 'Routed via CLVault.deposit (both assets)', kind: 'both' }
    if (a0) return { label: `Routed via CLWrapper(${VAULT.pair.token0}) — single asset`, kind: 't0' }
    if (a1) return { label: `Routed via CLWrapper(${VAULT.pair.token1}) — single asset`, kind: 't1' }
    return null
  }, [dep0, dep1])

  const wRoute = useMemo(() => {
    if (output === 'both')
      return `Routed via CLVault.withdraw — receive ${VAULT.pair.token0} + ${VAULT.pair.token1}`
    if (output === 't0') return `Routed via CLWrapper(${VAULT.pair.token0}) — receive ${VAULT.pair.token0} only`
    return `Routed via CLWrapper(${VAULT.pair.token1}) — receive ${VAULT.pair.token1} only`
  }, [output])

  const balance = () => {
    const total = parseFloat(dep0) || parseFloat(dep1) || 0
    if (!total) return
    setDep0((total * VAULT.optimalRatio.token0).toFixed(4))
    setDep1((total * VAULT.optimalRatio.token1).toFixed(4))
  }

  const supplyDisabled = !depRoute || !agreed
  const withdrawDisabled = !parseFloat(shares)

  return (
    <DetailView $backcolor={bgColorNew} $fontcolor={fontColor1}>
      <TopInner $darkmode={darkMode}>
        <TopPart>
          <FlexTopDiv>
            <TopButton>
              <BackBtnRect onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <BsArrowLeft fontSize={20} />
                <BackText>Back</BackText>
              </BackBtnRect>
            </TopButton>

            <FlexDiv className="farm-symbol">
              <TopLogo style={{ display: 'flex', alignItems: 'center' }}>
                <TokenCircle bg="#1652f0" fc="#fff" border={bgColorBox} overlap>
                  cb
                </TokenCircle>
                <TokenCircle bg="#627eea" fc="#fff" border={bgColorBox}>
                  Ξ
                </TokenCircle>
              </TopLogo>
              <TopDesc
                $weight={600}
                $fontcolor2={fontColor2}
                $size="25px"
                $height="82px"
                $marginbottom="10px"
              >
                Concentrated Liquidity • {VAULT.protocol} • {VAULT.pair.token0}/{VAULT.pair.token1}{' '}
                <span style={{ fontWeight: 500, color: fontColor3 }}>{VAULT.feeTier}</span>
              </TopDesc>
            </FlexDiv>

            <NewLabel
              $size="14px"
              $weight="500"
              $height="20px"
              $fontcolor={fontColor3}
              style={{ marginBottom: 12 }}
            >
              Auto-rebalanced range around current price.
            </NewLabel>

            <GuideSection>
              <GuidePart $backcolor={bgColorBox} $fontcolor4={fontColor4}>
                {VAULT.apy} APY
              </GuidePart>
              <GuidePart $backcolor={bgColorBox} $fontcolor4={fontColor4}>
                {VAULT.tvl} TVL
              </GuidePart>
              <GuidePart $backcolor={bgColorBox} $fontcolor4={fontColor4}>
                Network: {VAULT.network}
              </GuidePart>
              <GuidePart $backcolor={bgColorBox} $fontcolor4={fontColor4}>
                Platform: {VAULT.protocol}
              </GuidePart>
            </GuideSection>
          </FlexTopDiv>
        </TopPart>

        <TopPart>
          <TabRow style={{ width: '100%' }}>
            <MainTagPanel>
              {['Manage', 'Details', 'History'].map((name, i) => (
                <MainTag
                  key={name}
                  $threetabs
                  $active={activeMainTag === i ? 'true' : 'false'}
                  $backcolor={bgColorNew}
                  $fontcolor3={fontColor3}
                  $fontcolor4={fontColor4}
                  $mode={darkMode ? 'dark' : 'light'}
                  onClick={() => setActiveMainTag(i)}
                >
                  <p>{name}</p>
                </MainTag>
              ))}
            </MainTagPanel>
          </TabRow>
        </TopPart>
      </TopInner>

      <Inner $backcolor={bgColorNew}>
        <BigDiv>
          {activeMainTag === 0 && (
            <FirstPartSection>
              <BoxCover $bordercolor={borderColorBox}>
                <ManageBoxWrapper>
                  <MainSection>
                    {/* Top three panels: Lifetime Yield / Total Balance / Yield Estimates */}
                    <ManageBoxWrapper style={{ marginBottom: 25 }}>
                      <MyBalance
                        $backcolor={bgColorBox}
                        $bordercolor={borderColorBox}
                        $marginbottom="0"
                        $height="120px"
                      >
                        <NewLabel
                          $display="flex"
                          $justifycontent="space-between"
                          $size="12px"
                          $weight="600"
                          $height="20px"
                          $fontcolor={fontColor4}
                          $padding="10px 15px"
                          $borderbottom={`1px solid ${borderColorBox}`}
                        >
                          <FlexDiv>
                            Lifetime Yield <EarningsBadge>Beta</EarningsBadge>
                          </FlexDiv>
                        </NewLabel>
                        <FlexDiv style={{ justifyContent: 'space-between', padding: '12px 15px' }}>
                          <span style={{ fontSize: 12, color: fontColor3 }}>in USD</span>
                          <span style={{ fontSize: 14, color: fontColor1, fontWeight: 600 }}>$0</span>
                        </FlexDiv>
                        <FlexDiv style={{ justifyContent: 'space-between', padding: '0 15px 12px' }}>
                          <span style={{ fontSize: 12, color: fontColor3 }}>Underlying</span>
                          <span style={{ fontSize: 14, color: fontColor1, fontWeight: 600 }}>
                            0 <span style={{ color: fontColor3, fontWeight: 500 }}>SHARES</span>
                          </span>
                        </FlexDiv>
                      </MyBalance>

                      <MyBalance
                        $backcolor={bgColorBox}
                        $bordercolor={borderColorBox}
                        $marginbottom="0"
                        $height="120px"
                      >
                        <NewLabel
                          $size="12px"
                          $weight="600"
                          $height="20px"
                          $fontcolor={fontColor4}
                          $padding="10px 15px"
                          $borderbottom={`1px solid ${borderColorBox}`}
                        >
                          Total Balance
                        </NewLabel>
                        <FlexDiv style={{ justifyContent: 'space-between', padding: '12px 15px' }}>
                          <span style={{ fontSize: 12, color: fontColor3 }}>in USD</span>
                          <span style={{ fontSize: 14, color: fontColor1, fontWeight: 600 }}>$0.00</span>
                        </FlexDiv>
                        <FlexDiv style={{ justifyContent: 'space-between', padding: '0 15px 12px' }}>
                          <span style={{ fontSize: 12, color: fontColor3 }}>fToken</span>
                          <span style={{ fontSize: 14, color: fontColor1, fontWeight: 600 }}>
                            0{' '}
                            <span style={{ color: fontColor3, fontWeight: 500, fontSize: 11 }}>
                              fcl_{VAULT.pair.token0}_{VAULT.pair.token1}
                            </span>
                          </span>
                        </FlexDiv>
                      </MyBalance>

                      <MyBalance
                        $backcolor={bgColorBox}
                        $bordercolor={borderColorBox}
                        $marginbottom="0"
                        $height="120px"
                      >
                        <NewLabel
                          $size="12px"
                          $weight="600"
                          $height="20px"
                          $fontcolor={fontColor4}
                          $padding="10px 15px"
                          $borderbottom={`1px solid ${borderColorBox}`}
                        >
                          Yield Estimates
                        </NewLabel>
                        <FlexDiv style={{ justifyContent: 'space-between', padding: '12px 15px' }}>
                          <span style={{ fontSize: 12, color: fontColor3 }}>Daily</span>
                          <span style={{ fontSize: 14, color: fontColor1, fontWeight: 600 }}>$0</span>
                        </FlexDiv>
                        <FlexDiv style={{ justifyContent: 'space-between', padding: '0 15px 12px' }}>
                          <span style={{ fontSize: 12, color: fontColor3 }}>Monthly</span>
                          <span style={{ fontSize: 14, color: fontColor1, fontWeight: 600 }}>$0.00</span>
                        </FlexDiv>
                      </MyBalance>
                    </ManageBoxWrapper>

                    {/* CL: Range strip */}
                    <Card $bg={bgColorBox} $border={borderColorBox} style={{ marginBottom: 20 }}>
                      <CardHeader>
                        <div>
                          <CardTitle $fc={fontColor1}>Active Range</CardTitle>
                          <CardSub $muted={fontColor3}>
                            Position is concentrated within these price bounds.
                          </CardSub>
                        </div>
                        <Badge $ok={VAULT.inRange}>
                          {VAULT.inRange ? 'in range' : 'out of range'}
                        </Badge>
                      </CardHeader>
                      <RangeBarOuter $bg={bgColorChart}>
                        <RangeBarInner $leftPct={0} $rightPct={100} />
                        <RangeMarker $pct={rangeMarkerPct} $color={fontColor1} $bg={bgColorBox} />
                      </RangeBarOuter>
                      <RangeLabels $muted={fontColor3}>
                        <span>{VAULT.range.lower.toFixed(3)}</span>
                        <span>{VAULT.range.upper.toFixed(3)}</span>
                      </RangeLabels>
                      <RangeNumbers $fc={fontColor1} $muted={fontColor3}>
                        <strong>
                          {VAULT.range.lower.toFixed(3)} – {VAULT.range.upper.toFixed(3)}{' '}
                          {VAULT.rangeUnit}
                        </strong>
                        <span className="muted">currently</span>
                        <strong>{VAULT.range.current.toFixed(3)}</strong>
                      </RangeNumbers>
                      <Footnote $muted={fontColor3}>Last rebalance: {VAULT.lastRebalance}.</Footnote>
                    </Card>

                    {/* CL: Position composition */}
                    <Card $bg={bgColorBox} $border={borderColorBox} style={{ marginBottom: 25 }}>
                      <CardHeader>
                        <div>
                          <CardTitle $fc={fontColor1}>Position Composition</CardTitle>
                          <CardSub $muted={fontColor3}>
                            How price has drifted through the range.
                          </CardSub>
                        </div>
                      </CardHeader>
                      <CompositionRow $fc={fontColor1}>
                        <span>
                          {VAULT.composition.token0Pct}% {VAULT.pair.token0}
                        </span>
                        <span>
                          {VAULT.composition.token1Pct}% {VAULT.pair.token1}
                        </span>
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
                          <span>
                            Your slice — {VAULT.pair.token0} / {VAULT.pair.token1}
                          </span>
                          <span>
                            {VAULT.userSlice.token0} / {VAULT.userSlice.token1}
                          </span>
                        </KVRow>
                      </KVList>
                    </Card>

                    {/* Chart placeholder (replaces FarmDetailChart / UserBalanceData) */}
                    <HalfInfo
                      $backcolor={bgColorBox}
                      $bordercolor={borderColorBox}
                      $marginbottom="25px"
                      $padding="20px"
                    >
                      <FlexDiv style={{ justifyContent: 'space-between', marginBottom: 14 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#5dcf46' }}>
                          USD Balance
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#7d68d3' }}>
                          Underlying Balance
                        </span>
                      </FlexDiv>
                      <ChartPlaceholder $bg={bgColorChart} $muted={fontColor3}>
                        Connect wallet to see your balance chart
                      </ChartPlaceholder>
                    </HalfInfo>

                    {/* CL: Mechanics */}
                    <Card $bg={bgColorBox} $border={borderColorBox} style={{ marginBottom: 20 }}>
                      <CardHeader>
                        <CardTitle $fc={fontColor1}>How this vault works</CardTitle>
                      </CardHeader>
                      <Para $fc={fontColor1} $accent={fontColor1}>
                        Your deposit lands in a <strong>concentrated liquidity position</strong>{' '}
                        sitting tightly around the current price. Trading fees and{' '}
                        <strong>AERO emissions auto-compound</strong> back into the same range — you
                        do not need to claim or restake.
                      </Para>
                      <Para $fc={fontColor1} $accent={fontColor1}>
                        When price drifts beyond the deviation trigger, the vault{' '}
                        <strong>re-centers the range</strong> around the new spot. Rebalances are{' '}
                        <strong>TWAP-gated</strong>, so a single block of price manipulation cannot
                        trick the contract into swapping at a bad price.
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

                    {/* CL: Range parameters (collapsed) */}
                    <Card $bg={bgColorBox} $border={borderColorBox} style={{ marginBottom: 20 }}>
                      <CardHeader
                        $clickable
                        $noMargin={!paramsOpen}
                        onClick={() => setParamsOpen(o => !o)}
                      >
                        <div>
                          <CardTitle $fc={fontColor1}>Range parameters</CardTitle>
                          <CardSub $muted={fontColor3}>Advanced — for the LP-curious.</CardSub>
                        </div>
                        <Caret $muted={fontColor3} $open={paramsOpen}>
                          ▼
                        </Caret>
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

                    {/* CL: Costs */}
                    <Card $bg={bgColorBox} $border={borderColorBox} style={{ marginBottom: 0 }}>
                      <CardHeader>
                        <CardTitle $fc={fontColor1}>Costs</CardTitle>
                      </CardHeader>
                      <KVList>
                        <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>Vault fees — entry / exit</span>
                          <span>
                            {VAULT.costs.entryFee} / {VAULT.costs.exitFee}
                          </span>
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
                          <span>Typical interaction cost — single asset</span>
                          <span>{VAULT.costs.singleAsset}</span>
                        </KVRow>
                      </KVList>
                      <Footnote $muted={fontColor3}>
                        Per-rebalance swap slippage is borne by the vault and shows up as small
                        share-price jitter, not as a per-user fee.
                      </Footnote>
                    </Card>
                  </MainSection>

                  <RestContent>
                    <HalfContent
                      $backcolor={bgColorBox}
                      $bordercolor={borderColorBox}
                      $padding="20px"
                      style={{
                        background: bgColorBox,
                        border: `2px solid ${borderColorBox}`,
                        borderRadius: 12,
                        padding: 20,
                      }}
                    >
                      <NewLabel
                        $bgcolor={bgColorChart}
                        $size="16px"
                        $height="24px"
                        $weight="600"
                        $fontcolor={fontColor1}
                        $display="flex"
                        $justifycontent="center"
                        $padding="4px 0"
                        $marginbottom="20px"
                        $border={`1.3px solid ${borderColorBox}`}
                        $borderradius="8px"
                        style={{
                          background: bgColorChart,
                          border: `1.3px solid ${borderColorBox}`,
                          borderRadius: 8,
                          padding: 4,
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: 20,
                        }}
                      >
                        <SwitchTabTag
                          onClick={() => setActiveDepoTab(0)}
                          $fontcolor={activeDepoTab === 0 ? fontColor4 : fontColor3}
                          $backcolor={activeDepoTab === 0 ? activeColorNew : ''}
                          $boxshadow={
                            activeDepoTab === 0 ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none'
                          }
                        >
                          <p>↓ Supply</p>
                        </SwitchTabTag>
                        <SwitchTabTag
                          onClick={() => setActiveDepoTab(1)}
                          $fontcolor={activeDepoTab === 1 ? fontColor4 : fontColor3}
                          $backcolor={activeDepoTab === 1 ? activeColorNew : ''}
                          $boxshadow={
                            activeDepoTab === 1 ? '0px 1px 2px rgba(16, 24, 40, 0.05)' : 'none'
                          }
                        >
                          <p>↑ Revert</p>
                        </SwitchTabTag>
                      </NewLabel>

                      {activeDepoTab === 0 ? (
                        <>
                          <NewLabel
                            $size="13px"
                            $weight="500"
                            $height="20px"
                            $fontcolor={fontColor3}
                            style={{ marginBottom: 12 }}
                          >
                            Supply your crypto into interest-bearing fTokens.
                          </NewLabel>

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
                            <Hint
                              $muted={fontColor3}
                              $border={borderColorBox}
                              $fc={fontColor1}
                              $hover={hoverColorNew}
                            >
                              <span>
                                Optimal ratio at current price:{' '}
                                {Math.round(VAULT.optimalRatio.token0 * 100)}/
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
                              <Preview
                                $bg={bgColorChart}
                                $border={borderColorBox}
                                $fc={fontColor1}
                                $muted={fontColor3}
                              >
                                <div>
                                  <span className="muted">Expected shares</span>
                                  <span className="val">
                                    ~ 0.0000 fcl-{VAULT.pair.token0}-{VAULT.pair.token1}
                                  </span>
                                </div>
                                <div>
                                  <span className="muted">
                                    Value (in{' '}
                                    {depRoute.kind === 't1' ? VAULT.pair.token1 : VAULT.pair.token0})
                                  </span>
                                  <span className="val">~ 0.0000</span>
                                </div>
                                {depRoute.kind === 'both' ? (
                                  <div>
                                    <span className="muted">Leftover refund</span>
                                    <span className="val">
                                      ~ 0.000 of {VAULT.pair.token0} (non-optimal ratio)
                                    </span>
                                  </div>
                                ) : (
                                  <div>
                                    <span className="muted">Internal swap cost</span>
                                    <span className="val">~ 22 bps</span>
                                  </div>
                                )}
                              </Preview>
                            </>
                          )}

                          <Slippage
                            $muted={fontColor3}
                            $border={borderColorBox}
                            $bg={bgColorChart}
                            $fc={fontColor1}
                          >
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

                          <label
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 8,
                              fontSize: 12,
                              lineHeight: 1.4,
                              color: fontColor3,
                              marginBottom: 14,
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={agreed}
                              onChange={e => setAgreed(e.target.checked)}
                              style={{ marginTop: 3 }}
                            />
                            <span>
                              I confirm that I have read and understand the product, have read the{' '}
                              <a
                                href="https://docs.harvest.finance/legal/risk-disclosures"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#5dcf46', fontWeight: 600 }}
                              >
                                Risk Disclosures
                              </a>
                              , and agree to the{' '}
                              <a
                                href="https://docs.harvest.finance/legal/terms-and-conditions"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#5dcf46', fontWeight: 600 }}
                              >
                                Terms and Conditions
                              </a>
                              .
                            </span>
                          </label>

                          <Cta type="button" disabled={supplyDisabled}>
                            {!depRoute
                              ? 'Enter an amount'
                              : !agreed
                                ? 'Agree to terms above'
                                : 'Connect Wallet to Get Started'}
                          </Cta>
                        </>
                      ) : (
                        <>
                          <NewLabel
                            $size="13px"
                            $weight="500"
                            $height="20px"
                            $fontcolor={fontColor3}
                            style={{ marginBottom: 12 }}
                          >
                            Withdraw your shares back to {VAULT.pair.token0} or {VAULT.pair.token1}.
                          </NewLabel>

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
                          <Preview
                            $bg={bgColorChart}
                            $border={borderColorBox}
                            $fc={fontColor1}
                            $muted={fontColor3}
                          >
                            {output === 'both' ? (
                              <>
                                <div>
                                  <span className="muted">
                                    Predicted output — {VAULT.pair.token0}
                                  </span>
                                  <span className="val">~ 0.0000</span>
                                </div>
                                <div>
                                  <span className="muted">
                                    Predicted output — {VAULT.pair.token1}
                                  </span>
                                  <span className="val">~ 0.0000</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <span className="muted">
                                    Predicted output —{' '}
                                    {output === 't0' ? VAULT.pair.token0 : VAULT.pair.token1}
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

                          <Slippage
                            $muted={fontColor3}
                            $border={borderColorBox}
                            $bg={bgColorChart}
                            $fc={fontColor1}
                          >
                            <span>
                              Slippage tolerance (
                              {output === 'both' ? 'amount0OutMin / amount1OutMin' : '_minOut'})
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

                          <Cta type="button" disabled={withdrawDisabled}>
                            {withdrawDisabled ? 'Enter share amount' : 'Connect Wallet to Withdraw'}
                          </Cta>
                        </>
                      )}
                    </HalfContent>
                  </RestContent>
                </ManageBoxWrapper>
              </BoxCover>
            </FirstPartSection>
          )}

          {activeMainTag === 1 && (
            <FirstPartSection>
              <HalfInfo
                $backcolor={bgColorBox}
                $bordercolor={borderColorBox}
                $marginbottom="25px"
                $padding="40px"
              >
                <NewLabel $size="16px" $height="24px" $weight="600" $fontcolor={fontColor1}>
                  Vault Details
                </NewLabel>
                <NewLabel
                  $size="13px"
                  $weight="500"
                  $height="20px"
                  $fontcolor={fontColor3}
                  style={{ marginTop: 8 }}
                >
                  Strategy contract, underlying protocol breakdown, audits and on-chain links will
                  appear here. Connect a wallet to load live data.
                </NewLabel>
              </HalfInfo>
            </FirstPartSection>
          )}

          {activeMainTag === 2 && (
            <FirstPartSection>
              <HalfInfo
                $backcolor={bgColorBox}
                $bordercolor={borderColorBox}
                $marginbottom="25px"
                $padding="40px"
              >
                <NewLabel $size="16px" $height="24px" $weight="600" $fontcolor={fontColor1}>
                  History
                </NewLabel>
                <NewLabel
                  $size="13px"
                  $weight="500"
                  $height="20px"
                  $fontcolor={fontColor3}
                  style={{ marginTop: 8 }}
                >
                  Per-rebalance log, harvested rewards, and historical share-price jitter will
                  appear here once a wallet is connected.
                </NewLabel>
              </HalfInfo>
            </FirstPartSection>
          )}
        </BigDiv>
      </Inner>

    </DetailView>
  )
}

export default CLVault
