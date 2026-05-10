import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { PiQuestion } from 'react-icons/pi'
import { IoCloseOutline } from 'react-icons/io5'
import { Tooltip } from 'react-tooltip'
import { useThemeContext } from '../../providers/useThemeContext'
import Safe from '../../assets/images/logos/beginners/safe.svg'
import BarChart from '../../assets/images/logos/beginners/bar-chart-01.svg'
import HistoryIcon from '../../assets/images/logos/beginners/history.svg'
import BaseChainIcon from '../../assets/images/chains/base.svg'
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
  NetDetail,
  NetDetailItem,
  NetDetailTitle,
  NetDetailContent,
  NetDetailImg,
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
  ChartHeader,
  ChartHeaderCol,
  ChartLabel,
  ChartMeta,
  ChartFrame,
  AxisYLeft,
  AxisYRight,
  AxisX,
  ChartCenterText,
  RangeBtnRow,
  RangeBtn,
  TopBoxRow,
  TopBox,
  TopBoxTitle,
  TopBoxValue,
  DetailsGrid,
  DetailsCol,
  SectionTitle,
  InfoRow,
  SourceText,
  AddressBtnRow,
  AddressBtn,
  TipBox,
  TipBoxIcon,
  TipBoxText,
  FormRow,
} from './style'

const VAULT = {
  protocol: 'Aerodrome',
  pair: { token0: 'cbETH', token1: 'WETH' },
  feeTier: '1-tick',
  apy: '26.46%',
  tvl: '$24.99K',
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
    profitShare: '10%',
    balanced: '~12 bps',
    singleAsset: '~28 bps',
  },
  optimalRatio: { token0: 0.62, token1: 0.38 },
  details: {
    operatingSince: 'Mar 14 2025',
    operatingDays: 57,
    sharePrice: '1.00428',
    apy: { live: '26.46%', d7: '24.91%', d30: '22.40%', d180: '—', d365: '—', lifetime: '23.85%' },
  },
}

const TokenCircle = ({ children, bg, fc, border, overlap }) => (
  <div
    style={{
      width: 69,
      height: 69,
      borderRadius: '50%',
      background: bg,
      border: `3px solid ${border}`,
      color: fc,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 18,
      marginRight: overlap ? -20 : 0,
      zIndex: overlap ? 1 : 2,
      flexShrink: 0,
      boxShadow: '0 1px 2px rgba(16,24,40,0.06)',
    }}
  >
    {children}
  </div>
)

const TAB_DEFS = [
  { name: 'Manage', img: Safe },
  { name: 'Details', img: BarChart },
  { name: 'History', img: HistoryIcon },
]

const TIME_RANGES = ['Custom', '1D', '1W', '1M', 'ALL', 'LAST']

const Question = ({ id, content, dark }) => (
  <>
    <PiQuestion
      className="question"
      data-tip
      id={id}
      style={{ cursor: 'pointer', flexShrink: 0, fontSize: 14, marginLeft: 4 }}
    />
    <Tooltip
      id={id}
      anchorSelect={`#${id}`}
      backgroundColor={dark ? 'white' : '#101828'}
      borderColor={dark ? 'white' : 'black'}
      textColor={dark ? 'black' : 'white'}
      style={{ maxWidth: 260, fontSize: 12, lineHeight: 1.4 }}
    >
      {content}
    </Tooltip>
  </>
)

const CLVault = () => {
  const {
    darkMode,
    bgColorNew,
    bgColorBox,
    bgColorChart,
    fontColor,
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
  const [activeDepoTab, setActiveDepoTab] = useState(0)
  const [paramsOpen, setParamsOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [chartRange, setChartRange] = useState('LAST')
  const [detailRange, setDetailRange] = useState('1Y')
  const [showTip, setShowTip] = useState(true)

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

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const renderBalanceChart = () => (
    <HalfInfo
      $backcolor={bgColorBox}
      $bordercolor={borderColorBox}
      $marginbottom="0"
      $padding="20px"
    >
      <ChartHeader>
        <ChartHeaderCol>
          <ChartLabel $color="#5dcf46">USD Balance</ChartLabel>
          <ChartMeta $muted={fontColor3} $fc={fontColor1}>
            {today} <strong>$0.00</strong>
          </ChartMeta>
        </ChartHeaderCol>
        <ChartHeaderCol style={{ alignItems: 'flex-end' }}>
          <ChartLabel $color="#7d68d3">Underlying Balance</ChartLabel>
          <ChartMeta $muted={fontColor3} $fc={fontColor1}>
            <strong>0</strong>
          </ChartMeta>
        </ChartHeaderCol>
      </ChartHeader>
      <ChartFrame $bg={bgColorChart}>
        <AxisYLeft $muted={fontColor3}>
          <span>$1.08</span>
          <span>$0.88</span>
          <span>$0.49</span>
          <span>$0.30</span>
        </AxisYLeft>
        <AxisYRight $muted={fontColor3}>
          <span>0.00023</span>
          <span>0.00022</span>
          <span>0.00021</span>
          <span>0.00020</span>
        </AxisYRight>
        <AxisX $muted={fontColor3}>
          <span>5/14</span>
          <span>9/23</span>
          <span>2/5</span>
          <span>6/17</span>
          <span>10/26</span>
          <span>5/10</span>
        </AxisX>
        <ChartCenterText $muted={fontColor3}>Connect wallet to see your balance chart</ChartCenterText>
      </ChartFrame>
      <RangeBtnRow>
        {TIME_RANGES.map(r => (
          <RangeBtn
            key={r}
            type="button"
            $active={chartRange === r}
            $muted={fontColor3}
            $fc={fontColor1}
            onClick={() => setChartRange(r)}
          >
            {r}
          </RangeBtn>
        ))}
      </RangeBtnRow>
    </HalfInfo>
  )

  return (
    <DetailView $backcolor={bgColorNew} $fontcolor={fontColor1}>
      <TopInner $darkmode={darkMode}>
        <TopPart>
          <FlexTopDiv>
            <TopButton className="back-btn">
              <BackBtnRect $fontcolor={fontColor} onClick={() => navigate('/')}>
                <BiLeftArrowAlt fontSize={16} />
                <BackText $fontcolor={fontColor}>Back</BackText>
              </BackBtnRect>
            </TopButton>

            <FlexDiv className="farm-symbol">
              <TopLogo>
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

            <GuideSection>
              <GuidePart $backcolor={bgColorBox} $fontcolor4={fontColor4}>
                {VAULT.apy} APY
              </GuidePart>
              <GuidePart $backcolor={bgColorBox} $fontcolor4={fontColor4}>
                {VAULT.tvl} TVL
              </GuidePart>
            </GuideSection>

            <TabRow>
              <MainTagPanel>
                {TAB_DEFS.map((tag, i) => (
                  <MainTag
                    key={tag.name}
                    $threetabs
                    $active={activeMainTag === i ? 'true' : 'false'}
                    $backcolor={bgColorNew}
                    $fontcolor3={fontColor3}
                    $fontcolor4={fontColor4}
                    $mode={darkMode ? 'dark' : 'light'}
                    onClick={() => setActiveMainTag(i)}
                  >
                    <img src={tag.img} alt="" />
                    <p>{tag.name}</p>
                  </MainTag>
                ))}
              </MainTagPanel>
              <NetDetail>
                <NetDetailItem>
                  <NetDetailTitle $fontcolor={fontColor}>Platform:</NetDetailTitle>
                  <NetDetailContent $fontcolor={fontColor}>{VAULT.protocol}</NetDetailContent>
                </NetDetailItem>
                <NetDetailItem>
                  <NetDetailTitle $fontcolor={fontColor}>Network</NetDetailTitle>
                  <NetDetailImg $fontcolor={fontColor}>
                    <img src={BaseChainIcon} alt="Base" />
                  </NetDetailImg>
                </NetDetailItem>
              </NetDetail>
            </TabRow>
          </FlexTopDiv>
        </TopPart>
      </TopInner>

      <Inner $backcolor={bgColorNew}>
        <BigDiv>
          {activeMainTag === 0 && (
            <FirstPartSection>
              <BoxCover $bordercolor={borderColorBox}>
                <ManageBoxWrapper>
                  <MainSection>
                    {/* Top three classic panels */}
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
                            <Question
                              id="cl-tooltip-lifetime"
                              dark={darkMode}
                              content="Your lifetime yield in this vault, expressed in USD and underlying token."
                            />
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
                            Total Balance
                            <Question
                              id="cl-tooltip-balance"
                              dark={darkMode}
                              content="Your share of the vault, in USD and as fTokens."
                            />
                          </FlexDiv>
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
                            Yield Estimates
                            <Question
                              id="cl-tooltip-estimates"
                              dark={darkMode}
                              content="Daily and monthly yield projections, based on current APY."
                            />
                          </FlexDiv>
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

                    {/* Active Range — prominent for user decision */}
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

                    {/* Position Composition */}
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

                    {renderBalanceChart()}
                  </MainSection>

                  <RestContent>
                    <HalfContent
                      $backcolor={bgColorBox}
                      $bordercolor={borderColorBox}
                      style={{
                        background: bgColorBox,
                        border: `2px solid ${borderColorBox}`,
                        borderRadius: 12,
                        padding: 20,
                      }}
                    >
                      <NewLabel
                        $size="16px"
                        $height="24px"
                        $weight="600"
                        $fontcolor={fontColor1}
                        style={{
                          background: bgColorChart,
                          border: `1.3px solid ${borderColorBox}`,
                          borderRadius: 8,
                          padding: 4,
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: 16,
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
                            style={{ marginBottom: 14 }}
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

                          <FormRow $muted={fontColor3} $fc={fontColor1}>
                            <span>
                              Est. Yearly Yield
                              <Question
                                id="cl-tooltip-yearly"
                                dark={darkMode}
                                content="Estimated yield over a year, based on current APY."
                              />
                            </span>
                            <span>—</span>
                          </FormRow>
                          <FormRow $muted={fontColor3} $fc={fontColor1} style={{ marginBottom: 14 }}>
                            <span>
                              Est. Received
                              <Question
                                id="cl-tooltip-received"
                                dark={darkMode}
                                content="Approximate fTokens you'd receive at the current share price."
                              />
                            </span>
                            <span>—</span>
                          </FormRow>

                          <label
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 10,
                              padding: '12px 14px',
                              background: bgColorChart,
                              border: `1px solid ${borderColorBox}`,
                              borderRadius: 10,
                              fontSize: 12,
                              lineHeight: 1.45,
                              color: fontColor3,
                              marginBottom: 14,
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={agreed}
                              onChange={e => setAgreed(e.target.checked)}
                              style={{ marginTop: 3, accentColor: '#5dcf46' }}
                            />
                            <span>
                              I confirm that I have read and understand the product, have read the{' '}
                              <a
                                href="https://docs.harvest.finance/legal/risk-disclosures"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#1da64a', fontWeight: 700 }}
                              >
                                Risk Disclosures
                              </a>
                              , and agree to the{' '}
                              <a
                                href="https://docs.harvest.finance/legal/terms-and-conditions"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: '#1da64a', fontWeight: 700 }}
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
                            style={{ marginBottom: 14 }}
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
              {/* Top 4 panels */}
              <TopBoxRow>
                <TopBox $bg={bgColorBox} $border={borderColorBox}>
                  <TopBoxTitle $muted={fontColor3}>Live APY</TopBoxTitle>
                  <TopBoxValue $fc={fontColor1}>{VAULT.apy}</TopBoxValue>
                </TopBox>
                <TopBox $bg={bgColorBox} $border={borderColorBox}>
                  <TopBoxTitle $muted={fontColor3}>Daily APY</TopBoxTitle>
                  <TopBoxValue $fc={fontColor1}>0.072%</TopBoxValue>
                </TopBox>
                <TopBox $bg={bgColorBox} $border={borderColorBox}>
                  <TopBoxTitle $muted={fontColor3}>TVL</TopBoxTitle>
                  <TopBoxValue $fc={fontColor1}>{VAULT.tvl}</TopBoxValue>
                </TopBox>
                <TopBox $bg={bgColorBox} $border={borderColorBox}>
                  <TopBoxTitle $muted={fontColor3}>Last Rebalance</TopBoxTitle>
                  <TopBoxValue $fc={fontColor1}>{VAULT.lastRebalance}</TopBoxValue>
                </TopBox>
              </TopBoxRow>

              <DetailsGrid>
                <DetailsCol>
                  {/* Share Price chart */}
                  <HalfInfo
                    $backcolor={bgColorBox}
                    $bordercolor={borderColorBox}
                    $marginbottom="0"
                    $padding="20px"
                  >
                    <ChartHeader>
                      <ChartHeaderCol>
                        <ChartLabel $color={fontColor1}>Share Price</ChartLabel>
                        <ChartMeta $muted={fontColor3} $fc={fontColor1}>
                          {today} <strong>{VAULT.details.sharePrice}</strong>
                        </ChartMeta>
                      </ChartHeaderCol>
                    </ChartHeader>
                    <ChartFrame $bg={bgColorChart}>
                      <AxisYLeft $muted={fontColor3}>
                        <span>1.012</span>
                        <span>1.008</span>
                        <span>1.004</span>
                        <span>1.000</span>
                      </AxisYLeft>
                      <AxisX $muted={fontColor3}>
                        <span>3/14</span>
                        <span>4/4</span>
                        <span>4/24</span>
                        <span>5/10</span>
                      </AxisX>
                      <ChartCenterText $muted={fontColor3}>
                        Share price history (mock)
                      </ChartCenterText>
                    </ChartFrame>
                    <RangeBtnRow>
                      {['Custom', '1W', '1M', '1Y', 'ALL'].map(r => (
                        <RangeBtn
                          key={r}
                          type="button"
                          $active={detailRange === r}
                          $muted={fontColor3}
                          $fc={fontColor1}
                          onClick={() => setDetailRange(r)}
                        >
                          {r}
                        </RangeBtn>
                      ))}
                    </RangeBtnRow>
                  </HalfInfo>

                  {/* Source of Yield */}
                  <HalfInfo
                    $backcolor={bgColorBox}
                    $bordercolor={borderColorBox}
                    $marginbottom="0"
                    $padding="20px"
                  >
                    <NewLabel
                      $size="14px"
                      $weight="700"
                      $height="20px"
                      $fontcolor={fontColor1}
                      style={{ marginBottom: 12 }}
                    >
                      Source of Yield
                    </NewLabel>
                    <SourceText $fc={fontColor1} $muted={fontColor3}>
                      The vault deploys{' '}
                      <strong>
                        {VAULT.pair.token0} / {VAULT.pair.token1}
                      </strong>{' '}
                      into a <strong>concentrated liquidity</strong> position on{' '}
                      <strong>{VAULT.protocol}</strong>, earning swap fees and{' '}
                      <strong>AERO emissions</strong>. The position is auto-re-centered when price
                      drifts beyond the deviation trigger; rebalances are TWAP-gated. Earned rewards
                      auto-compound back into the same range.
                    </SourceText>
                    <AddressBtnRow>
                      <AddressBtn $bg={bgColorChart} $border={borderColorBox} $fc={fontColor1}>
                        Vault Address
                      </AddressBtn>
                      <AddressBtn $bg={bgColorChart} $border={borderColorBox} $fc={fontColor1}>
                        Strategy Address
                      </AddressBtn>
                      <AddressBtn $bg={bgColorChart} $border={borderColorBox} $fc={fontColor1}>
                        Pool Address
                      </AddressBtn>
                      <AddressBtn $bg={bgColorChart} $border={borderColorBox} $fc={fontColor1}>
                        Add Liquidity
                      </AddressBtn>
                    </AddressBtnRow>
                  </HalfInfo>
                </DetailsCol>

                <DetailsCol>
                  {/* Info card */}
                  <HalfInfo
                    $backcolor={bgColorBox}
                    $bordercolor={borderColorBox}
                    $marginbottom="0"
                  >
                    <SectionTitle $fc={fontColor1} $border={borderColorBox}>
                      Info
                    </SectionTitle>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>Operating since</span>
                      <span>
                        {VAULT.details.operatingSince} ({VAULT.details.operatingDays} days)
                      </span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>SharePrice</span>
                      <span>{VAULT.details.sharePrice}</span>
                    </InfoRow>
                    <SectionTitle
                      $fc={fontColor1}
                      $border={borderColorBox}
                      style={{ marginTop: 4 }}
                    >
                      APY — Live & Historical Average
                    </SectionTitle>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>Live</span>
                      <span>{VAULT.details.apy.live}</span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>7d</span>
                      <span>{VAULT.details.apy.d7}</span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>30d</span>
                      <span>{VAULT.details.apy.d30}</span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>180d</span>
                      <span>{VAULT.details.apy.d180}</span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>365d</span>
                      <span>{VAULT.details.apy.d365}</span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>Lifetime</span>
                      <span>{VAULT.details.apy.lifetime}</span>
                    </InfoRow>
                  </HalfInfo>

                  {/* APY Breakdown */}
                  <HalfInfo
                    $backcolor={bgColorBox}
                    $bordercolor={borderColorBox}
                    $marginbottom="0"
                  >
                    <SectionTitle $fc={fontColor1} $border={borderColorBox}>
                      APY Breakdown
                    </SectionTitle>
                    <div style={{ padding: '14px 18px 4px' }}>
                      <KVList>
                        <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>Trading fees</span>
                          <span>~ 18.20%</span>
                        </KVRow>
                        <KVRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>AERO emissions (auto-compounded)</span>
                          <span>~ 8.26%</span>
                        </KVRow>
                      </KVList>
                    </div>
                    {showTip && (
                      <TipBox $bg="#eafbe6" $border="#bfe6b1">
                        <TipBoxIcon>i</TipBoxIcon>
                        <TipBoxText $fc="#137a3a" $accent="#0d5e2a">
                          <strong>Tip</strong>
                          For a quick guide on tracking yield sources in your Portfolio, check our
                          5-minute article{' '}
                          <a
                            href="https://medium.com/harvest-finance"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Yield Sources on Harvest – How to Track Them.
                          </a>
                        </TipBoxText>
                        <button
                          type="button"
                          onClick={() => setShowTip(false)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#137a3a',
                            padding: 0,
                            marginLeft: 'auto',
                            display: 'flex',
                            alignItems: 'flex-start',
                          }}
                        >
                          <IoCloseOutline fontSize={18} />
                        </button>
                      </TipBox>
                    )}
                  </HalfInfo>

                  {/* Fees */}
                  <HalfInfo
                    $backcolor={bgColorBox}
                    $bordercolor={borderColorBox}
                    $marginbottom="0"
                  >
                    <SectionTitle $fc={fontColor1} $border={borderColorBox}>
                      Fees
                    </SectionTitle>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>Entry / Exit fee</span>
                      <span>
                        {VAULT.costs.entryFee} / {VAULT.costs.exitFee}
                      </span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>Profit share (on harvested rewards)</span>
                      <span>{VAULT.costs.profitShare}</span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>Typical interaction — both assets</span>
                      <span>{VAULT.costs.balanced}</span>
                    </InfoRow>
                    <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                      <span>Typical interaction — single asset (via wrapper)</span>
                      <span>{VAULT.costs.singleAsset}</span>
                    </InfoRow>
                    <div
                      style={{
                        padding: '12px 18px 14px',
                        fontSize: 12,
                        color: fontColor3,
                        lineHeight: 1.5,
                        display: 'flex',
                        gap: 6,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span>
                        Per-rebalance swap slippage is borne by the vault and shows up as small
                        share-price jitter, not as a per-user fee.
                      </span>
                      <Question
                        id="cl-tooltip-jitter"
                        dark={darkMode}
                        content="The vault pays its own swap costs during rebalances; this shows up as small share-price movement, not a fee on your deposit."
                      />
                    </div>
                  </HalfInfo>

                  {/* Range parameters (collapsed) */}
                  <HalfInfo
                    $backcolor={bgColorBox}
                    $bordercolor={borderColorBox}
                    $marginbottom="0"
                  >
                    <div
                      onClick={() => setParamsOpen(o => !o)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 18px',
                        borderBottom: paramsOpen ? `1px solid ${borderColorBox}` : 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 700, color: fontColor1 }}>
                        Range parameters
                      </span>
                      <Caret $muted={fontColor3} $open={paramsOpen}>
                        ▼
                      </Caret>
                    </div>
                    {paramsOpen && (
                      <>
                        <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>Target width</span>
                          <span>{VAULT.params.targetWidth}</span>
                        </InfoRow>
                        <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>Current width</span>
                          <span>{VAULT.params.currentWidth}</span>
                        </InfoRow>
                        <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>Rebalance cooldown</span>
                          <span>{VAULT.params.rebalanceCooldown}</span>
                        </InfoRow>
                        <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>Deviation trigger</span>
                          <span>{VAULT.params.deviationTrigger}</span>
                        </InfoRow>
                        <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>TWAP window</span>
                          <span>{VAULT.params.twapWindow}</span>
                        </InfoRow>
                        <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>Max swap per rebalance</span>
                          <span>{VAULT.params.maxSwap}</span>
                        </InfoRow>
                        <InfoRow $border={borderColorBox} $muted={fontColor3} $fc={fontColor1}>
                          <span>Internal slippage cap</span>
                          <span>{VAULT.params.slippageBps}</span>
                        </InfoRow>
                      </>
                    )}
                  </HalfInfo>
                </DetailsCol>
              </DetailsGrid>
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
